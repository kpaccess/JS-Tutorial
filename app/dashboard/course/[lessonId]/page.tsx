import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLessonById, getLessonQuestions, lessons } from "@/lib/course-data";
import LessonViewer from "@/components/course/LessonViewer";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);
  if (!lesson) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Check if prev lesson was passed (sequential unlocking)
  const lessonIndex = lessons.findIndex(l => l.id === lessonId);
  if (lessonIndex > 0) {
    const prevLesson = lessons[lessonIndex - 1];
    const { data: attempt } = await supabase
      .from("quiz_attempts")
      .select("id")
      .eq("user_id", user.id)
      .eq("lesson_id", prevLesson.id)
      .eq("passed", true)
      .maybeSingle();

    if (!attempt) {
      redirect(`/dashboard/course/${prevLesson.id}`);
    }
  }

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  const { data: latestAttempt } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const questions = getLessonQuestions(lessonId);

  return (
    <LessonViewer
      lesson={lesson}
      questions={questions}
      userId={user.id}
      initialProgress={progress}
      latestAttempt={latestAttempt}
    />
  );
}
