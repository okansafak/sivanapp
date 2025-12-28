import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Exam, StudentAnswers, AIExamResult, LESSON_LABELS } from '../types';

export const evaluateExam = async (exam: Exam, answers: StudentAnswers, userApiKey: string): Promise<AIExamResult> => {
  const apiKey = userApiKey || process.env.API_KEY || ''; 
  
  if (!apiKey) {
    throw new Error("API Anahtarı eksik. Lütfen geçerli bir API anahtarı giriniz.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const questionsPrompt = exam.questions.map(q => `
    SORU ID: ${q.id}
    KAZANIM KODU: ${q.code}
    KONU: ${q.title}
    BAĞLAM (Metin/Şiir/Görsel Açıklaması): ${q.context || "Yok"}
    SORU: ${q.questionText}
    ÖĞRENCİ CEVABI: ${answers[q.id] || "BOŞ BIRAKILDI"}
  `).join("\n---\n");

  const lessonName = LESSON_LABELS[exam.lesson];

  const systemPrompt = `
    Sen uzman bir ${lessonName} öğretmenisin. 5. sınıf öğrencisinin sınav kağıdını değerlendiriyorsun.
    Sınav Konusu: ${exam.title} - ${exam.theme}

    Değerlendirme Kuralları:
    1. ${lessonName} müfredatına (MEB) uygun değerlendirme yap.
    2. Öğrenciye hitap dilin (Sen dili) teşvik edici, nazik ve eğitici olmalı.
    3. Yanlış cevaplarda doğrusunu açıklayarak öğret.
    4. Puanlamada adil ol. Boş cevaplara 0 ver.
    5. "score" alanı 0-100 arasında o sorunun başarı yüzdesidir.
    
    Özellikle Dikkat Et:
    - Eğer ders Arapça ise: Harflerin doğru yazımı/okunuşu ve temel kelime bilgisine odaklan. Transkripsiyon (okunuş yazımı) doğruysa puan ver.
    - Eğer ders Matematik ise: İşlem adımlarına ve sonuca bak. Mantık doğruysa işlem hatasına rağmen kısmi puan ver.
    - Eğer ders Türkçe ise: Yazım kuralları, metin anlama ve söz sanatlarına dikkat et.

    Çıktı Formatı: JSON
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      totalScore: { type: Type.NUMBER, description: "Öğrencinin aldığı toplam puan (0-100)" },
      generalFeedback: { type: Type.STRING, description: "Öğrenciye genel karne görüşü niteliğinde özet yorum." },
      corrections: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionId: { type: Type.NUMBER },
            score: { type: Type.NUMBER, description: "Başarı yüzdesi (0-100)" },
            maxScore: { type: Type.NUMBER, description: "Sabit 100 kabul et." },
            feedback: { type: Type.STRING, description: "Düzeltme ve açıklama." },
            isCorrect: { type: Type.BOOLEAN },
          },
          required: ["questionId", "score", "feedback", "isCorrect"],
        },
      },
    },
    required: ["totalScore", "generalFeedback", "corrections"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\nSINAV KAĞIDI:\n" + questionsPrompt }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Yapay zeka boş yanıt döndürdü.");
    
    return JSON.parse(resultText) as AIExamResult;

  } catch (error) {
    console.error("AI Evaluation Error:", error);
    throw error;
  }
};