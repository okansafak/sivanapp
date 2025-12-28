import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import ExamPaper from './components/ExamPaper';
import ResultView from './components/ResultView';
import ConfirmationModal from './components/ConfirmationModal';
import ApiKeyModal from './components/ApiKeyModal';
import { ALL_EXAMS } from './data/exams/index'; // Updated import
import { evaluateExam } from './services/geminiService';
import { Exam, StudentAnswers, AIExamResult } from './types';
import { Analytics } from "@vercel/analytics/next";

type ViewState = 'home' | 'exam' | 'result';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StudentAnswers>({});
  const [aiResult, setAiResult] = useState<AIExamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  // Modals State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'info' as 'info' | 'warning' });

  // Use ALL_EXAMS instead of old EXAMS
  const currentExam = ALL_EXAMS.find(e => e.id === selectedExamId);

  // Load API key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSelectExam = (id: number) => {
    setSelectedExamId(id);
    setAnswers({});
    setAiResult(null);
    setError(null);
    setView('exam');
    window.scrollTo(0, 0);
  };

  const handleAnswerChange = (qId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  // Step 1: User clicks "Finish". Validate and ask for confirmation.
  const handleFinishRequest = () => {
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

  // Step 4: Perform the actual API call
  const executeAiEvaluation = async (key: string) => {
    if (!currentExam) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await evaluateExam(currentExam, answers, key);
      setAiResult(result);
      setView('result');
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error(err);
      let errorMsg = "Değerlendirme sırasında bir hata oluştu.";
      
      const errorMessage = err.message || '';

      // Check for common 403 or invalid key errors
      if (errorMessage.includes('403') || errorMessage.includes('API key')) {
        errorMsg = "API Anahtarı geçersiz veya yetkisiz. Lütfen anahtarınızı kontrol edin.";
        // Clear invalid key so user is prompted again
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
    if (view === 'exam' && Object.keys(answers).length > 0) {
      if (!confirm("Sınavdan çıkarsanız cevaplarınız silinecektir. Emin misiniz?")) return;
    }
    setView('home');
    setSelectedExamId(null);
    setAnswers({});
    setAiResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-gray-800 font-sans pb-10">
      
      {/* 1. Confirmation Modal (Are you sure?) */}
      <ConfirmationModal 
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmedSubmission}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />

      {/* 2. API Key Modal (If key is missing) */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSubmit={handleApiKeySubmit}
      />

      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-[60] bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-md animate-bounce mx-4 mt-12 md:mt-0">
          <p className="font-bold">Hata</p>
          <p className="text-sm">{error}</p>
          <button onClick={() => setError(null)} className="absolute top-2 right-2 text-red-500 hover:text-red-800">✖</button>
        </div>
      )}

      {view === 'home' && <Home onSelectExam={handleSelectExam} />}
      
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

      <Analytics />
    </div>
  );
};

export default App;