import { Exam, Question } from '../types';

const questionsTemplate: Question[] = [
  {
    id: 1,
    code: "T.O.5.18",
    title: "Şiir Bilgisi",
    context: "", // Dinamik olarak doldurulacak
    questionText: "Yukarıdaki şiiri okuyarak dize ve kıta sayısını yazınız.",
    type: 'text',
    placeholder: "Örn: 2 Kıta, 4 Dize"
  },
  {
    id: 2,
    code: "T.O.5.20",
    title: "Söz Sanatları / Anlam",
    questionText: "", // Dinamik olarak doldurulacak
    type: 'text',
    placeholder: "Cevabınız..."
  },
  {
    id: 3,
    code: "T.O.5.14",
    title: "Hikaye Unsurları",
    context: "\"Kışın en soğuk günüydü. Ormandaki yaşlı ayı, mağarasında derin bir uykuya dalmadan önce son kez dışarı bakıp rüzgarı dinledi.\"",
    questionText: "Metnin yer, zaman ve kahramanlarını belirleyiniz.",
    type: 'text',
    placeholder: "Yer: ..., Zaman: ..., Kahraman: ..."
  },
  {
    id: 4,
    code: "T.O.5.5",
    title: "Kelime Anlamı",
    questionText: "Metindeki 'derin' kelimesinin bu cümledeki anlamını tahmin ediniz.",
    type: 'text',
    placeholder: "Tahmininiz..."
  },
  {
    id: 5,
    code: "T.O.5.8",
    title: "Çıkarım Yapma",
    questionText: "Yaşlı ayı neden rüzgarı dinlemiş olabilir?",
    type: 'text',
    placeholder: "Çünkü..."
  },
  {
    id: 6,
    code: "T.O.5.19",
    title: "Düşünceyi Geliştirme Yolları",
    context: "\"Aslanlar ormanların kralı olarak bilinir ancak filler onlardan çok daha güçlü varlıklardır.\"",
    questionText: "Bu metinde kullanılan düşünceyi geliştirme yolunu (Tanımlama/Karşılaştırma) yazınız.",
    type: 'text',
    placeholder: "Cevap..."
  },
  {
    id: 7,
    code: "T.Y.5.20",
    title: "Geçiş ve Bağlantı İfadeleri",
    questionText: "\"Dışarı çıkmak istiyordu ................. çok şiddetli yağmur yağıyordu.\" (ama, oysa, çünkü)",
    type: 'text',
    placeholder: "Uygun ifadeyi yazınız"
  },
  {
    id: 8,
    code: "T.Y.5.21",
    title: "Yazım Kuralları",
    questionText: "Aşağıdaki cümleyi düzeltiniz: \"ayşe 23 nisan'da şiir okudumu\"",
    type: 'text',
    placeholder: "Doğru hali..."
  },
  {
    id: 9,
    code: "T.Y.5.7",
    title: "Yaratıcı Yazarlık",
    questionText: "Konu ile ilgili 3 cümlelik yaratıcı bir hikaye başlangıcı yazınız.",
    type: 'textarea',
    placeholder: "Hikayenizi buraya yazınız..."
  }
];

// Helper to create specific exams
const createQuestions = (
  theme: string, 
  poem: string, 
  q2Text: string,
  storyContext?: string,
  comparisonContext?: string
): Question[] => {
  return questionsTemplate.map(q => {
    let newQ = { ...q };

    // Soru 1: Şiir Bağlamı
    if (newQ.id === 1) {
      newQ.context = poem;
    }

    // Soru 2: Şiir Sorusu
    if (newQ.id === 2) {
      newQ.questionText = q2Text;
    }

    // Soru 3: Hikaye Bağlamı
    if (newQ.id === 3 && storyContext) {
      newQ.context = storyContext;
    }

    // Soru 5: Hikaye Çıkarım Sorusu (Bağlama göre güncelleme)
    if (newQ.id === 5) {
      if (theme.includes('Teknoloji')) newQ.questionText = "Astronot neden sessizliği dinlemiş olabilir?";
      if (theme.includes('Sağlık')) newQ.questionText = "Doktor neden koridoru dinlemiş olabilir?";
      if (theme.includes('Dostluk')) newQ.questionText = "Çocuk neden arkadaşına gülümsemiş olabilir?";
      if (theme.includes('Zaman')) newQ.questionText = "Yaşlı dede neden zamanı düşünmüş olabilir?";
    }

    // Soru 6: Karşılaştırma Metni
    if (newQ.id === 6 && comparisonContext) {
      newQ.context = comparisonContext;
    }

    // Soru 9: Yazma Konusu
    if (newQ.id === 9) {
      newQ.questionText = `"${theme}" konulu 3 cümlelik yaratıcı bir hikaye başlangıcı yazınız.`;
    }

    return newQ;
  });
};

export const EXAMS: Exam[] = [
  {
    id: 1,
    title: "SINAV A",
    theme: "Doğa ve Hayvanlar",
    description: "Doğa sevgisi, hayvanlar alemi ve betimlemeler üzerine kurulu bir sınav.",
    questions: createQuestions(
      "Doğa Sevgisi",
      "DOĞA ANA\nToprak ana kucağını açmış,\nHer canlıya hayat saçmış.\nSuyuyla, havasıyla besler,\nBizden sadece sevgi bekler.", // 1 Kıta, 4 Dize
      "Şiirdeki 'Toprak ana kucağını açmış' dizesinde yapılan söz sanatı (Kişileştirme/Benzetme) nedir?",
      undefined, // Default ayı hikayesi
      undefined  // Default aslan/fil karşılaştırması
    )
  },
  {
    id: 2,
    title: "SINAV B",
    theme: "Yardımlaşma ve Dostluk",
    description: "Dostluk bağları, yardımlaşma ve insan ilişkileri temalı sınav.",
    questions: createQuestions(
      "Dostluk",
      "CAN DOSTUM\nİyi günde yanımda sen,\nKötü günde yine sen.\n\nSırlarımı saklarsın,\nBeni hiç yargılamazsın.\n\nSeninle oyunlar güzel,\nHayat seninle masal gibi özel.", // 3 Kıta, 6 Dize
      "'Hayat seninle masal gibi özel' dizesindeki benzetme yönü nedir?",
      "\"Okulun ilk günüydü. Arka sıradaki çekingen çocuk, sırasında derin düşüncelere dalmadan önce yanındaki arkadaşına bakıp gülümsedi.\"",
      "\"Tek başına çalışmak hızlı olabilir ancak iş birliği ile çalışmak işleri çok daha kolay ve eğlenceli hale getirir.\""
    )
  },
  {
    id: 3,
    title: "SINAV C",
    theme: "Uzay ve Teknoloji",
    description: "Bilim, teknoloji ve gelecek hayalleri üzerine kurgulanmış sorular.",
    questions: createQuestions(
      "Teknoloji",
      "ROBOTLAR\nDemirden kolları var,\nHiç yorulmadan çalışırlar,\nİşleri çabucak yaparlar.\n\nElektrikle beslenirler,\nKomutları dinlerler,\nGeleceği getirirler.", // 2 Kıta, 6 Dize
      "Şiirde robotların özelliklerinden iki tanesini yazınız.",
      "\"Yıl 2050'ydi. Uzay İstasyonu'ndaki astronot, kapsülünde derin bir uykuya dalmadan önce son kez dünyaya bakıp uzayın sessizliğini dinledi.\"",
      "\"Tabletler kolay taşınabilir cihazlardır ancak bilgisayarlar onlardan çok daha güçlü işlemcilere sahiptir.\""
    )
  },
  {
    id: 4,
    title: "SINAV D",
    theme: "Sağlık ve Spor",
    description: "Sağlıklı yaşam, beslenme ve spor bilinci.",
    questions: createQuestions(
      "Sağlık",
      "SAĞLIK OLSUN\nSabahları erken kalkarım,\nElimi yüzümü yıkarım.\nKahvaltımı güzelce yaparım,\nDişlerimi fırçalarım,\nOkuluma neşeyle koşarım.", // 1 Kıta, 5 Dize (Beşlik)
      "Şiirde sağlıklı olmak için yapılan eylemlerden iki tanesini yazınız.",
      "\"Hastanenin en yoğun günüydü. Nöbetçi doktor, odasında kısa bir uykuya dalmadan önce son kez koridora bakıp sesleri dinledi.\"",
      "\"Yürüyüş yapmak faydalıdır ancak yüzmek tüm kasları çalıştıran daha etkili bir spordur.\""
    )
  },
  {
    id: 5,
    title: "SINAV E",
    theme: "Zaman ve Değerler",
    description: "Geçmişten günümüze değerlerimiz ve zaman yönetimi.",
    questions: createQuestions(
      "Zaman",
      "ZAMAN NEHİR GİBİ\nAkıp gider zaman durmadan,\nKimseyi beklemez hiç sormadan.\nDün geçti, gitti artık,\nYarını düşünmek mantık.\n\nSaatin sesi tik tak,\nÖmür geçiyor bak.\nHer anın kıymetini bil,\nZaman en büyük hazine bil.", // 2 Kıta, 8 Dize
      "'Zaman nehir gibi' ifadesinde zaman neye benzetilmiştir?",
      "\"Güneş batmak üzereydi. Köydeki yaşlı dede, sedirinde derin bir uykuya dalmadan önce köstekli saatine bakıp zamanı düşündü.\"",
      "\"Geçmişten ders almak önemlidir ancak geleceği planlamak daha büyük bir vizyon gerektirir.\""
    )
  }
];