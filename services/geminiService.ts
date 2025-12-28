import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Exam, StudentAnswers, AIExamResult } from '../types';

export const evaluateExam = async (exam: Exam, answers: StudentAnswers, userApiKey: string): Promise<AIExamResult> => {
  // Use the provided user key, fallback to env if exists (though UI enforces user key now)
  const apiKey = userApiKey || process.env.API_KEY || ''; 
  
  if (!apiKey) {
    throw new Error("API Anahtarı eksik. Lütfen geçerli bir API anahtarı giriniz.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct the prompt content
  const questionsPrompt = exam.questions.map(q => `
    ID: ${q.id}
    Konu/Kazanım: ${q.code} - ${q.title}
    Bağlam (Metin/Şiir): ${q.context || "Yok"}
    Soru: ${q.questionText}
    Öğrenci Cevabı: ${answers[q.id] || "BOŞ BIRAKILDI"}
  `).join("\n---\n");

  const systemPrompt = `
    Sen uzman bir 5. sınıf Türkçe öğretmenisin. Görevin öğrencinin sınav kağıdını değerlendirmek.
    
    Değerlendirme Kuralları:
    1. Her soru için öğrencinin cevabını analiz et.
    2. Cevabın doğruluğuna göre 0-100 arası bir puan ver (Bu sorunun kendi içindeki başarı yüzdesi).
    3. Eğer cevap yanlışsa veya eksikse, yapıcı ve nazik bir dille düzeltme/açıklama yaz. 5. sınıf seviyesine uygun dil kullan.
    4. "maxScore" her zaman 100 üzerinden değerlendirilmiş gibi düşünülerek 10 puan (toplam 10 soru varsa) veya eşit ağırlıklı dağıtılır, ancak sen sadece o sorunun 'score' (başarı yüzdesi) kısmını ver. Ben hesaplamayı yapacağım.
    5. Genel bir değerlendirme yazısı yaz.
    
    Yanıtın sadece JSON formatında olmalı.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      totalScore: { type: Type.NUMBER, description: "Öğrencinin aldığı toplam puan (0-100)" },
      generalFeedback: { type: Type.STRING, description: "Öğrenciye genel motivasyon ve durum değerlendirmesi" },
      corrections: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionId: { type: Type.NUMBER },
            score: { type: Type.NUMBER, description: "Bu soru için verilen puan (0-100)" },
            maxScore: { type: Type.NUMBER, description: "Bu sorunun maksimum puan değeri (Genelde 10-15)" },
            feedback: { type: Type.STRING, description: "Öğretmen yorumu ve düzeltme" },
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
        { role: 'user', parts: [{ text: systemPrompt + "\n\nSINAV İÇERİĞİ:\n" + questionsPrompt }] }
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