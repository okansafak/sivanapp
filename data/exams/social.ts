
import { Exam } from '../../types';

export const SOCIAL_EXAMS: Exam[] = [
  {
    id: 401,
    grade: 5,
    lesson: 'social',
    term: 1,
    examNumber: 2,
    title: "SINAV A (MEB Senaryosu)",
    theme: "Kültür, Miras ve Çevremiz",
    description: "Yardımlaşma, çevre değişimi, afetler, komşularımız ve ortak miras konularını içeren MEB uyumlu sınav.",
    questions: [
      // SB.5.1.3. Toplumsal birliği sürdürmeye yönelik yardımlaşma ve dayanışma faaliyetlerine katkı sağlayabilme (1 Soru)
      { 
        id: 1, 
        code: "SB.5.1.3", 
        title: "Yardımlaşma ve Dayanışma", 
        questionText: "Toplumsal birlik ve beraberliği güçlendirmek amacıyla yapılan yardımlaşma faaliyetlerine (örneğin Kızılay'a bağış yapmak, askıda ekmek uygulaması vb.) bir örnek vererek, bu davranışın toplum üzerindeki olumlu etkisini kısaca açıklayınız.", 
        type: 'textarea', 
        placeholder: "Örnek ve etkisi..." 
      },
      // SB.5.2.2. Yaşadığı ilde doğal ve beşerî çevredeki değişimi neden ve sonuçlarıyla yorumlayabilme (2 Soru)
      { 
        id: 2, 
        code: "SB.5.2.2", 
        title: "Doğal ve Beşerî Çevre", 
        questionText: "Yaşadığınız çevrede insanların ihtiyaçlarını karşılamak (barınma, ulaşım vb.) amacıyla doğada yaptığı değişikliklere (beşerî unsurlar) iki örnek veriniz.", 
        type: 'text', 
        placeholder: "1. Örnek..., 2. Örnek..." 
      },
      { 
        id: 3, 
        code: "SB.5.2.2", 
        title: "Çevresel Değişim", 
        context: "Şehirlerde nüfusun artmasıyla birlikte daha fazla konuta ve fabrikaya ihtiyaç duyulmuştur. Bu durum doğal alanların azalmasına neden olmuştur.",
        questionText: "Metne göre veya kendi gözlemlerinize dayanarak; hızlı nüfus artışı ve sanayileşmenin doğal çevre üzerindeki olumsuz bir sonucunu yazınız.", 
        type: 'text', 
        placeholder: "Doğal çevre şu şekilde etkilenir..." 
      },
      // SB.5.2.3. Yaşadığı ilde meydana gelebilecek afetlerin etkilerini azaltmaya yönelik farkındalık etkinlikleri düzenleyebilme (2 Soru)
      { 
        id: 4, 
        code: "SB.5.2.3", 
        title: "Afet Bilinci (Deprem)", 
        questionText: "Türkiye bir deprem ülkesidir. Deprem riskine karşı evimizde alabileceğimiz önlemlerden (eşyaların sabitlenmesi, çanta hazırlanması vb.) bir tanesini yazınız.", 
        type: 'text', 
        placeholder: "Alınabilecek önlem..." 
      },
      { 
        id: 5, 
        code: "SB.5.2.3", 
        title: "Afet Bilinci (Erozyon/Heyelan)", 
        questionText: "Eğimli arazilerde toprağın kaymasını (erozyon veya heyelan) engellemek için yapılabilecek en etkili doğal yöntem nedir?", 
        type: 'text', 
        placeholder: "Cevap..." 
      },
      // SB.5.2.4. Ülkemize komşu devletler hakkında bilgi toplayabilme (1 Soru)
      { 
        id: 6, 
        code: "SB.5.2.4", 
        title: "Komşularımız", 
        questionText: "Türkiye'nin sınır komşularından iki tanesinin ismini yazınız. (Doğu, Batı veya Güney komşularımızdan seçebilirsiniz).", 
        type: 'text', 
        placeholder: "1..., 2..." 
      },
      // SB.5.3.1. Yaşadığı ildeki ortak miras öğelerine ilişkin oluşturduğu ürünü paylaşabilme (1 Soru)
      { 
        id: 7, 
        code: "SB.5.3.1", 
        title: "Ortak Miras", 
        questionText: "Yaşadığınız ilde veya genel olarak ülkemizde bulunan, geçmişten günümüze kalan ve 'Ortak Miras' olarak kabul edilen tarihi bir yapıya veya doğal güzelliğe bir örnek veriniz.", 
        type: 'text', 
        placeholder: "Örn: Pamukkale, Selimiye Camii..." 
      }
    ]
  },
  {
    id: 402,
    grade: 5,
    lesson: 'social',
    term: 1,
    examNumber: 2,
    title: "SINAV B (Senaryo 5)",
    theme: "Etkin Vatandaşlık ve Çevremiz",
    description: "Demokrasi, haklar, doğal-beşeri çevre ve komşularımız üzerine kapsamlı senaryo soruları.",
    questions: [
      {
        id: 1,
        code: "SB.5.1.1",
        title: "Demokratik Aile",
        questionText: "Aile içinde bir karar alınırken tüm aile fertlerinin fikrinin sorulması ve ortak bir karara varılması, demokratik yaşamın hangi özelliği ile açıklanabilir?",
        type: 'text',
        placeholder: "Demokratik özellik..."
      },
      {
        id: 2,
        code: "SB.5.2.2",
        title: "Çevresel Değişim",
        questionText: "Yaşadığınız çevrede inşa edilen bir baraj, otoyol veya okulun yapılması, doğal çevrede nasıl bir değişime yol açar? Bu değişim \"beşerî\" mi yoksa \"doğal\" bir değişim midir? Nedenini açıklayınız.",
        type: 'textarea',
        placeholder: "Değişim türü ve nedeni..."
      },
      {
        id: 3,
        code: "SB.5.2.3",
        title: "Afet Önlemleri",
        questionText: "Erozyon ve heyelan riskini azaltmak için eğimli arazilerde ne gibi önlemler alınabilir? İki örnek veriniz.",
        type: 'text',
        placeholder: "1..., 2..."
      },
      {
        id: 4,
        code: "SB.5.1.2",
        title: "Etkin Vatandaş",
        questionText: "\"Etkin vatandaş\" kime denir? Etkin bir vatandaşın sahip olması gereken sorumluluklardan iki tanesini yazınız.",
        type: 'textarea',
        placeholder: "Tanım ve sorumluluklar..."
      },
      {
        id: 5,
        code: "SB.5.2.4",
        title: "Komşularımız",
        questionText: "Türkiye'nin sınır komşularından iki tanesini ve bulundukları yönleri yazınız.",
        type: 'text',
        placeholder: "Ülke - Yön..."
      },
      {
        id: 6,
        code: "SB.5.3.1",
        title: "Ortak Miras",
        questionText: "\"Ortak miras\" kavramını açıklayarak yaşadığınız çevredeki bir ortak miras öğesine (tarihî yapı, doğal varlık vb.) örnek veriniz.",
        type: 'text',
        placeholder: "Tanım ve Örnek..."
      },
      {
        id: 7,
        code: "SB.5.1.3",
        title: "Çocuk Hakları",
        questionText: "Çocuk Hakları Sözleşmesi'ne göre çocukların sahip olduğu \"eğitim hakkı\" engellenirse toplumda ne gibi sorunlar ortaya çıkabilir?",
        type: 'text',
        placeholder: "Olası sorunlar..."
      },
      {
        id: 8,
        code: "SB.5.1.4",
        title: "Hak Arama Özgürlüğü",
        questionText: "CİMER (Cumhurbaşkanlığı İletişim Merkezi) gibi kurumların vatandaşlara sağladığı en büyük kolaylık nedir?",
        type: 'text',
        placeholder: "Sağladığı kolaylık..."
      }
    ]
  },
  {
    id: 403,
    grade: 5,
    lesson: 'social',
    term: 1,
    examNumber: 2,
    title: "SINAV C (Kapsamlı Değerlendirme)",
    theme: "Birlikte Yaşam, Çevremiz ve Mirasımız",
    description: "Yardımlaşma, doğal afetler, komşularımız, ortak miras ve etkin vatandaşlık konularını kapsayan geniş kapsamlı sınav.",
    questions: [
      // BÖLÜM 1: BİRLİKTE YAŞAMAK
      {
        id: 1,
        code: "SB.5.1.3",
        title: "Birlikte Yaşamak",
        questionText: "Toplumda bireylerin bir amaç uğruna birbirlerine destek olması ve zor durumlarda kenetlenmesi toplumsal birliği nasıl etkiler? Bir örnekle açıklayınız.",
        type: 'textarea',
        placeholder: "Toplumsal birlik ve etkisi..."
      },
      {
        id: 2,
        code: "SB.5.1.1",
        title: "Demokratik Aile",
        questionText: "Demokratik bir ailede, tatile nereye gidileceğine karar verilirken izlenmesi gereken yöntem ne olmalıdır? Neden?",
        type: 'text',
        placeholder: "Yöntem ve nedeni..."
      },
      // BÖLÜM 2: EVİMİZ DÜNYA
      {
        id: 3,
        code: "SB.5.2.2",
        title: "Çevresel Etki",
        questionText: "Yaşadığınız bölgedeki ormanlık bir alanın kesilerek yerine sanayi sitesi yapılması, o çevrede ne tür bir değişime (doğal mı, beşerî mi) yol açar? Bu değişimin olumsuz bir sonucunu yazınız.",
        type: 'textarea',
        placeholder: "Değişim türü ve olumsuz sonuç..."
      },
      {
        id: 4,
        code: "SB.5.2.3",
        title: "Afet Bilinci (Deprem)",
        questionText: "Deprem anında okulda olduğunuzu varsayalım. \"Çök-Kapan-Tutun\" hareketini neden yapmalıyız ve bu sırada hangi eşyalardan uzak durmalıyız?",
        type: 'text',
        placeholder: "Neden yapılır, nelerden uzak durulur..."
      },
      {
        id: 5,
        code: "SB.5.2.3",
        title: "Afet Bilinci (Heyelan)",
        questionText: "Özellikle Karadeniz gibi eğimli ve yağışlı bölgelerimizde görülen, toprağın kütle halinde aşağı kaymasıyla oluşan doğal afet hangisidir? Bu afetten korunmak için ne yapılabilir?",
        type: 'text',
        placeholder: "Afet adı ve önlem..."
      },
      // BÖLÜM 3: ÜLKEMİZE KOMŞU DEVLETLER
      {
        id: 6,
        code: "SB.5.2.4",
        title: "Komşularımız",
        questionText: "Türkiye’nin batı komşularından birini ve doğu komşularından birini yazarak bu ülkelerin başkentlerini belirtiniz.",
        type: 'text',
        placeholder: "Batı komşusu/Başkent - Doğu Komşusu/Başkent..."
      },
      {
        id: 7,
        code: "SB.5.2.4",
        title: "Sınır Komşuları",
        questionText: "Ülkemizin en uzun kara sınırına sahip olduğu komşusu hangisidir? Bu sınırın ülkemiz açısından önemi nedir?",
        type: 'text',
        placeholder: "En uzun sınır komşusu ve önemi..."
      },
      // BÖLÜM 4: ORTAK MİRASIMIZ
      {
        id: 8,
        code: "SB.5.3.1",
        title: "Ortak Miras",
        questionText: "Bir eserin \"Ortak Miras\" sayılabilmesi için hangi özelliklere sahip olması gerekir?",
        type: 'text',
        placeholder: "Gerekli özellikler..."
      },
      {
        id: 9,
        code: "SB.5.3.1",
        title: "Tarihi Yapılar",
        questionText: "Yaşadığınız ilde bulunan ve geçmişten günümüze korunarak gelmiş bir tarihî yapıyı (cami, kale, köprü vb.) tanıtarak bunun neden korunması gerektiğini açıklayınız.",
        type: 'textarea',
        placeholder: "Yapı adı ve korunma nedeni..."
      },
      // BÖLÜM 5: ETKİN VATANDAŞLIK
      {
        id: 10,
        code: "SB.5.1.4",
        title: "Tüketici Hakları",
        questionText: "Aldığınız bir teknolojik ürünün bozuk çıkması durumunda, bir \"etkin vatandaş\" olarak izlemeniz gereken yasal süreç nedir? Hangi kuruma başvurulabilir?",
        type: 'textarea',
        placeholder: "İzlenecek yol ve kurum..."
      }
    ]
  }
];
