import { User, ExamHistoryItem, LessonType } from '../types';

export const DEMO_USERS: User[] = [
  // --- 5. SINIF (Leaderboard Test Grubu) ---
  { name: "Ali Yılmaz", email: "ali.yilmaz@okul.com", grade: 5, role: 'student', registeredAt: "2024-01-15T09:00:00.000Z" },
  { name: "Zeynep Demir", email: "zeynep.demir@okul.com", grade: 5, role: 'student', registeredAt: "2024-02-01T10:30:00.000Z" },
  { name: "Kerem Aktürkoğlu", email: "kerem.akturkoglu@okul.com", grade: 5, role: 'student', registeredAt: "2024-03-05T14:20:00.000Z" },
  { name: "Barış Alper", email: "baris.alper@okul.com", grade: 5, role: 'student', registeredAt: "2024-01-12T11:00:00.000Z" },
  { name: "Ferdi Kadıoğlu", email: "ferdi.kadioglu@okul.com", grade: 5, role: 'student', registeredAt: "2024-02-28T09:15:00.000Z" },
  { name: "Semih Kılıçsoy", email: "semih.kilicsoy@okul.com", grade: 5, role: 'student', registeredAt: "2024-03-10T16:45:00.000Z" },
  { name: "İsmail Yüksek", email: "ismail.yuksek@okul.com", grade: 5, role: 'student', registeredAt: "2024-01-05T08:30:00.000Z" },
  { name: "Mert Günok", email: "mert.gunok@okul.com", grade: 5, role: 'student', registeredAt: "2024-02-14T13:20:00.000Z" },
  { name: "Cengiz Ünder", email: "cengiz.under@okul.com", grade: 5, role: 'student', registeredAt: "2024-03-01T10:10:00.000Z" },
  { name: "Hakan Çalhanoğlu", email: "hakan.calhanoglu@okul.com", grade: 5, role: 'student', registeredAt: "2024-01-20T15:50:00.000Z" },
  { name: "Arda Güler", email: "arda.guler@okul.com", grade: 5, role: 'student', registeredAt: "2024-02-05T12:00:00.000Z" },
  { name: "Kenan Yıldız", email: "kenan.yildiz@okul.com", grade: 5, role: 'student', registeredAt: "2024-03-15T09:45:00.000Z" },
  { name: "Orkun Kökçü", email: "orkun.kokcu@okul.com", grade: 5, role: 'student', registeredAt: "2024-01-25T14:30:00.000Z" },
  { name: "Salih Özcan", email: "salih.ozcan@okul.com", grade: 5, role: 'student', registeredAt: "2024-02-18T11:15:00.000Z" },

  // Ortaokul Diğer
  { name: "Mehmet Öz", email: "mehmet.oz@okul.com", grade: 6, role: 'student', registeredAt: "2024-01-20T14:15:00.000Z" },
  { name: "Elif Kaya", email: "elif.kaya@okul.com", grade: 6, role: 'student', registeredAt: "2024-03-10T08:45:00.000Z" },
  { name: "Burak Çelik", email: "burak.celik@okul.com", grade: 7, role: 'student', registeredAt: "2024-01-05T11:20:00.000Z" },
  { name: "Ayşe Yıldız", email: "ayse.yildiz@okul.com", grade: 7, role: 'student', registeredAt: "2024-02-15T16:00:00.000Z" },
  { name: "Caner Erkin", email: "caner.erkin@okul.com", grade: 8, role: 'student', registeredAt: "2024-01-10T13:30:00.000Z" },
  { name: "Selin Aksoy", email: "selin.aksoy@okul.com", grade: 8, role: 'student', registeredAt: "2024-03-01T09:15:00.000Z" },
  
  // Lise
  { name: "Baran Bulut", email: "baran.bulut@lise.com", grade: 9, role: 'student', registeredAt: "2024-01-12T10:00:00.000Z" },
  { name: "Derya Deniz", email: "derya.deniz@lise.com", grade: 9, role: 'student', registeredAt: "2024-02-20T15:45:00.000Z" },
  { name: "Emre Koç", email: "emre.koc@lise.com", grade: 10, role: 'student', registeredAt: "2024-01-25T11:30:00.000Z" },
  { name: "Gamze Arslan", email: "gamze.arslan@lise.com", grade: 10, role: 'student', registeredAt: "2024-03-05T14:00:00.000Z" },
  { name: "Hakan Şahin", email: "hakan.sahin@lise.com", grade: 11, role: 'student', registeredAt: "2024-01-08T09:30:00.000Z" },
  { name: "İrem Kurt", email: "irem.kurt@lise.com", grade: 11, role: 'student', registeredAt: "2024-02-10T13:45:00.000Z" },
  { name: "Kemal Sunal", email: "kemal.sunal@lise.com", grade: 12, role: 'student', registeredAt: "2024-01-02T08:15:00.000Z" },
  { name: "Leyla Mecnun", email: "leyla.mecnun@lise.com", grade: 12, role: 'student', registeredAt: "2024-03-12T16:30:00.000Z" }
];

// Rastgele puan üret (60-100 arası ağırlıklı)
const getRandomScore = () => {
  return Math.floor(Math.random() * (100 - 65 + 1)) + 65;
};

// Rastgele tarih üret (Son 30 gün)
const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

const generateMockHistory = (grade: number): ExamHistoryItem[] => {
  const history: ExamHistoryItem[] = [];
  const lessons: LessonType[] = ['turkish', 'math', 'science', 'social', 'english', 'arabic', 'religious'];
  
  // Her öğrenci için 3-6 arası rastgele sınav geçmişi oluştur
  const examCount = Math.floor(Math.random() * 4) + 3; 

  for (let i = 0; i < examCount; i++) {
    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
    const score = getRandomScore();
    
    // Yüksek puanlı öğrencileri simüle et (Arda ve Kenan hep iyi yapsın)
    const bonus = (Math.random() > 0.8) ? 5 : 0;
    
    history.push({
      id: Date.now().toString() + Math.random().toString(),
      examId: Math.floor(Math.random() * 1000), // Dummy exam ID
      examTitle: `${grade}. Sınıf ${randomLesson.charAt(0).toUpperCase() + randomLesson.slice(1)} Tarama`,
      lesson: randomLesson,
      score: Math.min(100, score + bonus),
      date: getRandomDate()
    });
  }

  return history;
};

export const initializeDemoUsers = () => {
  console.log("Sistem başlatılıyor: Demo öğrenciler ve geçmiş verileri yükleniyor...");
  
  // 1. Kullanıcı Listesini Güncelle (Mevcut listeyi genişlet)
  const storedIndex = localStorage.getItem('user_index');
  const existingUsers: User[] = storedIndex ? JSON.parse(storedIndex) : [];
  
  // Yeni kullanıcıları eklenecekler listesine al (zaten varsa ekleme)
  const mergedUsers = [...existingUsers];
  
  DEMO_USERS.forEach(demoUser => {
    if (!existingUsers.some(u => u.email === demoUser.email)) {
      mergedUsers.push(demoUser);
    }
  });

  localStorage.setItem('user_index', JSON.stringify(mergedUsers));

  // 2. Kullanıcı Detaylarını ve Geçmişini Oluştur
  mergedUsers.forEach(user => {
    // Kullanıcı detayını kaydet
    localStorage.setItem(`user_${user.email}`, JSON.stringify(user));

    // Eğer kullanıcının geçmişi yoksa, rastgele geçmiş oluştur (Sadece DEMO kullanıcılar için)
    const historyKey = `history_${user.email}`;
    if (!localStorage.getItem(historyKey) && DEMO_USERS.some(du => du.email === user.email)) {
      const mockHistory = generateMockHistory(user.grade);
      localStorage.setItem(historyKey, JSON.stringify(mockHistory));
    }
  });
};