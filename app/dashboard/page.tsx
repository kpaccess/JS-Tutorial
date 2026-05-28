import { createClient } from "@/lib/supabase/server";
import { lessons, getWeekLabel, PASS_THRESHOLD } from "@/lib/course-data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user!.id);

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("lesson_id, passed, score, total_questions")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const progressMap = new Map((progressRows ?? []).map(p => [p.lesson_id, p]));

  const passedLessons = new Set(
    (attempts ?? []).filter(a => a.passed).map(a => a.lesson_id)
  );

  const completedCount = lessons.filter(l => passedLessons.has(l.id)).length;
  const overallPct = Math.round((completedCount / lessons.length) * 100);

  const weeks = [1, 2, 3, 4];

  const levelColor: Record<string, string> = {
    basic: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hey, {firstName} 👋</h1>
          <p className="text-slate-400 mt-1">Keep going — you're making great progress!</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center min-w-[160px]">
          <div className="text-4xl font-black text-yellow-400">{overallPct}%</div>
          <div className="text-slate-400 text-sm mt-1">Course complete</div>
          <Progress value={overallPct} className="mt-2 h-2" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Lessons Done", value: completedCount, total: lessons.length, icon: "📚" },
          { label: "Pass Rate", value: `${PASS_THRESHOLD}%`, total: null, icon: "✅" },
          {
            label: "Time Logged",
            value: `${Math.round((progressRows ?? []).reduce((s, p) => s + (p.time_spent_minutes ?? 0), 0) / 60)}h`,
            total: null,
            icon: "⏱️",
          },
          { label: "Quizzes Passed", value: passedLessons.size, total: lessons.length, icon: "🏆" },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-white">
              {s.value}{s.total ? <span className="text-slate-500 text-base">/{s.total}</span> : ""}
            </div>
            <div className="text-slate-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Course weeks */}
      {weeks.map(week => {
        const weekLessons = lessons.filter(l => l.week === week);
        return (
          <div key={week} className="space-y-3">
            <h2 className="text-xl font-bold text-white">{getWeekLabel(week)}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {weekLessons.map((lesson, idx) => {
                const prog = progressMap.get(lesson.id);
                const passed = passedLessons.has(lesson.id);
                const started = !!prog;
                const timeSpent = prog?.time_spent_minutes ?? 0;

                // Lock lesson if previous not completed (except first)
                const prevLesson = idx > 0 ? weekLessons[idx - 1] : null;
                const prevWeekLast = week > 1
                  ? lessons.filter(l => l.week === week - 1).at(-1)
                  : null;
                const prerequisite = prevLesson ?? prevWeekLast;
                const locked = prerequisite
                  ? !passedLessons.has(prerequisite.id)
                  : false;

                return (
                  <div
                    key={lesson.id}
                    className={`border rounded-xl p-4 space-y-3 transition-all ${
                      locked
                        ? "border-white/5 bg-white/2 opacity-50 cursor-not-allowed"
                        : passed
                        ? "border-green-500/30 bg-green-500/5 hover:bg-green-500/10"
                        : started
                        ? "border-yellow-400/30 bg-yellow-400/5 hover:bg-yellow-400/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-slate-500 text-xs font-mono">
                            {String(lesson.order).padStart(2, "0")}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${levelColor[lesson.level]}`}
                          >
                            {lesson.level}
                          </Badge>
                        </div>
                        <h3 className="text-white font-semibold mt-1 text-sm">{lesson.title}</h3>
                        <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{lesson.description}</p>
                      </div>
                      <div className="text-xl flex-shrink-0">
                        {locked ? "🔒" : passed ? "✅" : started ? "▶️" : "📄"}
                      </div>
                    </div>

                    {!locked && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{timeSpent}m / 60m</span>
                          {passed && <span className="text-green-400 font-medium">Passed ✓</span>}
                        </div>
                        <Progress
                          value={Math.min(100, (timeSpent / 60) * 100)}
                          className="h-1.5"
                        />
                        <Link href={`/dashboard/course/${lesson.id}`}>
                          <button className={`w-full text-sm py-2 px-3 rounded-lg font-medium transition-colors ${
                            passed
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30"
                          }`}>
                            {passed ? "Review Lesson" : started ? "Continue" : "Start Lesson"}
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
