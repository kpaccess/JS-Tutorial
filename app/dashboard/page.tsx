import { createClient } from "@/lib/supabase/server";
import { getLessonsByCourse } from "@/lib/course-data";
import Link from "next/link";
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
    .select("lesson_id, passed, score")
    .eq("user_id", user!.id);

  const passedLessons = new Set(
    (attempts ?? []).filter(a => a.passed).map(a => a.lesson_id)
  );

  // Load both courses
  const jsLessons = getLessonsByCourse("javascript");
  const javaLessons = getLessonsByCourse("java");

  // Calculate JS progress
  const jsCompleted = jsLessons.filter(l => passedLessons.has(l.id)).length;
  const jsPct = Math.round((jsCompleted / jsLessons.length) * 100);

  // Calculate Java progress
  const javaCompleted = javaLessons.filter(l => passedLessons.has(l.id)).length;
  const javaPct = Math.round((javaCompleted / javaLessons.length) * 100);

  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Welcome to the Tutorial Series, {firstName} 👋</h1>
        <p className="text-slate-400 mt-1.5 text-base">Select your course and start learning at your own pace.</p>
      </div>

      {/* Guidelines Card */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-purple-950/40 border border-purple-500/20 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🛡️</span>
          <div>
            <h2 className="text-xl font-bold text-white">Course Guidelines & Expectations</h2>
            <p className="text-slate-400 text-xs mt-0.5">Please review the rules below before starting any session.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-yellow-400 font-bold mt-0.5">01.</span>
              <div>
                <h3 className="text-white font-semibold">Interactive Learning Series</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Every lesson features clear conceptual breakdowns, practical code examples, and interactive coding references designed for deep retention.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-yellow-400 font-bold mt-0.5">02.</span>
              <div>
                <h3 className="text-white font-semibold">1-Hour Session Devotion</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  A minimum of 1 hour (60 minutes) must be spent actively reading, researching, and practicing each lesson. The review quiz will unlock only after this duration has elapsed.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-yellow-400 font-bold mt-0.5">03.</span>
              <div>
                <h3 className="text-white font-semibold">Knowledge Reinforcement Quizzes</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  At the end of each session, you will complete a 5-question multiple choice quiz. Passing the quiz verifies your understanding and unlocks the next lesson.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-yellow-400 font-bold mt-0.5">04.</span>
              <div>
                <h3 className="text-white font-semibold text-purple-300">Strict Honor Code (No AI)</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  You are **not supposed to use any external help, search engines, documentation, or AI assistants** to solve the quiz questions. Trust your memory and learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Your Learning Tracks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* JavaScript Course Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-yellow-400/30 hover:bg-white/[0.07] transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl">⚡</span>
                <span className="text-xs font-bold px-2.5 py-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-full">
                  Frontend & Node.js
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">JavaScript Mastery</h3>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  Master modern JS: closures, arrays, objects, events, async/await, modules, generators, and design patterns.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Course Progress</span>
                  <span className="text-white font-semibold">{jsPct}% Complete</span>
                </div>
                <Progress value={jsPct} className="h-2 bg-white/5" />
              </div>

              <Link href="/dashboard/javascript" className="block">
                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer">
                  {jsPct > 0 ? "Continue Course" : "Start Course"}
                </button>
              </Link>
            </div>
          </div>

          {/* Java Course Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-400/30 hover:bg-white/[0.07] transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl">☕</span>
                <span className="text-xs font-bold px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full">
                  Backend & Systems
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">Java Mastery</h3>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  Master core Java: OOP, inheritance, interfaces, collections, streams, generic algorithms, threads, and SOLID design.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Course Progress</span>
                  <span className="text-white font-semibold">{javaPct}% Complete</span>
                </div>
                <Progress value={javaPct} className="h-2 bg-white/5" />
              </div>

              <Link href="/dashboard/java" className="block">
                <button className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer">
                  {javaPct > 0 ? "Continue Course" : "Start Course"}
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
