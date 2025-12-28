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
  title: string;
  theme: string;
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
