"use client";
import Link from "next/link";
import GoogleButton from "@/components/auth/GoogleButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto space-y-12 py-16 px-4">
        {/* Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 px-4 py-1.5 rounded-full text-sm font-medium animate-pulse">
            <span>🚀</span>
            Interactive Developer Tutorial Series
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Master Code through{" "}
            <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              Active Learning
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Gain deep understanding in JavaScript and Java. Learn actively with timed sessions, hands-on examples, and memory-reinforcing quizzes.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-yellow-400/30 transition-all group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform w-fit">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">JavaScript Mastery</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              From closures to the prototype chain, design patterns, and asynchronous execution. Become a production-ready JavaScript expert.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-400/30 transition-all group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform w-fit">☕</div>
            <h3 className="text-xl font-bold text-white mb-2">Java Mastery</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              From class fundamentals to OOP principles, collections, exceptions, streams, generics, multithreading, and SOLID architecture.
            </p>
          </div>
        </div>

        {/* CTA Area */}
        <div className="max-w-md mx-auto space-y-6 pt-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
            <h4 className="text-white font-semibold text-sm">Create an account or sign in to start learning:</h4>
            <GoogleButton label="Start Learning — Sign in with Google" />
            <div className="flex items-center justify-between text-xs text-slate-400 px-2 pt-2">
              <Link href="/login" className="hover:text-white underline underline-offset-4 transition-colors">
                Sign in with Email
              </Link>
              <span>•</span>
              <Link href="/register" className="hover:text-white underline underline-offset-4 transition-colors">
                Create free account
              </Link>
            </div>
          </div>
        </div>

        {/* Requirements Notice */}
        <div className="max-w-2xl mx-auto text-slate-500 text-xs md:text-sm border-t border-white/5 pt-8">
          🛡️ This is an intensive educational platform. Each lesson requires a minimum of 1 hour of study time before attempting the quiz. AI assistance or external help is strictly discouraged to guarantee real mastery.
        </div>
      </div>
    </main>
  );
}
