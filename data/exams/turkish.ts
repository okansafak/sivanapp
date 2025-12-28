import { Exam, Question } from '../../types';

const questionsTemplate: Question[] = [
  { id: 1, code: "T.O.5.18", title: "Şiirde Biçim Özellikleri", context: "", questionText: "Yukarıdaki şiiri biçim yönünden inceleyiniz. Şiirin dize (mısra) ve kıta sayılarını yazınız.", type: 'text', placeholder: "Örn: 2 Kıta, 8 Dize" },
  { id: 2, code: "T.O.5.20", title: "Söz Sanatları", questionText: "", type: 'text', placeholder: "Örn: Benzetme yapılmıştır çünkü..." },
  { id: 3, code: "T.O.5.14", title: "Hikaye Unsurları", context: "", questionText: "Metindeki hikaye unsurlarını (Yer, Zaman, Kahramanlar) belirleyiniz.", type: 'text', placeholder: "Yer: ..., Zaman: ..., Kahramanlar: ..." },
  { id: 4, code: "T.O.5.5", title: "Söz Varlığını Tahmin Etme", questionText: "Metinde geçen anlamını bilmediğiniz bir kelimeyi seçerek anlamını tahmin ediniz.", type: 'text', placeholder: "Kelime: ..., Tahminim: ..." },
  { id: 5, code: "T.O.5.8", title: "Çıkarım Yapma", questionText: "", type: 'text', placeholder: "Bence sebebi..." },
  { id: 6, code: "T.O.5.19", title: "Düşünceyi Geliştirme Yolları", context: "", questionText: "Bu metinde kullanılan düşünceyi geliştirme yolunu (Tanımlama, Karşılaştırma, Örneklendirme, Benzetme) yazınız.", type: 'text', placeholder: "Örn: Karşılaştırma yapılmıştır." },
  { id: 7, code: "T.Y.5.20", title: "Geçiş ve Bağlantı İfadeleri", questionText: "", type: 'text', placeholder: "Uygun ifadeyi yazınız (ama, fakat, lakin, oysa...)" },
  { id: 8, code: "T.Y.5.21", title: "Yazım ve Noktalama", questionText: "", type: 'text', placeholder: "Cümlenin doğru hali..." },
  { id: 9, code: "T.Y.5.7", title: "Yaratıcı Yazma", questionText: "Verilen konuya uygun, Giriş-Gelişme-Sonuç bütünlüğü içinde kısa bir hikaye yazınız.", type: 'textarea', placeholder: "Hikayenizi buraya yazınız..." }
];

const createQuestions = (theme: string, poem: string, q2Text: string, storyContext: string, unknownWordQuestion: string, inferenceQuestion: string, infoTextContext: string, transitionQuestion: string, correctionQuestion: string, writingPrompt: string): Question[] => {
  return questionsTemplate.map(q => {
    let newQ = { ...q };
    if (newQ.id === 1) newQ.context = poem;
    if (newQ.id === 2) newQ.questionText = q2Text;
    if (newQ.id === 3) newQ.context = storyContext;
    if (newQ.id === 4) newQ.questionText = unknownWordQuestion;
    if (newQ.id === 5) newQ.questionText = inferenceQuestion;
    if (newQ.id === 6) newQ.context = infoTextContext;
    if (newQ.id === 7) newQ.questionText = transitionQuestion;
    if (newQ.id === 8) newQ.questionText = correctionQuestion;
    if (newQ.id === 9) newQ.questionText = writingPrompt;
    return newQ;
  });
};

export const TURKISH_EXAMS: Exam[] = [
  {
    id: 101,
    lesson: 'turkish',
    term: 1,
    examNumber: 2,
    title: "SINAV A",
    theme: "Doğa ve Hayvanlar",
    description: "Doğa sevgisi temalı, görsel okuma ve söz sanatları ağırlıklı sınav.",
    questions: createQuestions(
      "Doğa Sevgisi",
      "ORMAN VE BİZ\nYeşil örtü serilir dağlara,\nKuşlar neşe katar bağlara.\nNefes olur her ağaç bize,\nHayat verir tüm evrene.\n\nKorumalıyız her dalı,\nSevmeliyiz bu masalı.", 
      "Şiirdeki 'Nefes olur her ağaç bize' dizesinde ağaç insana benzetilmiştir. Siz de şiirden bir 'Kişileştirme' örneği bulup yazınız.",
      "Küçük sincap Pıtır, kış hazırlığı için meşe ağacının kovuğuna ceviz taşıyordu. Hava kararmak üzereydi ve orman derin bir sessizliğe bürünmüştü. Birden çalıların arasından hışırtı duydu.",
      "Metindeki 'kovuk' kelimesinin anlamını cümlenin gelişinden tahmin ediniz.",
      "Pıtır neden acele ediyor olabilir? Metinden hareketle bir çıkarım yapınız.",
      "Orman; ağaçlar, bitkiler ve hayvanların bir arada yaşadığı, kendine özgü iklimi olan geniş yeşil alanlardır. Dünyanın akciğerleri olarak bilinirler.",
      "Pikniğe gitmek için hazırlandık ................... aniden yağmur bastırınca evde kaldık. (ama, oysa, çünkü)",
      "Cümleyi düzeltiniz: 'bu yaz tatilinde ağrı dağına tırmanacağız.'",
      "'Bir ağacın dilinden' insanların doğaya verdiği zararları anlatan kısa bir yazı yazınız."
    )
  },
  {
    id: 102,
    lesson: 'turkish',
    term: 1,
    examNumber: 2,
    title: "SINAV B",
    theme: "Yardımlaşma ve Dostluk",
    description: "Dostluk kavramı ve insan ilişkileri üzerine kurgulanmış sınav.",
    questions: createQuestions(
      "Dostluk",
      "GERÇEK DOST\nDost dediğin kara günde belli olur,\nYüreği seninle, eli seninle olur.\nDüşersen kaldırır, ağlarsan güldürür,\nGerçek dostluk ömür boyu sürdürülür.",
      "Şiirde 'Dost' nelere benzetilmiştir veya hangi özellikleri ön plana çıkarılmıştır?",
      "Okulun bahçesinde tek başına oturan yeni öğrenci Can'ı gören Efe, elindeki simidi ikiye böldü. Usulca yanına yaklaşıp 'Merhaba, paylaşmak ister misin?' dedi. Can'ın yüzünde kocaman bir gülümseme belirdi.",
      "Metindeki 'usulca' kelimesinin anlamını tahmin ediniz.",
      "Can'ın yüzünde neden gülümseme belirmiş olabilir?",
      "Yalnızlık insanı mutsuz eden soğuk bir kış günü gibidir, dostluk ise içimizi ısıtan güneşli bir bahar sabahına benzer. Dostu olan insan kendini daha güçlü hisseder.",
      "Efe ödevlerini bitirdi ................... dışarı çıkmasına izin verilmedi. (fakat, böylece, örneğin)",
      "Cümleyi düzeltiniz: 'Ahmet beyler yarın akşam bize geleceklermi?'",
      "'Paylaşmanın Önemi' konulu, başından geçen veya kurguladığın bir olayı hikayeleştirerek anlatınız."
    )
  },
  {
    id: 107,
    lesson: 'turkish',
    term: 1,
    examNumber: 2,
    title: "SINAV H (TONGUÇ A)",
    theme: "Kapsamlı Deneme - Senaryo 1",
    description: "Tonguç Akademi kaynaklı, anlam bilgisi ve dil bilgisi becerilerini ölçen kapsamlı deneme sınavı.",
    questions: [
      { id: 1, code: "T.O.5.18", title: "Şiirde Biçim Özellikleri", context: "Yeşil örtü serilir dağlara,\nKuşlar neşe katar bağlara.\nNefes olur her ağaç bize,\nHayat verir tüm evrene.", questionText: "Yukarıdaki şiiri biçim yönünden inceleyerek dize (mısra) ve kıta sayılarını belirtiniz.", type: 'text', placeholder: "Kıta Sayısı: ..., Dize Sayısı: ..." },
      { id: 2, code: "T.O.5.20", title: "Söz Sanatları", context: "Kitaplar hiç konuşmayan en sabırlı dostlardır,\nKızmadan küsmeden beklerler bizi raflarda,\nHer sayfası bir hazine sandığı gibidir.", questionText: "Bu dizelerdeki 'kişileştirme' ve 'benzetme' sanatlarını örnekleriyle açıklayınız.", type: 'text', placeholder: "Kişileştirme örneği: ... / Benzetme örneği: ..." },
      { id: 3, code: "T.O.5.14", title: "Hikaye Unsurları", context: "Aslı okuldan çıktıktan sonra biraz soluklanmak için eve yakın bir parkta mola verdi. Bu sırada parkta oynayan küçük bir çocuğun ağladığını duydu. Çocuğun dizinin kanadığını görünce çantasından temiz bir bez çıkarıp yaranın üzerine koydu.", questionText: "Bu metnin hikâye unsurlarını (Yer, Zaman, Kişiler, Olay) belirleyiniz:", type: 'text', placeholder: "Yer: ..., Zaman: ..., Kişiler: ..., Olay: ..." },
      { id: 4, code: "T.O.5.5", title: "Söz Varlığını Tahmin Etme", context: "Küçük sincap Pıtır, kış hazırlığı için meşe ağacının kovuğuna ceviz taşıyordu. Hava kararmak üzereydi ve orman derin bir sessizliğe bürünmüştü.", questionText: "Yukarıdaki metinde geçen 'kovuk' kelimesinin anlamını metnin bağlamından hareketle tahmin ediniz.", type: 'text', placeholder: "Tahminim: ..." },
      { id: 5, code: "T.O.5.8", title: "Çıkarım Yapma", context: "Bilim insanları dünyayı değiştiren buluşları, doğru soruları sormaktan korkmadıkları için yapmışlardır. Unutmamak gerekir ki: Merak ilmin hocasıdır.", questionText: "Metinde geçen 'Merak ilmin hocasıdır' sözüyle anlatılmak istenen derin anlamı (çıkarımı) yorumlayınız.", type: 'text', placeholder: "Bu sözle anlatılmak istenen..." },
      { id: 6, code: "T.O.5.19", title: "Düşünceyi Geliştirme Yolları", context: "Belli kurallar çerçevesinde yapılan bedensel ve zihinsel gelişimi destekleyen hareketlerin tümüne spor denir. Okçuluk ve yüzme gibi sporlar bireysel kategoride yer alır. Takım sporlarında iş birliği daha önemliyken bireysel sporlarda kişisel performans öne çıkar.", questionText: "Bu metinde kullanılan 'tanımlama', 'örneklendirme' ve 'karşılaştırma' düşünceyi geliştirme yollarına metinden birer örnek gösteriniz.", type: 'text', placeholder: "Tanımlama: ..., Örneklendirme: ..., Karşılaştırma: ..." },
      { id: 7, code: "T.Y.5.20", title: "Geçiş ve Bağlantı İfadeleri", questionText: "Aşağıdaki cümlelerde boş bırakılan yerlere uygun ifadeleri (ama, fakat, çünkü, oysa ki) getiriniz:\n1. Ona güveniyordum .................... beni hayal kırıklığına uğrattı.\n2. Erken yatmayı düşünüyordum .................... sabah çok erken kalkmam gerekiyor.", type: 'text', placeholder: "1. ..., 2. ..." },
      { id: 8, code: "T.Y.5.21", title: "Yazım ve Noktalama", questionText: "Hataları düzeltiniz:\n1. Önümüzdeki mayıs ayında taşınıyoruz.\n2. Bu yıl kurban bayramı ne zamana denk geliyor?\n3. Sümela'nın neden bu kadar yükseğe inşa edildiğini hiç düşündünüz mü ( )", type: 'text', placeholder: "Doğru yazımları..." },
      { id: 9, code: "T.Y.5.7", title: "Yaratıcı Yazma", questionText: "'Paylaşmanın Önemi' konusunu ele alan; giriş, gelişme ve sonuç bölümlerinden oluşan yaratıcı bir hikâye yazınız.", type: 'textarea', placeholder: "Hikayeniz..." }
    ]
  }
];