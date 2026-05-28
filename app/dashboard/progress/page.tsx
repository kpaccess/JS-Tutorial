import { createClient } from "@/lib/supabase/server";
import { lessons, PASS_THRESHOLD } from "@/lib/course-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: true });

  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user!.id);

  const progressMap = new Map((progressRows ?? []).map(p => [p.lesson_id, p]));

  // Build per-lesson attempt history
  const attemptsByLesson = new Map<string, typeof attempts>();
  for (const a of attempts ?? []) {
    if (!attemptsByLesson.has(a.lesson_id)) attemptsByLesson.set(a.lesson_id, []);
    attemptsByLesson.get(a.lesson_id)!.push(a);
  }

  const passedLessons = new Set(
    (attempts ?? []).filter(a => a.passed).map(a => a.lesson_id)
  );

  const totalTime = (progressRows ?? []).reduce((s, p) => s + (p.time_spent_minutes ?? 0), 0);
  const completedCount = passedLessons.size;

  const levelColors: Record<string, string> = {
    basic: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white">Your Progress</h1>
        <p className="text-slate-400 mt-1">Detailed breakdown of your learning journey.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Completed", value: `${completedCount}/${lessons.length}`, icon: "✅" },
          { label: "Total Time", value: `${Math.floor(totalTime / 60)}h ${totalTime % 60}m`, icon: "⏱️" },
          {
            label: "Quiz Attempts",
            value: (attempts ?? []).length,
            icon: "📝",
          },
          {
            label: "Pass Rate",
            value: `${attempts && attempts.length > 0 ? Math.round(((attempts ?? []).filter(a => a.passed).length / (attempts ?? []).length) * 100) : 0}%`,
            icon: "🎯",
          },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-slate-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white font-semibold">Course Progress</h2>
          <span className="text-yellow-400 font-bold">{Math.round((completedCount / lessons.length) * 100)}%</span>
        </div>
        <Progress value={(completedCount / lessons.length) * 100} className="h-3" />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {(["basic", "intermediate", "advanced"] as const).map(level => {
            const levelLessons = lessons.filter(l => l.level === level);
            const levelPassed = levelLessons.filter(l => passedLessons.has(l.id)).length;
            return (
              <div key={level} className="text-center">
                <Badge variant="outline" className={levelColors[level]}>{level}</Badge>
                <div className="text-white font-bold mt-1">{levelPassed}/{levelLessons.length}</div>
                <Progress value={(levelPassed / levelLessons.length) * 100} className="h-1.5 mt-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-lesson detail */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Lesson Details</h2>
        {lessons.map(lesson => {
          const lessonAttempts = attemptsByLesson.get(lesson.id) ?? [];
          const passed = passedLessons.has(lesson.id);
          const prog = progressMap.get(lesson.id);
          const bestScore = lessonAttempts.length > 0 ? Math.max(...lessonAttempts.map(a => a.score)) : null;

          return (
            <div
              key={lesson.id}
              className={`border rounded-xl p-4 ${
                passed
                  ? "border-green-500/20 bg-green-500/5"
                  : lessonAttempts.length > 0
                  ? "border-red-500/20 bg-red-500/5"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-xl flex-shrink-0">
                    {passed ? "✅" : lessonAttempts.length > 0 ? "❌" : "⏳"}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-500 text-xs font-mono">
                        {String(lesson.order).padStart(2, "0")}
                      </span>
                      <Badge variant="outline" className={`text-xs ${levelColors[lesson.level]}`}>
                        {lesson.level}
                      </Badge>
                    </div>
                    <div className="text-white font-semibold text-sm">{lesson.title}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-white font-semibold">{prog?.time_spent_minutes ?? 0}m</div>
                    <div className="text-xs">time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">{lessonAttempts.length}</div>
                    <div className="text-xs">attempts</div>
                  </div>
                  {bestScore !== null && (
                    <div className="text-center">
                      <div className={`font-semibold ${bestScore >= PASS_THRESHOLD ? "text-green-400" : "text-red-400"}`}>
                        {bestScore}%
                      </div>
                      <div className="text-xs">best</div>
                    </div>
                  )}
                </div>
              </div>

              {lessonAttempts.length > 0 && (
                <div className="mt-3 flex gap-2 flex-wrap">
                  {lessonAttempts.map((a, i) => (
                    <div
                      key={a.id}
                      className={`text-xs px-2.5 py-1 rounded-full border ${
                        a.passed
                          ? "border-green-500/30 bg-green-500/10 text-green-400"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      #{i + 1}: {a.score}%
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
