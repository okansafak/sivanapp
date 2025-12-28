import { Exam } from '../../types';

export const MATH_EXAMS: Exam[] = [
  {
    id: 301,
    lesson: 'math',
    term: 1,
    examNumber: 1,
    title: "SINAV A (Doğal Sayılar)",
    theme: "Doğal Sayılar ve İşlemler",
    description: "Milyonlar, örüntüler ve toplama-çıkarma işlemleri.",
    questions: [
      { id: 1, code: "M.5.1.1", title: "Basamak Değeri", questionText: "72.583.190 sayısının 'binler' bölüğündeki sayıların toplamı kaçtır?", type: 'text', placeholder: "Cevap..." },
      { id: 2, code: "M.5.1.2", title: "Örüntüler", questionText: "4, 9, 14, 19, ... örüntüsünün 8. adımındaki sayı kaçtır?", type: 'text', placeholder: "Cevap..." },
      { id: 3, code: "M.5.1.3", title: "Toplama İşlemi", questionText: "Bir stadyumda 12.450 erkek, 10.230 kadın seyirci vardır. Toplam seyirci sayısını bulunuz.", type: 'text', placeholder: "İşlem ve Sonuç..." },
      { id: 4, code: "M.5.1.4", title: "Çıkarma İşlemi", questionText: "85.000 TL parası olan Ali Bey, 23.450 TL'ye araba almıştır. Geriye kaç TL'si kalmıştır?", type: 'text', placeholder: "Cevap..." },
      { id: 5, code: "M.5.1.5", title: "Zihinden İşlem", questionText: "48 + 36 işlemini zihinden nasıl yaparsınız? Adımlarınızı kısaca yazınız.", type: 'text', placeholder: "Önce onlukları topladım..." }
    ]
  },
  {
    id: 302,
    lesson: 'math',
    term: 1,
    examNumber: 2,
    title: "SINAV A (Kesirler)",
    theme: "Kesirler ve Ondalık Gösterim",
    description: "Birim kesirler, tam sayılı kesirler ve ondalık gösterim.",
    questions: [
      { id: 1, code: "M.5.2.1", title: "Birim Kesir", questionText: "1/7, 1/3, 1/12 kesirlerini büyükten küçüğe sıralayınız.", type: 'text', placeholder: "Sıralama..." },
      { id: 2, code: "M.5.2.2", title: "Tam Sayılı Kesir", questionText: "15/4 bileşik kesrini tam sayılı kesre çeviriniz.", type: 'text', placeholder: "Cevap..." },
      { id: 3, code: "M.5.2.3", title: "Denk Kesir", questionText: "2/5 kesrinin paydası 20 olacak şekilde genişletilmiş halini yazınız.", type: 'text', placeholder: "Cevap..." },
      { id: 4, code: "M.5.2.4", title: "Kesirlerle Toplama", questionText: "Bir pastanın 2/8'sini Ayşe, 3/8'ünü Fatma yemiştir. Toplam ne kadarı yenmiştir?", type: 'text', placeholder: "Cevap..." },
      { id: 5, code: "M.5.2.5", title: "Ondalık Gösterim", questionText: "2 tam 5 bölü 10 (2 5/10) kesrini ondalık gösterim (virgüllü) olarak yazınız.", type: 'text', placeholder: "Cevap..." }
    ]
  }
];