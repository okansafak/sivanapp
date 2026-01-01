
export type LessonType = 
  | 'turkish' 
  | 'arabic' 
  | 'math' 
  | 'science' 
  | 'social' 
  | 'english' 
  | 'religious'
  | 'literature'  // Edebiyat
  | 'physics'     // Fizik
  | 'chemistry'   // Kimya
  | 'biology'     // Biyoloji
  | 'history'     // Tarih
  | 'geography'   // Coğrafya
  | 'philosophy'; // Felsefe

export interface User {
  name: string;
  email: string;
  grade: number; // 5-12
  role: 'student' | 'admin'; // Rol eklendi
  registeredAt?: string;
  avatar?: string; // Base64 image string (<10kb optimized)
  password?: string; // For profile update simulation
  city?: string;      // İl
  district?: string;  // İlçe
  schoolName?: string; // Okul Adı
  consentGiven?: boolean; // KVKK Onayı
  consentDate?: string;   // Onay Tarihi
}

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
  grade: number;      // Sınıf Seviyesi (5-12)
  lesson: LessonType; // Ders
  term: 1 | 2;        // Dönem
  examNumber: 1 | 2;  // Yazılı Numarası
  title: string;      // Sınav Başlığı (Örn: Sınav A)
  theme: string;      // Alt Başlık (Örn: Doğa Teması)
  description: string;
  questions: Question[];
  isActive?: boolean; // Admin tarafından aktif/pasif yapabilmek için
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
  usage?: { // Token Kullanımı
    promptTokens: number;
    responseTokens: number;
    totalTokens: number;
  };
}

export interface ExamHistoryItem {
  id: string; // unique ID for history record
  examId: number;
  examTitle: string;
  lesson: LessonType;
  score: number;
  date: string; // ISO String
}

export interface ScheduleItem {
  id: string;
  lesson: LessonType;
  title: string; // "Matematik 1. Yazılı"
  date: string; // YYYY-MM-DD
}

// Cihaz ve Tarayıcı Bilgileri
export interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
  connectionType?: string; // 4g, wifi vb. (destekleniyorsa)
  ipAddress?: string; // Client-side fetch ile alınacak
}

// Sistem Logları için Güncellenmiş Interface
export interface LogEntry {
  id: string;
  action: string; // 'LOGIN', 'REGISTER', 'EXAM_START', 'EXAM_FINISH', 'ADMIN_ACTION', 'LOGIN_FAILED'
  details: string;
  userEmail: string;
  timestamp: string;
  deviceInfo?: DeviceInfo; // Yeni alan
}

export const LESSON_LABELS: Record<LessonType, string> = {
  turkish: 'Türkçe',
  math: 'Matematik',
  science: 'Fen Bilimleri',
  social: 'Sosyal Bilgiler',
  english: 'İngilizce',
  religious: 'Din Kültürü',
  arabic: 'Arapça',
  literature: 'Türk Dili ve Edebiyatı',
  physics: 'Fizik',
  chemistry: 'Kimya',
  biology: 'Biyoloji',
  history: 'Tarih',
  geography: 'Coğrafya',
  philosophy: 'Felsefe'
};
