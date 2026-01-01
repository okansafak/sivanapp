import { Exam } from '../../types';

export const ARABIC_EXAMS: Exam[] = [
  // 1. DÖNEM 1. YAZILI
  {
    id: 201,
    grade: 5,
    lesson: 'arabic',
    term: 1,
    examNumber: 1,
    title: "SINAV A (Temel Seviye)",
    theme: "Harfler ve Tanışma",
    description: "Arapça harfleri tanıma, harekeler ve basit tanışma diyalogları.",
    questions: [
      { id: 1, code: "AR.5.1", title: "Harfleri Tanıma", questionText: "Aşağıdaki harflerin okunuşlarını Türkçe harflerle yanlarına yazınız:\n1. ب\n2. ج\n3. س", type: 'text', placeholder: "1..., 2..., 3..." },
      { id: 2, code: "AR.5.2", title: "Harekeler", questionText: "'k-t-b' (ك ت ب) harflerini 'fetha' (üstün) harekesi ile birleştirerek yazınız veya okunuşunu belirtiniz.", type: 'text', placeholder: "Okunuşu: ..." },
      { id: 3, code: "AR.5.3", title: "Tanışma", questionText: "'Esselamü Aleyküm' ifadesinin Türkçe anlamı nedir ve buna nasıl cevap verilir?", type: 'text', placeholder: "Anlamı: ..., Cevap: ..." },
      { id: 4, code: "AR.5.4", title: "Kelime Bilgisi", questionText: "Aşağıdaki kelimelerin anlamlarını yazınız:\n1. Muallim (معلم)\n2. Talib (طالب)", type: 'text', placeholder: "1..., 2..." },
      { id: 5, code: "AR.5.5", title: "Kendini Tanıtma", questionText: "'Benim adım Ali' cümlesinin Arapça karşılığını yazmaya çalışınız (Latin harfleriyle de yazabilirsiniz).", type: 'text', placeholder: "İsmi ..." }
    ]
  },

  // 1. DÖNEM 2. YAZILI - SENARYO 1
  {
    id: 202,
    grade: 5,
    lesson: 'arabic',
    term: 1,
    examNumber: 2,
    title: "SINAV B (Harf Bilgisi ve Okul)",
    theme: "Harekeler ve Okul Eşyaları",
    description: "Hareke tanıma, harfleri ayırma ve okul eşyaları.",
    questions: [
      { 
        id: 1, 
        code: "AR.5.2.1", 
        title: "Harekeler (Ötre ve Esre)", 
        questionText: "Yandaki harflerden hangisi 'Ötre' (Damme) ve hangisi 'Esre' (Kesra) almıştır? Okunuşlarını yazınız. (Örn: مُ - n/u sesi, نِ - n/i sesi)", 
        type: 'text', 
        placeholder: "Ötreli harf okunuşu: ..., Esreli harf okunuşu: ..." 
      },
      { 
        id: 2, 
        code: "AR.5.2.2", 
        title: "Bitişik Harfleri Ayırma", 
        context: "Verilen kelimeler: جَهَدَ (Cehade) ve ثَبَتَ (Sebet)",
        questionText: "Bu kelimeleri oluşturan harfleri tek tek (ayrık halleriyle) yazınız.", 
        type: 'text', 
        placeholder: "Cehade harfleri: ..., Sebet harfleri: ..." 
      },
      { 
        id: 3, 
        code: "AR.5.2.3", 
        title: "Okul Eşyaları", 
        questionText: "Aşağıdaki okul eşyalarının Arapça karşılıklarını (okunuşlarını) yazınız:\n1. Masa\n2. Kalem\n3. Silgi", 
        type: 'text', 
        placeholder: "Masa: ..., Kalem: ..., Silgi: ..." 
      },
      { 
        id: 4, 
        code: "AR.5.2.4", 
        title: "Yazım Kuralları", 
        questionText: "Elif (ا), del (د), zel (ذ), ra (ر), ze (ز) ve vav (و) harflerinin en önemli yazım kuralı nedir? Kısaca açıklayınız.", 
        type: 'text', 
        placeholder: "Bu harflerin özelliği..." 
      },
      { 
        id: 5, 
        code: "AR.5.2.5", 
        title: "Kelime Türetme", 
        questionText: "'K-L-M' (Kef, Lam, Mim) harflerini birleştirerek anlamlı bir kelime oluşturunuz.", 
        type: 'text', 
        placeholder: "Kelime: ..." 
      }
    ]
  },

  // 1. DÖNEM 2. YAZILI - SENARYO 2
  {
    id: 203,
    grade: 5,
    lesson: 'arabic',
    term: 1,
    examNumber: 2,
    title: "SINAV C (Yazım ve İletişim)",
    theme: "Harf Konumları ve Tanışma",
    description: "Harflerin baştaki-ortadaki-sondaki halleri ve cinsiyet ayrımları.",
    questions: [
      { 
        id: 1, 
        code: "AR.5.3.1", 
        title: "Harf Konumları", 
        questionText: "'Sin' (س) harfinin kelime başındaki ve sonundaki yazılış farkını tarif ediniz.", 
        type: 'text', 
        placeholder: "Başta kuyruğu gider, sonda..." 
      },
      { 
        id: 2, 
        code: "AR.5.3.2", 
        title: "Harf Birleştirme", 
        questionText: "Ayrı verilen harfleri birleştiriniz: ب - ت - ه (B-T-H)", 
        type: 'text', 
        placeholder: "Birleşmiş hali veya okunuşu..." 
      },
      { 
        id: 3, 
        code: "AR.5.3.3", 
        title: "Müzekker - Müennes", 
        questionText: "Erkek öğrenci için 'Talibun' denir. Peki 'Kız Öğrenci' için ne denir?", 
        type: 'text', 
        placeholder: "Cevap..." 
      },
      { 
        id: 4, 
        code: "AR.5.3.4", 
        title: "Tenvin", 
        questionText: "'Kitab' kelimesinin sonuna 'ün' sesi veren tenvin (iki ötre) eklenirse nasıl okunur?", 
        type: 'text', 
        placeholder: "Okunuşu..." 
      },
      { 
        id: 5, 
        code: "AR.5.3.5", 
        title: "Selamlaşma", 
        questionText: "Sabahleyin okula girdiğinizde öğretmeninize veya arkadaşlarınıza söyleyebileceğiniz bir Arapça selamlaşma ifadesi yazınız.", 
        type: 'text', 
        placeholder: "Selam: ..." 
      }
    ]
  },

  // 1. DÖNEM 2. YAZILI - SENARYO 3
  {
    id: 204,
    grade: 5,
    lesson: 'arabic',
    term: 1,
    examNumber: 2,
    title: "SINAV D (İleri Seviye)",
    theme: "Okuma Kuralları ve Mekanlar",
    description: "Şedde, Med harfleri ve okul bölümleri.",
    questions: [
      { 
        id: 1, 
        code: "AR.5.4.1", 
        title: "Şedde Kullanımı", 
        questionText: "Bir kelimede şedde işareti (w şeklinde) varsa, o harf nasıl okunur? (Örn: Süllime)", 
        type: 'text', 
        placeholder: "Şedde harfi ... okutur." 
      },
      { 
        id: 2, 
        code: "AR.5.4.2", 
        title: "Kelime Özellikleri", 
        questionText: "'Mimhatün' (Silgi) kelimesinde uzatma (med) var mıdır? Varsa hangi harftedir?", 
        type: 'text', 
        placeholder: "Vardır/Yoktur. Çünkü..." 
      },
      { 
        id: 3, 
        code: "AR.5.4.3", 
        title: "Mekan İsimleri", 
        questionText: "Okulda ders işlediğimiz yer (Sınıf) ve eğitim gördüğümüz bina (Okul) kelimelerinin Arapçalarını yazınız.", 
        type: 'text', 
        placeholder: "Sınıf: ..., Okul: ..." 
      },
      { 
        id: 4, 
        code: "AR.5.4.4", 
        title: "Uzatma (Med) Harfleri", 
        questionText: "'Sad' (ص) harfini 'Elif' ile birleştirirsek (صا) nasıl okunur? 'Kef' (ك) harfini 'Ya' ile birleştirirsek (كي) nasıl okunur?", 
        type: 'text', 
        placeholder: "صا okunuşu: ..., كي okunuşu: ..." 
      },
      { 
        id: 5, 
        code: "AR.5.4.5", 
        title: "Harf Özellikleri", 
        questionText: "Tı (ط) ve Zı (ظ) harflerinin yazım şekilleri kelime başında, ortasında veya sonunda değişir mi?", 
        type: 'text', 
        placeholder: "Değişir / Değişmez..." 
      }
    ]
  }
];