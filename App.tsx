
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import ExamPaper from './components/ExamPaper';
import ResultView from './components/ResultView';
import ConfirmationModal from './components/ConfirmationModal';
import ApiKeyModal from './components/ApiKeyModal';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import { ALL_EXAMS } from './data/exams/index'; 
import { evaluateExam } from './services/geminiService';
import { addLog } from './services/logger';
import { initializeDemoUsers } from './data/demoUsers';
import { Exam, StudentAnswers, AIExamResult, User, ExamHistoryItem } from './types';
import { Sparkles, Brain, Loader2 } from 'lucide-react';

type ViewState = 'home' | 'exam' | 'result' | 'admin';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [view, setView] = useState<ViewState>('home');
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StudentAnswers>({});
  const [aiResult, setAiResult] = useState<AIExamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  // App Data (Exams are managed in state to allow Admin updates)
  const [exams, setExams] = useState<Exam[]>(ALL_EXAMS);

  // Modals State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'info' as 'info' | 'warning' });

  // Use state exams instead of constant
  const currentExam = exams.find(e => e.id === selectedExamId);

  // Load API key, User and Initialize Demo Data on mount
  useEffect(() => {
    // 1. Initialize Demo Data if empty
    initializeDemoUsers();

    // 2. Load API Key
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }

    // 3. Load Current User
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setShowLanding(false);
      
      // If admin, go to dashboard
      if (user.role === 'admin') {
        setView('admin');
      }
    }

    // 4. Load custom exams state if exists AND merge with new code-based exams
    const storedExamsStr = localStorage.getItem('app_exams');
    if (storedExamsStr) {
      try {
        const storedExams: Exam[] = JSON.parse(storedExamsStr);
        
        // Merge Logic: LocalStorage'da olmayan ama ALL_EXAMS'da olan yeni sınavları bul
        const storedExamIds = new Set(storedExams.map(e => e.id));
        const newExamsFromCode = ALL_EXAMS.filter(e => !storedExamIds.has(e.id));
        
        if (newExamsFromCode.length > 0) {
          // Yeni sınavları mevcut listeye ekle ve kaydet
          const mergedExams = [...storedExams, ...newExamsFromCode];
          setExams(mergedExams);
          localStorage.setItem('app_exams', JSON.stringify(mergedExams));
        } else {
          // Yeni sınav yoksa sadece kayıtlı olanları kullan
          setExams(storedExams);
        }
      } catch (e) {
        console.error("Sınav verisi yüklenirken hata oluştu, varsayılanlar yükleniyor.", e);
        setExams(ALL_EXAMS);
      }
    }
  }, []);

  const handleUpdateExams = (newExams: Exam[]) => {
    setExams(newExams);
    localStorage.setItem('app_exams', JSON.stringify(newExams));
    // Log
    if (currentUser?.role === 'admin') {
      addLog('ADMIN_ACTION', 'Sınav listesi güncellendi', currentUser.email);
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setView('admin');
    } else {
      setView('home');
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      addLog('LOGOUT', 'Kullanıcı çıkış yaptı', currentUser.email);
    }
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setView('home');
    setSelectedExamId(null);
    setShowLanding(true);
  };

  const handleSelectExam = (id: number) => {
    if (isLoading) return; // Prevent navigation during loading
    setSelectedExamId(id);
    setAnswers({});
    setAiResult(null);
    setError(null);
    setView('exam');
    window.scrollTo(0, 0);
    
    // Log exam start
    if (currentUser) {
       const examTitle = exams.find(e => e.id === id)?.title;
       addLog('EXAM_START', `${examTitle} sınavına başlandı`, currentUser.email);
    }
  };

  const handleAnswerChange = (qId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  // Step 1: User clicks "Finish". Validate and ask for confirmation.
  const handleFinishRequest = () => {
    if (isLoading) return;

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = currentExam?.questions.length || 0;

    if (answeredCount === 0) {
      setModalConfig({
        title: "Emin misiniz?",
        message: "Henüz hiçbir soruyu cevaplamadınız. Sınavı boş kağıt olarak teslim etmek istediğinize emin misiniz?",
        type: 'warning'
      });
    } else if (answeredCount < totalQuestions) {
      setModalConfig({
        title: "Eksik Sorular Var",
        message: `Toplam ${totalQuestions} sorudan sadece ${answeredCount} tanesini cevapladınız. Sınavı bu şekilde bitirmek istiyor musunuz?`,
        type: 'warning'
      });
    } else {
      setModalConfig({
        title: "Sınavı Bitir",
        message: "Tüm soruları cevapladınız. Sınavınızı Yapay Zeka değerlendirmesine göndermek üzeresiniz. Onaylıyor musunuz?",
        type: 'info'
      });
    }
    setIsConfirmModalOpen(true);
  };

  // Step 2: User confirmed they want to finish. Check for API Key.
  const handleConfirmedSubmission = () => {
    setIsConfirmModalOpen(false);

    if (apiKey) {
      // We have a key, proceed to AI evaluation
      executeAiEvaluation(apiKey);
    } else {
      // No key, open API Key Modal
      setIsApiKeyModalOpen(true);
    }
  };

  // Step 3: User entered API Key in the modal.
  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setIsApiKeyModalOpen(false);
    executeAiEvaluation(key);
  };

  // Save result to History
  const saveToHistory = (exam: Exam, result: AIExamResult) => {
    if (!currentUser) return;

    const historyItem: ExamHistoryItem = {
      id: Date.now().toString(),
      examId: exam.id,
      examTitle: exam.title + ' - ' + exam.theme,
      lesson: exam.lesson,
      score: result.totalScore,
      date: new Date().toISOString()
    };

    const key = `history_${currentUser.email}`;
    const existingHistoryStr = localStorage.getItem(key);
    let history: ExamHistoryItem[] = [];
    
    if (existingHistoryStr) {
      history = JSON.parse(existingHistoryStr);
    }
    
    history.push(historyItem);
    localStorage.setItem(key, JSON.stringify(history));

    addLog('EXAM_FINISH', `${exam.title} tamamlandı. Puan: ${result.totalScore}`, currentUser.email);
  };

  // Step 4: Perform the actual API call
  const executeAiEvaluation = async (key: string) => {
    if (!currentExam) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await evaluateExam(currentExam, answers, key);
      
      // Save result to history
      saveToHistory(currentExam, result);
      
      setAiResult(result);
      setView('result');
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error(err);
      let errorMsg = "Değerlendirme sırasında bir hata oluştu.";
      
      const errorMessage = err.message || '';

      if (errorMessage.includes('403') || errorMessage.includes('API key')) {
        errorMsg = "API Anahtarı geçersiz veya yetkisiz. Lütfen anahtarınızı kontrol edin.";
        setApiKey(''); 
        localStorage.removeItem('gemini_api_key');
      } else if (errorMessage.includes('429') || errorMessage.includes('Quota exceeded') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
        errorMsg = "Servis şu anda çok yoğun veya kotanız doldu (429). Lütfen 30 saniye bekleyip tekrar deneyin.";
      } else {
        errorMsg = errorMessage || "Bilinmeyen bir hata oluştu. İnternet bağlantınızı kontrol edin.";
      }
      
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    if (isLoading) return; // Prevent navigation during loading

    if (view === 'exam' && Object.keys(answers).length > 0) {
      if (!confirm("Sınavdan çıkarsanız cevaplarınız silinecektir. Emin misiniz?")) return;
    }
    setView('home');
    setSelectedExamId(null);
    setAnswers({});
    setAiResult(null);
  };

  // RENDER LOGIC
  
  if (currentUser) {
    // 0. Admin Dashboard
    if (view === 'admin' && currentUser.role === 'admin') {
      return (
        <AdminDashboard 
          user={currentUser} 
          exams={exams} 
          onUpdateExams={handleUpdateExams}
          onLogout={handleLogout} 
        />
      );
    }

    return (
      <div className="min-h-screen bg-background text-gray-800 font-sans pb-10">
        
        {/* BLOCKING OVERLAY FOR LOADING STATE */}
        {isLoading && (
          <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in cursor-wait touch-none">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
              <div className="bg-white p-4 rounded-full shadow-xl relative z-10 border-4 border-accent/10">
                <Brain className="w-12 h-12 text-accent animate-pulse" />
              </div>
            </div>
            
            <h2 className="mt-8 text-2xl font-extrabold text-gray-800 tracking-tight">Değerlendiriliyor...</h2>
            
            <div className="mt-4 space-y-2 text-center max-w-xs">
              <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span>Cevaplar okunuyor</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 justify-center animate-pulse delay-75">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Yapay zeka analiz ediyor</span>
              </div>
            </div>

            <p className="absolute bottom-10 text-xs text-gray-400 font-medium">Lütfen sayfadan ayrılmayınız</p>
          </div>
        )}

        <ConfirmationModal 
          isOpen={isConfirmModalOpen}
          onClose={() => !isLoading && setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmedSubmission}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
        />

        <ApiKeyModal
          isOpen={isApiKeyModalOpen}
          onClose={() => !isLoading && setIsApiKeyModalOpen(false)}
          onSubmit={handleApiKeySubmit}
        />

        {error && (
          <div className="fixed top-4 right-4 z-[60] bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-md animate-bounce mx-4 mt-12 md:mt-0">
            <p className="font-bold">Hata</p>
            <p className="text-sm">{error}</p>
            <button onClick={() => setError(null)} className="absolute top-2 right-2 text-red-500 hover:text-red-800">✖</button>
          </div>
        )}

        {view === 'home' && (
          <Home 
            exams={exams}
            onSelectExam={handleSelectExam} 
            user={currentUser} 
            onLogout={handleLogout} 
          />
        )}
        
        {view === 'exam' && currentExam && (
          <ExamPaper 
            exam={currentExam} 
            answers={answers} 
            onAnswerChange={handleAnswerChange}
            onSubmit={handleFinishRequest}
            onBack={handleGoHome}
            isSubmitting={isLoading}
          />
        )}

        {view === 'result' && aiResult && currentExam && (
          <ResultView 
            result={aiResult} 
            exam={currentExam} 
            answers={answers}
            onHome={handleGoHome} 
          />
        )}
      </div>
    );
  }

  // 2. If no user and showLanding is true, show Landing Page
  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  // 3. If no user and showLanding is false, show Auth (Login/Register)
  return <Auth onLogin={handleLogin} />;
};

export default App;
