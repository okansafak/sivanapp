
import { createClient } from '@supabase/supabase-js';
import { User, Exam, AIExamResult } from '../types';
import { getBrowserInfo } from './logger';

// Helper to get environment variables safely across environments (Vite/Next/CRA)
const getEnv = (key: string) => {
  // Vite Support
  if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
    return (import.meta as any).env[key];
  }
  // Process.env Support
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return '';
};

// Vite projelerinde env değişkenleri VITE_ ile başlamalıdır.
const SUPABASE_URL = getEnv('VITE_SUPABASE_URL') || getEnv('REACT_APP_SUPABASE_URL');
const SUPABASE_KEY = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('REACT_APP_SUPABASE_ANON_KEY');

let supabase: any = null;

// Bağlantıyı başlatmayı dene
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Supabase: Bağlantı yapılandırması yüklendi.");
  } catch (e) {
    console.error("Supabase: İstemci başlatma hatası:", e);
  }
} else {
  console.log("Supabase: .env dosyasında VITE_SUPABASE_URL veya VITE_SUPABASE_ANON_KEY bulunamadı. Loglama devre dışı.");
}

// --- SINAV SONUCU LOGLAMA ---
export const logExamToSupabase = async (
  user: User, 
  exam: Exam, 
  result: AIExamResult
) => {
  if (!supabase) return;

  const deviceInfo = getBrowserInfo();

  // Supabase'e gönderilecek veri paketi
  const logData = {
    adi: user.name,
    email: user.email,
    sinifi: user.grade,
    
    // Lokasyon Bilgileri
    il: user.city || '',
    ilce: user.district || '',
    okul: user.schoolName || '',

    // KVKK Onay Bilgileri
    kvkk_onayi: user.consentGiven || false,
    kvkk_onay_tarihi: user.consentDate || '',

    cihaz: deviceInfo,
    cozdugu_sinav: {
      id: exam.id,
      title: exam.title,
      theme: exam.theme,
      lesson: exam.lesson,
      term: exam.term,
      examNumber: exam.examNumber
    },
    sonuclar: {
      totalScore: result.totalScore,
      generalFeedback: result.generalFeedback
    },
    // Token Kullanımı (Eğer sonuçta varsa)
    token_kullanimi: result.usage ? {
      girdi_token: result.usage.promptTokens,
      cikti_token: result.usage.responseTokens,
      toplam_token: result.usage.totalTokens
    } : null,

    puan: result.totalScore,
    tarih: new Date().toISOString()
  };

  try {
    const { error } = await supabase.from('sinav_log').insert([logData]);
    if (error) {
       console.error("Supabase Exam Log Error:", error.message);
       
       if (error.message.includes('column') && error.message.includes('does not exist')) {
         console.warn("Lütfen Supabase tablonuza 'kvkk_onayi' ve 'kvkk_onay_tarihi' sütunlarını eklediğinizden emin olun.");
       }
    } else {
       console.log("Supabase: Sınav sonucu ve yasal onay kaydedildi.");
    }
  } catch (err) {
    console.error("Supabase Unexpected Error:", err);
  }
};

// --- GENEL SİSTEM AKTİVİTESİ LOGLAMA ---
export const logSystemActivity = async (
  email: string,
  action: string, // LOGIN, LOGOUT, EXAM_START, PAGE_VIEW
  details: string
) => {
  if (!supabase) return;

  const deviceInfo = getBrowserInfo();

  const activityData = {
    email: email,
    islem: action,
    detay: details,
    cihaz: deviceInfo,
    created_at: new Date().toISOString()
  };

  try {
    const { error } = await supabase.from('sistem_loglari').insert([activityData]);
    if (error) {
       console.error("Supabase Activity Log Error:", error.message);
    } else {
       console.log(`Supabase Log Gönderildi: [${action}]`);
    }
  } catch (err) {
    console.error("Supabase Activity Unexpected Error:", err);
  }
};
