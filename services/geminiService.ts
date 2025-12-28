import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Exam, StudentAnswers, AIExamResult } from '../types';

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
    BAĞLAM (Metin/Şiir): ${q.context || "Yok"}
    SORU: ${q.questionText}
    ÖĞRENCİ CEVABI: ${answers[q.id] || "BOŞ BIRAKILDI"}
  `).join("\n---\n");

  // Senaryo 1 Kazanım Kuralları
  const rubric = `
    DEĞERLENDİRME KRİTERLERİ (5. SINIF TÜRKÇE SENARYO 1):
    - T.O.5.18 (Şiir Biçimi): Dize ve kıta sayıları doğru tespit edilmiş mi?
    - T.O.5.20 (Söz Sanatları): Benzetme veya kişileştirme doğru bulunmuş mu?
    - T.O.5.14 (Hikaye Unsurları): Yer, zaman ve kahramanlar metinden doğru çıkarılmış mı?
    - T.O.5.5 (Kelime Anlamı): Öğrencinin tahmini, kelimenin metindeki bağlamına uygun mu? (Sözlük anlamı birebir şart değil, mantıklı tahmin yeterli).
    - T.O.5.8 (Çıkarım): Metne dayalı mantıklı bir neden-sonuç ilişkisi kurulmuş mu?
    - T.O.5.19 (Düşünceyi Geliştirme): Tanımlama, Karşılaştırma, Örneklendirme veya Benzetme doğru tespit edilmiş mi?
    - T.Y.5.20 (Geçiş İfadeleri): Cümlenin akışına uygun bağlaç (ama, oysa, çünkü vb.) kullanılmış mı?
    - T.Y.5.21 (Yazım/Noktalama): Büyük harf kullanımı, tarihlerin yazımı, eklerin ayrılması düzeltilmiş mi?
    - T.Y.5.7 (Yaratıcı Yazma): Giriş-Gelişme-Sonuç bütünlüğü var mı? Konuyla ilgili mi? Cümleler kurallı mı?
  `;

  const systemPrompt = `
    Sen uzman bir Türkçe öğretmenisin. 5. sınıf öğrencisinin sınav kağıdını değerlendiriyorsun.
    
    ${rubric}

    Genel Kurallar:
    1. Öğrenciye hitap dilin (Sen dili) teşvik edici, nazik ve eğitici olmalı.
    2. Yanlış cevaplarda doğrusunu açıklayarak öğret.
    3. Puanlamada adil ol. Boş cevaplara 0 ver. Kısmi doğrulara kısmi puan ver.
    4. "score" alanı 0-100 arasında o sorunun başarı yüzdesidir.
    
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