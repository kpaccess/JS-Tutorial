"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import GoogleButton from "@/components/auth/GoogleButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-3xl mx-auto space-y-8 py-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-1.5 rounded-full text-sm font-medium">
            <span>⚡</span>
            30-Day JavaScript Mastery Course
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Master{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              JavaScript
            </span>
            <br />
            in 30 Days
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto">
            From zero to advanced — interactive lessons, live code examples, quizzes, and a grading
            system that ensures you truly understand each concept before moving on.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "20 Lessons", icon: "📚" },
            { label: "100 Quizzes", icon: "✅" },
            { label: "1 Hr / Session", icon: "⏱️" },
            { label: "3 Levels", icon: "🏆" },
          ].map((f) => (
            <div key={f.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-white font-semibold text-sm">{f.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GoogleButton label="Start Learning Free — Sign in with Google" />
          <Link href="/login" className="text-slate-400 hover:text-white text-sm underline underline-offset-4 transition-colors">
            Use email instead
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            {
              week: "Week 1–2",
              level: "Basics",
              color: "from-green-500/20 to-emerald-500/10 border-green-500/30",
              badge: "bg-green-500/20 text-green-400",
              topics: ["Variables & Data Types", "Control Flow & Loops", "Functions & Scope", "Arrays & Objects"],
            },
            {
              week: "Week 2–3",
              level: "Intermediate",
              color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
              badge: "bg-blue-500/20 text-blue-400",
              topics: ["DOM Manipulation", "Events & Listeners", "Async / Promises", "Fetch API"],
            },
            {
              week: "Week 3–4",
              level: "Advanced",
              color: "from-purple-500/20 to-violet-500/10 border-purple-500/30",
              badge: "bg-purple-500/20 text-purple-400",
              topics: ["Closures & Classes", "ES Modules", "Error Handling", "Design Patterns"],
            },
          ].map((section) => (
            <div
              key={section.level}
              className={`bg-gradient-to-br ${section.color} border rounded-xl p-5 space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${section.badge}`}>
                  {section.level}
                </span>
                <span className="text-slate-400 text-xs">{section.week}</span>
              </div>
              <ul className="space-y-1.5">
                {section.topics.map((t) => (
                  <li key={t} className="text-slate-300 text-sm flex items-center gap-2">
                    <span className="text-slate-500">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
