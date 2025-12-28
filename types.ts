export type LessonType = 'turkish' | 'arabic' | 'math' | 'science' | 'social' | 'english' | 'religious';

export interface Question {
  id: number;
  code: string; // e.g., T.O.5.18
  title: string;
  context?: string; // The poem or paragraph text
  questionText?: string; // Additional instruction
  placeholder?: string;
  type: 'text' | 'textarea' | 'fill-gap';
}

export interface Exam {
  id: number;
  lesson: LessonType; // Ders
  term: 1 | 2;        // Dönem
  examNumber: 1 | 2;  // Yazılı Numarası
  title: string;      // Sınav Başlığı (Örn: Sınav A)
  theme: string;      // Alt Başlık (Örn: Doğa Teması)
  description: string;
  questions: Question[];
}

export interface StudentAnswers {
  [questionId: number]: string;
}

export interface AICorrection {
  questionId: number;
  score: number; // 0-100 for this specific question
  maxScore: number; // usually 10 or 20
  feedback: string;
  isCorrect: boolean;
}

export interface AIExamResult {
  totalScore: number; // Out of 100
  generalFeedback: string;
  corrections: AICorrection[];
}

export const LESSON_LABELS: Record<LessonType, string> = {
  turkish: 'Türkçe',
  math: 'Matematik',
  science: 'Fen Bilimleri',
  social: 'Sosyal Bilgiler',
  english: 'İngilizce',
  religious: 'Din Kültürü',
  arabic: 'Arapça'
};