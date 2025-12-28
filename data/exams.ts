import { Exam, Question } from '../types';

const questionsTemplate: Question[] = [
  {
    id: 1,
    code: "T.O.5.18",
    title: "Şiirde Biçim Özellikleri",
    context: "", 
    questionText: "Yukarıdaki şiiri biçim yönünden inceleyiniz. Şiirin dize (mısra) ve kıta sayılarını yazınız.",
    type: 'text',
    placeholder: "Örn: 2 Kıta, 8 Dize"
  },
  {
    id: 2,
    code: "T.O.5.20",
    title: "Söz Sanatları",
    questionText: "", 
    type: 'text',
    placeholder: "Örn: Benzetme yapılmıştır çünkü..."
  },
  {
    id: 3,
    code: "T.O.5.14",
    title: "Hikaye Unsurları",
    context: "", // Hikaye metni buraya gelecek
    questionText: "Metindeki hikaye unsurlarını (Yer, Zaman, Kahramanlar) belirleyiniz.",
    type: 'text',
    placeholder: "Yer: ..., Zaman: ..., Kahramanlar: ..."
  },
  {
    id: 4,
    code: "T.O.5.5",
    title: "Söz Varlığını Tahmin Etme",
    questionText: "Metinde geçen anlamını bilmediğiniz bir kelimeyi seçerek anlamını tahmin ediniz.",
    type: 'text',
    placeholder: "Kelime: ..., Tahminim: ..."
  },
  {
    id: 5,
    code: "T.O.5.8",
    title: "Çıkarım Yapma",
    questionText: "", // Bağlama göre değişecek
    type: 'text',
    placeholder: "Bence sebebi..."
  },
  {
    id: 6,
    code: "T.O.5.19",
    title: "Düşünceyi Geliştirme Yolları",
    context: "", // Bilgilendirici metin buraya gelecek
    questionText: "Bu metinde kullanılan düşünceyi geliştirme yolunu (Tanımlama, Karşılaştırma, Örneklendirme, Benzetme) yazınız.",
    type: 'text',
    placeholder: "Örn: Karşılaştırma yapılmıştır."
  },
  {
    id: 7,
    code: "T.Y.5.20",
    title: "Geçiş ve Bağlantı İfadeleri",
    questionText: "", // Boşluk doldurma cümlesi
    type: 'text',
    placeholder: "Uygun ifadeyi yazınız (ama, fakat, lakin, oysa...)"
  },
  {
    id: 8,
    code: "T.Y.5.21",
    title: "Yazım ve Noktalama",
    questionText: "", // Hatalı cümle
    type: 'text',
    placeholder: "Cümlenin doğru hali..."
  },
  {
    id: 9,
    code: "T.Y.5.7",
    title: "Yaratıcı Yazma",
    questionText: "Verilen konuya uygun, Giriş-Gelişme-Sonuç bütünlüğü içinde kısa bir hikaye yazınız.",
    type: 'textarea',
    placeholder: "Hikayenizi buraya yazınız..."
  }
];

// Helper to create specific exams
const createQuestions = (
  theme: string, 
  poem: string, 
  q2Text: string,
  storyContext: string,
  unknownWordQuestion: string,
  inferenceQuestion: string,
  infoTextContext: string,
  transitionQuestion: string,
  correctionQuestion: string,
  writingPrompt: string
): Question[] => {
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

export const EXAMS: Exam[] = [
  {
    id: 1,
    title: "SINAV A",
    theme: "Doğa ve Hayvanlar",
    description: "Doğa sevgisi temalı, görsel okuma ve söz sanatları ağırlıklı sınav.",
    questions: createQuestions(
      "Doğa Sevgisi",
      // Soru 1: Şiir
      "ORMAN VE BİZ\nYeşil örtü serilir dağlara,\nKuşlar neşe katar bağlara.\nNefes olur her ağaç bize,\nHayat verir tüm evrene.\n\nKorumalıyız her dalı,\nSevmeliyiz bu masalı.", 
      // Soru 2: Söz Sanatı
      "Şiirdeki 'Nefes olur her ağaç bize' dizesinde ağaç insana benzetilmiştir. Siz de şiirden bir 'Kişileştirme' örneği bulup yazınız.",
      // Soru 3: Hikaye
      "Küçük sincap Pıtır, kış hazırlığı için meşe ağacının kovuğuna ceviz taşıyordu. Hava kararmak üzereydi ve orman derin bir sessizliğe bürünmüştü. Birden çalıların arasından hışırtı duydu.",
      // Soru 4: Kelime Anlamı
      "Metindeki 'kovuk' kelimesinin anlamını cümlenin gelişinden tahmin ediniz.",
      // Soru 5: Çıkarım
      "Pıtır neden acele ediyor olabilir? Metinden hareketle bir çıkarım yapınız.",
      // Soru 6: Düşünceyi Geliştirme (Tanımlama)
      "Orman; ağaçlar, bitkiler ve hayvanların bir arada yaşadığı, kendine özgü iklimi olan geniş yeşil alanlardır. Dünyanın akciğerleri olarak bilinirler.",
      // Soru 7: Geçiş İfadesi
      "Pikniğe gitmek için hazırlandık ................... aniden yağmur bastırınca evde kaldık. (ama, oysa, çünkü)",
      // Soru 8: Yazım Yanlışı
      "Cümleyi düzeltiniz: 'bu yaz tatilinde ağrı dağına tırmanacağız.'",
      // Soru 9: Yazma
      "'Bir ağacın dilinden' insanların doğaya verdiği zararları anlatan kısa bir yazı yazınız."
    )
  },
  {
    id: 2,
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
      // Karşılaştırma
      "Yalnızlık insanı mutsuz eden soğuk bir kış günü gibidir, dostluk ise içimizi ısıtan güneşli bir bahar sabahına benzer. Dostu olan insan kendini daha güçlü hisseder.",
      "Efe ödevlerini bitirdi ................... dışarı çıkmasına izin verilmedi. (fakat, böylece, örneğin)",
      "Cümleyi düzeltiniz: 'Ahmet beyler yarın akşam bize geleceklermi?'",
      "'Paylaşmanın Önemi' konulu, başından geçen veya kurguladığın bir olayı hikayeleştirerek anlatınız."
    )
  },
  {
    id: 3,
    title: "SINAV C",
    theme: "Bilim ve Teknoloji",
    description: "Teknolojik gelişmeler ve bilim insanları temalı sınav.",
    questions: createQuestions(
      "Teknoloji",
      "BİLGİ ÇAĞI\nTuşlara basınca dünyalar açılır,\nBilgi nehri ekranlardan saçılır.\nUzaklar yakın olur bir anda,\nTeknoloji harikası her yanda.",
      "Şiirdeki 'Bilgi nehri ekranlardan saçılır' ifadesinde yapılan söz sanatını (Benzetme/Abartma) açıklayınız.",
      "Genç mucit Elif, laboratuvarında günlerdir çalışıyordu. Tasarladığı robot nihayet hareket etmeye başlamıştı. Robotun gözleri mavi ışık saçarak Elif'e baktı.",
      "Metindeki 'mucit' kelimesinin anlamını tahmin ediniz.",
      "Robotun gözleri neden mavi ışık saçmış olabilir?",
      // Örneklendirme
      "Teknoloji hayatımızın her alanında bize kolaylıklar sağlar. Örneğin; çamaşır makinesi sayesinde saatlerce uğraşacağımız işi bir düğmeyle hallederiz, uçaklar sayesinde aylarca sürecek yolları saatlerde gideriz.",
      "Bilgisayar oyunlarını çok seviyor ................... derslerini de ihmal etmiyor. (buna rağmen, oysa, çünkü)",
      "Cümleyi düzeltiniz: 'TÜBİTAK'ın düzenlediği bilim fuarı 15 mayısta yapılacak.'",
      "'Gelecekte icat etmek istediğin bir makine' hakkında bilgilendirici ve hayal gücü geniş bir yazı yazınız."
    )
  },
  {
    id: 4,
    title: "SINAV D",
    theme: "Sağlık ve Spor",
    description: "Sağlıklı yaşam ve sporun önemi üzerine sınav.",
    questions: createQuestions(
      "Sağlık",
      "SPOR YAPALIM\nKoş, oyna, zıpla durma,\nSağlığına sağlık kat, yorulma.\nSebze meyve bolca ye,\nHastalıklara güle güle de.",
      "Şiirde kişileştirilen kavram var mıdır? Varsa nedir?",
      "Milli yüzücü, son kulvarda rakiplerini geride bırakmak için tüm gücünü harcıyordu. Kulaçları suyu döverken, tribünlerden gelen tezahüratları hayal meyal duyuyordu.",
      "Metindeki 'kulvar' kelimesinin anlamını tahmin ediniz.",
      "Yüzücü neden tezahüratları 'hayal meyal' duyuyor olabilir?",
      // Benzetme (Düşünceyi Geliştirme)
      "Vücudumuz tıpkı bir makine gibidir. Nasıl ki arabanın çalışması için yakıta ihtiyacı varsa, vücudumuzun da enerji için sağlıklı besinlere ihtiyacı vardır.",
      "Dişlerini düzenli fırçalamadı ................... dişleri çürüdü. (bu nedenle, ama, oysa)",
      "Cümleyi düzeltiniz: 'doktor hakan bey hastalarına çok iyi davranır.'",
      "'Sağlıklı Yaşam' için neler yapmalıyız? Giriş, gelişme ve sonuç bölümlerine dikkaterek anlatınız."
    )
  },
  {
    id: 5,
    title: "SINAV E",
    theme: "Milli Kültürümüz",
    description: "Geleneklerimiz, bayramlarımız ve kültürel değerlerimiz.",
    questions: createQuestions(
      "Bayramlar",
      "BAYRAM SABAHI\nErkenden kalkarız bayram sabahı,\nGiyeriz en güzel elbiseleri.\nBüyüklerin eli öpülür saygıyla,\nKüçüklere şeker verilir sevgiyle.",
      "Şiirin ana duygusu nedir?",
      "Köy meydanında düğün hazırlıkları başlamıştı. Kazanlarda keşkekler kaynıyor, davul zurna sesleri dağlarda yankılanıyordu. Ayşe Nine sandıktan oyalı yazmasını çıkardı.",
      "Metindeki 'meydan' kelimesinin anlamını tahmin ediniz.",
      "Ayşe Nine neden oyalı yazmasını çıkarmış olabilir?",
      // Karşılaştırma
      "Eskiden haberleşmek için mektup yazılır, cevabı günler hatta haftalar sonra gelirdi. Oysa günümüzde cep telefonları sayesinde saniyeler içinde görüntülü görüşme yapabiliyoruz.",
      "Geleneklerimizi korumalıyız ................... onlar bizi biz yapan değerlerdir. (çünkü, ama, fakat)",
      "Cümleyi düzeltiniz: 'ramazan bayramı'nda dedemleri ziyaret ettik.'",
      "Yaşadığınız yöreye ait bir geleneği veya bir bayram anınızı anlatınız."
    )
  },
  {
    id: 6,
    title: "SINAV F",
    theme: "Milli Mücadele Kahramanları",
    description: "Vatan sevgisi, bağımsızlık mücadelesi ve kahramanlık destanları.",
    questions: createQuestions(
      "Kurtuluş Savaşı",
      "İSTİKLAL YOLUNDA\nKağnılar gıcırdar dağ yollarında,\nElif'in, Ayşe'nin omuzlarında.\nMermi taşınır cepheye durmadan,\nVatan aşkı yanar sönmeden.",
      "Şiirde 'Vatan aşkı yanar sönmeden' dizesiyle anlatılmak istenen nedir? Hangi söz sanatı yapılmıştır?",
      "Hasan Tahsin, İzmir rıhtımında düşman askerlerini görünce yüreği daraldı. Vatan toprağına postalların basmasına dayanamazdı. Kalabalığın arasından sıyrılıp en öne geçti ve 'İlk Kurşun'u sıktı.",
      "Metindeki 'rıhtım' kelimesinin anlamını tahmin ediniz.",
      "Hasan Tahsin neden kalabalığın en önüne geçmiş olabilir?",
      // Tanımlama
      "Bağımsızlık; bir milletin kendi toprakları üzerinde, başka bir devletin egemenliği altında olmadan, hür ve özgürce yaşamasıdır. Türk milleti bağımsızlığına düşkün bir millettir.",
      "Ordumuzun silahı azdı ................... inancı tamdı. (ama, çünkü, örneğin)",
      "Cümleyi düzeltiniz: 'Gazi mustafa kemal, 19 mayıs 1919'da samsun'a çıktı.'",
      "'Vatan Sevgisi' konulu, Milli Mücadele kahramanlarından birini (Şerife Bacı, Sütçü İmam vb.) konu alan bir hikaye yazınız."
    )
  },
  {
    id: 7,
    title: "SINAV G (TONGUÇ SERİSİ)",
    theme: "Genel Değerlendirme",
    description: "Tonguç Akademi kaynaklı, Senaryo 1 kazanımlarına uygun hazırlık sınavı.",
    questions: [
      {
        id: 1,
        code: "T.O.5.18",
        title: "Şiirde Biçim Özellikleri",
        context: "Yeşil örtü serilir dağlara,\nKuşlar neşe katar bağlara.\nNefes olur her ağaç bize,\nHayat verir tüm evrene.\n\nKorumalıyız her dalı,\nSevmeliyiz bu masalı.",
        questionText: "Yukarıdaki şiiri biçim yönünden inceleyerek dize (mısra) ve kıta sayılarını yazınız.",
        type: 'text',
        placeholder: "Dize sayısı: ..., Kıta sayısı: ..."
      },
      {
        id: 2,
        code: "T.O.5.20",
        title: "Söz Sanatları",
        context: "Kitaplar hiç konuşmayan en sabırlı dostlardır. Kızmadan küsmeden beklerler bizi raflarda. Her sayfası bir hazine sandığı gibidir.",
        questionText: "Bu dizelerde kitapların hangi özelliklerle 'kişileştirildiğini' ve nelere 'benzetildiğini' açıklayınız.",
        type: 'text',
        placeholder: "Kişileştirme: ..., Benzetme: ..."
      },
      {
        id: 3,
        code: "T.O.5.14",
        title: "Hikaye Unsurları",
        context: "Aslı okuldan çıktıktan sonra soluklanmak için parkta mola verdi. Parkta oynayan küçük bir çocuğun ağladığını görünce yanına gitti. Çocuğun dizinin kanadığını fark edince çantasından temiz bir bez çıkarıp yaranın üzerine koydu. Bu sırada çocuğun annesi telaşla geldi.",
        questionText: "Bu metindeki hikâye unsurlarını (Yer, Zaman, Kahramanlar ve Olay) belirleyerek yazınız.",
        type: 'text',
        placeholder: "Yer: ..., Zaman: ..., Kişiler: ..., Olay: ..."
      },
      {
        id: 4,
        code: "T.O.5.5",
        title: "Söz Varlığını Tahmin Etme",
        context: "Rüzgâr yeryüzünün görünmez ama en çalışkan yolcusudur. Hiçbir yerde konaklamaz, sürekli bir yerden bir yere koşturur... Bazen de hiddetiyle denizlerde dev dalgalar oluşturur.",
        questionText: "Metinde geçen 'konaklamak' ve 'hiddet' kelimelerinin anlamlarını metnin bağlamından hareketle tahmin ediniz.",
        type: 'text',
        placeholder: "Konaklamak tahminim: ..., Hiddet tahminim: ..."
      },
      {
        id: 5,
        code: "T.O.5.8",
        title: "Çıkarım Yapma",
        context: "Bilim insanları dünyayı değiştiren buluşları, doğru soruları sormaktan korkmadıkları için yapmışlardır. Unutmamak gerekir ki: Merak ilmin hocasıdır.",
        questionText: "'Merak ilmin hocasıdır' sözüyle anlatılmak istenen derin anlamı (merakın bilgiye ulaşmadaki rolünü) kendi cümlelerinizle yorumlayınız.",
        type: 'text',
        placeholder: "Bu sözle anlatılmak istenen..."
      },
      {
        id: 6,
        code: "T.O.5.19",
        title: "Düşünceyi Geliştirme Yolları",
        context: "Belli kurallar çerçevesinde yapılan bedensel ve zihinsel gelişimi destekleyen hareketlerin tümüne spor denir. Okçuluk ve yüzme gibi sporlar bireysel kategoride yer alır. Takım sporlarında iş birliği daha önemliyken bireysel sporlarda kişisel performans öne çıkar.",
        questionText: "Bu metinde kullanılan 'tanımlama', 'örneklendirme' ve 'karşılaştırma' yöntemlerine metinden birer örnek gösteriniz.",
        type: 'text',
        placeholder: "Tanımlama: ..., Örnek: ..., Karşılaştırma: ..."
      },
      {
        id: 7,
        code: "T.Y.5.20",
        title: "Geçiş ve Bağlantı İfadeleri",
        questionText: "Boşluklara (ama, fakat, çünkü, hatta) getiriniz:\n1. Ona çok güveniyordum .................... beni hayal kırıklığına uğrattı.\n2. Erken yatmayı düşünüyordum .................... sabah çok erken kalkmam gerekiyor.",
        type: 'text',
        placeholder: "1. ..., 2. ..."
      },
      {
        id: 8,
        code: "T.Y.5.21",
        title: "Yazım ve Noktalama",
        questionText: "Hataları düzeltiniz:\n1. Önümüzdeki mayıs ayında taşınıyoruz.\n2. Mimar Sinan, her yıl 9 nisan tarihinde anılır.\n3. Sümela'nın neden bu kadar yükseğe inşa edildiğini hiç düşündünüz mü ( )",
        type: 'text',
        placeholder: "Doğru halleri..."
      },
      {
        id: 9,
        code: "T.Y.5.7",
        title: "Yaratıcı Yazma",
        questionText: "'Paylaşmanın Önemi' veya 'Vatan Sevgisi' konularından birini seçerek; giriş, gelişme ve sonuç bölümlerine dikkat ettiğiniz kısa bir hikâye yazınız.",
        type: 'textarea',
        placeholder: "Hikayenizi buraya yazınız..."
      }
    ]
  }
];