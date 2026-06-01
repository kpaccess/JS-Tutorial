"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lesson, QuizQuestion } from "@/types";
import { MIN_SESSION_MINUTES } from "@/lib/course-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuizPanel from "@/components/quiz/QuizPanel";

interface Props {
  lesson: Lesson;
  questions: QuizQuestion[];
  userId: string;
  initialProgress: Record<string, unknown> | null;
  latestAttempt: Record<string, unknown> | null;
}

const levelColors: Record<string, string> = {
  basic: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function LessonViewer({ lesson, questions, userId, initialProgress, latestAttempt }: Props) {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [elapsed, setElapsed] = useState((initialProgress as { time_spent_minutes?: number } | null)?.time_spent_minutes ?? 0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [unlockedEarly, setUnlockedEarly] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`unlocked_${lesson.id}`) === "true";
    }
    return false;
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  const handleUnlockEarly = () => {
    setUnlockedEarly(true);
    localStorage.setItem(`unlocked_${lesson.id}`, "true");
  };

  const alreadyPassed = (latestAttempt as { passed?: boolean } | null)?.passed === true;
  const minMinutes = MIN_SESSION_MINUTES;
  const timerDone = elapsed >= minMinutes || unlockedEarly;
  const courseId = lesson.id.startsWith("java-") ? "java" : "javascript";

  const saveProgress = useCallback(
    async (minutes: number) => {
      await supabase.from("user_progress").upsert(
        {
          user_id: userId,
          lesson_id: lesson.id,
          time_spent_minutes: minutes,
          last_accessed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" }
      );
    },
    [supabase, userId, lesson.id]
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSessionSeconds(s => s + 1);
      setElapsed(prev => {
        const next = prev + 1 / 60;
        return next;
      });
    }, 1000);

    // Auto-save every 30 seconds
    saveRef.current = setInterval(() => {
      setElapsed(current => {
        saveProgress(Math.floor(current));
        return current;
      });
    }, 30_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (saveRef.current) clearInterval(saveRef.current);
      // Save on unmount
      setElapsed(current => {
        saveProgress(Math.floor(current));
        return current;
      });
    };
  }, [saveProgress]);

  const elapsedMinutes = Math.floor(elapsed);
  const progressPct = Math.min(100, (elapsedMinutes / minMinutes) * 100);
  const remaining = Math.max(0, minMinutes * 60 - (elapsedMinutes * 60 + (sessionSeconds % 60)));

  function renderContent(text: string) {
    // Very lightweight markdown: headers, code blocks, bold
    const lines = text.split("\n");
    const result: React.ReactNode[] = [];
    let codeBlock = false;
    let codeLines: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("```")) {
        if (!codeBlock) {
          codeBlock = true;
          codeLines = [];
        } else {
          result.push(
            <pre key={i} className="bg-slate-900 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-200 my-4">
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
          codeBlock = false;
        }
      } else if (codeBlock) {
        codeLines.push(line);
      } else if (line.startsWith("## ")) {
        result.push(<h2 key={i} className="text-xl font-bold text-white mt-6 mb-2">{line.slice(3)}</h2>);
      } else if (line.startsWith("### ")) {
        result.push(<h3 key={i} className="text-lg font-semibold text-yellow-400 mt-4 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith("| ")) {
        // Table
        const tableLines = [line];
        while (i + 1 < lines.length && lines[i + 1].startsWith("| ")) {
          i++;
          tableLines.push(lines[i]);
        }
        const rows = tableLines.filter(l => !l.match(/^\|[-| ]+\|$/));
        result.push(
          <div key={i} className="overflow-x-auto my-4">
            <table className="text-sm w-full border-collapse">
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className={ri === 0 ? "bg-white/10 font-semibold" : "border-t border-white/5"}>
                    {row.split("|").filter((_, ci) => ci > 0 && ci < row.split("|").length - 1).map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-slate-300">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (line.startsWith("- ") || line.startsWith("  - ")) {
        const indent = line.startsWith("  -");
        result.push(
          <li key={i} className={`text-slate-300 ${indent ? "ml-4" : ""} flex items-start gap-2`}>
            <span className="text-slate-500 mt-1 flex-shrink-0">•</span>
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^  - |^- /, "")) }} />
          </li>
        );
      } else if (line.trim() === "") {
        result.push(<div key={i} className="h-2" />);
      } else {
        result.push(
          <p key={i} className="text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
      }
      i++;
    }

    return result;
  }

  function formatInline(text: string) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-yellow-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
  }

  if (showQuiz) {
    return (
      <QuizPanel
        lesson={lesson}
        questions={questions}
        userId={userId}
        latestAttempt={latestAttempt as Record<string, unknown> | null}
        onBack={() => setShowQuiz(false)}
        onPass={() => router.push(`/dashboard/${courseId}`)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={levelColors[lesson.level]}>{lesson.level}</Badge>
            <span className="text-slate-500 text-sm">Week {lesson.week} · Lesson {lesson.order}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
          <p className="text-slate-400">{lesson.description}</p>
        </div>
        <button
          onClick={() => router.push(`/dashboard/${courseId}`)}
          className="text-slate-400 hover:text-white text-sm cursor-pointer"
        >
          ← Back to Course
        </button>
      </div>

      {/* Session Timer */}
      <div className={`border rounded-xl p-4 space-y-3 ${timerDone ? "border-green-500/30 bg-green-500/5" : "border-yellow-400/30 bg-yellow-400/5"}`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{timerDone ? "✅" : "⏱️"}</span>
            <div>
              <div className="text-white font-semibold text-sm">
                {timerDone 
                  ? (unlockedEarly ? "Lesson completed early — quiz unlocked!" : "Minimum time reached — quiz unlocked!") 
                  : "Complete 1 hour to unlock the quiz"}
              </div>
              <div className="text-slate-400 text-xs">
                {timerDone
                  ? `You spent ${elapsedMinutes}m on this lesson`
                  : `${remaining > 0 ? formatTime(remaining) : "0:00"} remaining`}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-white">{formatTime(sessionSeconds)}</div>
            <div className="text-slate-500 text-xs">this session</div>
          </div>
        </div>
        <Progress value={progressPct} className="h-2" />
        <div className="flex justify-between items-center text-xs">
          <div className="text-slate-500">
            <span>{elapsedMinutes}m logged</span>
            <span className="mx-1">/</span>
            <span>{minMinutes}m required</span>
          </div>
          {!timerDone && !alreadyPassed && (
            <button 
              onClick={handleUnlockEarly}
              className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-4"
            >
              I&apos;ve finished reading, unlock quiz →
            </button>
          )}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-1">
        {renderContent(lesson.content)}
      </div>

      {/* Code Example */}
      {lesson.codeExample && (
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
            <span className="text-slate-400 text-sm font-medium">Try it yourself</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
          </div>
          <pre className="p-5 overflow-x-auto text-sm font-mono text-slate-200 leading-relaxed">
            <code>{lesson.codeExample}</code>
          </pre>
        </div>
      )}

      {/* Quiz CTA */}
      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        {alreadyPassed ? (
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-lg">✅</span>
            <div>
              <div className="text-white font-semibold">Lesson completed!</div>
              <div className="text-slate-400 text-sm">You passed the quiz for this lesson.</div>
            </div>
          </div>
        ) : (
          <div className="text-slate-400 text-sm">
            {timerDone
              ? "Ready to test your knowledge? Take the quiz!"
              : (
                <div className="space-y-1">
                  <p>Spend {minMinutes} minutes on this lesson before taking the quiz.</p>
                  <button 
                    onClick={handleUnlockEarly}
                    className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-4"
                  >
                    I&apos;ve finished reading, unlock quiz early →
                  </button>
                </div>
              )}
          </div>
        )}
        <Button
          onClick={() => setShowQuiz(true)}
          disabled={!timerDone && !alreadyPassed}
          className={`px-6 py-3 font-bold rounded-xl ${
            timerDone || alreadyPassed
              ? "bg-yellow-400 hover:bg-yellow-300 text-black"
              : "bg-white/10 text-slate-500 cursor-not-allowed"
          }`}
        >
          {alreadyPassed ? "Retake Quiz" : "Take Quiz →"}
        </Button>
      </div>
    </div>
  );
}
