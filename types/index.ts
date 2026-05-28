export type Level = 'basic' | 'intermediate' | 'advanced'

export interface Lesson {
  id: string
  week: number
  day: number
  level: Level
  title: string
  description: string
  content: string
  codeExample?: string
  minDurationMinutes: number
  order: number
}

export interface QuizQuestion {
  id: string
  lessonId: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface UserProgress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  timeSpentMinutes: number
  lastAccessedAt: string
  completedAt?: string
}

export interface QuizAttempt {
  id: string
  userId: string
  lessonId: string
  score: number
  totalQuestions: number
  passed: boolean
  answers: number[]
  attemptNumber: number
  createdAt: string
}

export interface Profile {
  id: string
  email: string
  fullName: string
  createdAt: string
  totalTimeSpentMinutes: number
}
