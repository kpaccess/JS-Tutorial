"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lesson, QuizQuestion } from "@/types";
import { PASS_THRESHOLD } from "@/lib/course-data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Props {
  lesson: Lesson;
  questions: QuizQuestion[];
  userId: string;
  latestAttempt: Record<string, unknown> | null;
  onBack: () => void;
  onPass: () => void;
}

type Phase = "intro" | "answering" | "review" | "result";

export default function QuizPanel({ lesson, questions, userId, latestAttempt, onBack, onPass }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; attemptNumber: number } | null>(null);

  const supabase = createClient();
  const q = questions[current];
  const isLast = current === questions.length - 1;

  const prevAttemptNumber = (latestAttempt as { attempt_number?: number } | null)?.attempt_number ?? 0;

  function startQuiz() {
    setPhase("answering");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowExplanation(false);
  }

  function handleSelect(idx: number) {
    if (showExplanation) return;
    setSelected(idx);
  }

  function handleConfirm() {
    if (selected === null) return;
    setShowExplanation(true);
  }

  function handleNext() {
    const newAnswers = [...answers, selected!];
    if (isLast) {
      submitQuiz(newAnswers);
    } else {
      setAnswers(newAnswers);
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }

  async function submitQuiz(finalAnswers: number[]) {
    setSubmitting(true);
    const score = finalAnswers.reduce((acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0), 0);
    const scorePercent = Math.round((score / questions.length) * 100);
    const passed = scorePercent >= PASS_THRESHOLD;
    const attemptNumber = prevAttemptNumber + 1;

    const { error } = await supabase.from("quiz_attempts").insert({
      user_id: userId,
      lesson_id: lesson.id,
      score: scorePercent,
      total_questions: questions.length,
      passed,
      answers: finalAnswers,
      attempt_number: attemptNumber,
    });

    if (passed) {
      await supabase.from("user_progress").upsert(
        {
          user_id: userId,
          lesson_id: lesson.id,
          completed: true,
          completed_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id", ignoreDuplicates: false }
      );
    }

    setSubmitting(false);

    if (error) {
      toast.error("Failed to save quiz. Please try again.");
      return;
    }

    setAnswers(finalAnswers);
    setResult({ score: scorePercent, passed, attemptNumber });
    setPhase("result");
  }

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={onBack} className="text-slate-400 hover:text-white text-sm">← Back to Lesson</button>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-6">
          <div className="text-5xl">📝</div>
          <div>
            <h2 className="text-2xl font-bold text-white">Quiz: {lesson.title}</h2>
            <p className="text-slate-400 mt-2">Test your understanding before moving on.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Questions", value: questions.length, icon: "❓" },
              { label: "Pass Score", value: `${PASS_THRESHOLD}%`, icon: "🎯" },
              { label: "Attempts", value: prevAttemptNumber, icon: "🔄" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 rounded-xl p-3">
                <div className="text-xl">{s.icon}</div>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-slate-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {prevAttemptNumber > 0 && (
            <div className={`rounded-lg p-3 text-sm ${
              (latestAttempt as { passed?: boolean } | null)?.passed
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-400/20 text-yellow-400"
            }`}>
              {(latestAttempt as { passed?: boolean } | null)?.passed
                ? `You've already passed this quiz (attempt #${prevAttemptNumber}).`
                : `Last attempt: ${(latestAttempt as { score?: number } | null)?.score ?? 0}% — you need ${PASS_THRESHOLD}% to pass.`}
            </div>
          )}

          <div className="bg-slate-900/50 rounded-lg p-4 text-left text-sm text-slate-400 space-y-1">
            <p>• Answer all {questions.length} questions</p>
            <p>• You can review explanations after each answer</p>
            <p>• Score {PASS_THRESHOLD}% or higher to unlock the next lesson</p>
            <p>• Retake as many times as needed until you pass</p>
          </div>

          <Button
            onClick={startQuiz}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl text-base"
          >
            {prevAttemptNumber > 0 ? "Retake Quiz" : "Start Quiz"} →
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "answering") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Question {current + 1} of {questions.length}</span>
          <span className="text-slate-400 text-sm">{Math.round(((current) / questions.length) * 100)}% done</span>
        </div>
        <Progress value={(current / questions.length) * 100} className="h-2" />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-semibold text-white leading-relaxed">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let cls = "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20";
              if (selected === idx) {
                if (!showExplanation) {
                  cls = "border-yellow-400 bg-yellow-400/10 text-white";
                } else if (idx === q.correctIndex) {
                  cls = "border-green-500 bg-green-500/20 text-green-300";
                } else {
                  cls = "border-red-500 bg-red-500/20 text-red-300";
                }
              } else if (showExplanation && idx === q.correctIndex) {
                cls = "border-green-500 bg-green-500/20 text-green-300";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${cls}`}
                  disabled={showExplanation}
                >
                  <span className="font-mono text-xs mr-3 opacity-60">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`rounded-xl p-4 text-sm ${
              selected === q.correctIndex
                ? "bg-green-500/10 border border-green-500/30 text-green-300"
                : "bg-red-500/10 border border-red-500/30 text-red-300"
            }`}>
              <div className="font-semibold mb-1">
                {selected === q.correctIndex ? "✅ Correct!" : "❌ Incorrect"}
              </div>
              <div className="text-slate-300">{q.explanation}</div>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            {!showExplanation ? (
              <Button
                onClick={handleConfirm}
                disabled={selected === null}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={submitting}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6"
              >
                {submitting ? "Saving…" : isLast ? "Submit Quiz" : "Next Question →"}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    const passed = result.passed;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className={`border rounded-2xl p-8 text-center space-y-6 ${
          passed ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
        }`}>
          <div className="text-6xl">{passed ? "🎉" : "📚"}</div>
          <div>
            <h2 className="text-3xl font-black text-white">{result.score}%</h2>
            <Badge
              variant="outline"
              className={passed ? "border-green-500/50 text-green-400 mt-2 text-sm" : "border-red-500/50 text-red-400 mt-2 text-sm"}
            >
              {passed ? "PASSED" : "FAILED"}
            </Badge>
            <p className="text-slate-400 mt-3">
              {passed
                ? `Excellent work! You scored ${result.score}% and unlocked the next lesson.`
                : `You scored ${result.score}%. You need ${PASS_THRESHOLD}% to pass. Review the lesson and try again!`}
            </p>
          </div>

          {/* Question review */}
          <div className="text-left space-y-3">
            <h3 className="text-white font-semibold text-sm text-center text-slate-400">QUESTION REVIEW</h3>
            {questions.map((question, idx) => {
              const isCorrect = answers[idx] === question.correctIndex;
              return (
                <div key={question.id} className={`rounded-lg p-3 border text-sm ${
                  isCorrect ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
                }`}>
                  <div className="flex items-start gap-2">
                    <span>{isCorrect ? "✅" : "❌"}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm">{question.question}</div>
                      {!isCorrect && (
                        <div className="text-slate-400 text-xs mt-1">
                          Correct: {question.options[question.correctIndex]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            {passed ? (
              <>
                <Button onClick={onPass} className="bg-green-500 hover:bg-green-400 text-white font-bold px-6">
                  Continue to Dashboard →
                </Button>
                <Button onClick={() => setPhase("intro")} variant="outline" className="border-white/20 text-slate-300">
                  Retake Quiz
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onBack} variant="outline" className="border-white/20 text-slate-300">
                  Review Lesson
                </Button>
                <Button onClick={() => setPhase("intro")} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6">
                  Try Again →
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
