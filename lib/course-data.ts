import { Lesson, QuizQuestion } from '@/types'
import { lessons as jsLessons, quizQuestions as jsQuizQuestions } from './courses/js-data'
import { lessons as javaLessons, quizQuestions as javaQuizQuestions } from './courses/java-data'

export const PASS_THRESHOLD = 70
export const MIN_SESSION_MINUTES = 60

// Backward-compatible export for any file importing static lessons directly
export const lessons: Lesson[] = jsLessons

export function getLessonsByCourse(courseId: string): Lesson[] {
  if (courseId === 'java') {
    return javaLessons
  }
  return jsLessons
}

export function getQuizQuestionsByCourse(courseId: string): QuizQuestion[] {
  if (courseId === 'java') {
    return javaQuizQuestions
  }
  return jsQuizQuestions
}

export function getLessonById(id: string, courseId?: string): Lesson | undefined {
  if (courseId === 'java' || id.startsWith('java-')) {
    return javaLessons.find(l => l.id === id)
  }
  if (courseId === 'javascript') {
    return jsLessons.find(l => l.id === id)
  }
  // Fallback to searching both
  return jsLessons.find(l => l.id === id) || javaLessons.find(l => l.id === id)
}

export function getLessonQuestions(lessonId: string, courseId?: string): QuizQuestion[] {
  if (courseId === 'java' || lessonId.startsWith('java-')) {
    return javaQuizQuestions.filter(q => q.lessonId === lessonId)
  }
  return jsQuizQuestions.filter(q => q.lessonId === lessonId)
}

export function getLessonsByWeek(week: number, courseId: string): Lesson[] {
  const courseLessons = getLessonsByCourse(courseId)
  return courseLessons.filter(l => l.week === week).sort((a, b) => a.order - b.order)
}

export function getWeekLabel(week: number, courseId: string): string {
  if (courseId === 'java') {
    const labels: Record<number, string> = {
      1: 'Week 1 — Java Basics',
      2: 'Week 2 — Object-Oriented Java',
      3: 'Week 3 — Core Java APIs',
      4: 'Week 4 — Advanced Java Topics',
    }
    return labels[week] ?? `Week ${week}`
  } else {
    const labels: Record<number, string> = {
      1: 'Week 1 — Basics',
      2: 'Week 2 — Intermediate',
      3: 'Week 3 — Advanced',
      4: 'Week 4 — Advanced & Patterns',
    }
    return labels[week] ?? `Week ${week}`
  }
}
