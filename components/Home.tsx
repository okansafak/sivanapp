import React, { useState } from 'react';
import { ALL_EXAMS } from '../data/exams/index';
import { LessonType, LESSON_LABELS, Exam } from '../types';
import { BookOpen, Calculator, Globe, Heart, Activity, ArrowRight, ChevronLeft, GraduationCap } from 'lucide-react';

interface HomeProps {
  onSelectExam: (id: number) => void;
}

const LESSON_ICONS: Record<LessonType, React.ElementType> = {
  turkish: BookOpen,
  math: Calculator,
  science: Activity,
  social: Globe,
  english: Globe,
  religious: Heart,
  arabic: GraduationCap
};

// Available lessons based on what we have in data
const AVAILABLE_LESSONS: LessonType[] = ['turkish', 'math', 'arabic']; 

const Home: React.FC<HomeProps> = ({ onSelectExam }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
  const [selectedTermConfig, setSelectedTermConfig] = useState<{term: 1|2, examNum: 1|2} | null>(null);

  // Step 1: Select Lesson
  const handleLessonSelect = (lesson: LessonType) => {
    setSelectedLesson(lesson);
    setStep(2);
  };

  // Step 2: Select Term and Exam Number
  const handleTermSelect = (term: 1 | 2, examNum: 1 | 2) => {
    setSelectedTermConfig({ term, examNum });
    setStep(3);
  };

  // Filter exams based on selections
  const filteredExams = ALL_EXAMS.filter(e => 
    e.lesson === selectedLesson && 
    e.term === selectedTermConfig?.term && 
    e.examNumber === selectedTermConfig?.examNum
  );

  const resetSelection = () => {
    setStep(1);
    setSelectedLesson(null);
    setSelectedTermConfig(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-3 tracking-tight">
          5. Sınıf <span className="text-accent">Akıllı Sınav Portalı</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {step === 1 && "Lütfen çalışmak istediğiniz dersi seçin."}
          {step === 2 && `${LESSON_LABELS[selectedLesson!]} dersi için sınav dönemi seçin.`}
          {step === 3 && "Çözmek istediğiniz deneme sınavını seçin."}
        </p>
      </div>

      {/* Breadcrumb / Navigation */}
      {step > 1 && (
        <button 
          onClick={() => setStep(step - 1 as any)}
          className="flex items-center text-gray-500 hover:text-accent font-medium mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Geri Dön
        </button>
      )}

      {/* STEP 1: LESSON SELECTION */}
      {step === 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
          {AVAILABLE_LESSONS.map((lesson) => {
            const Icon = LESSON_ICONS[lesson];
            return (
              <button
                key={lesson}
                onClick={() => handleLessonSelect(lesson)}
                className="group flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-blue-50 p-4 rounded-full group-hover:bg-accent group-hover:text-white transition-colors mb-4">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent group-hover:text-white" />
                </div>
                <span className="text-lg font-bold text-gray-800">{LESSON_LABELS[lesson]}</span>
                <span className="text-xs text-gray-400 mt-2 font-medium">Soru Bankası</span>
              </button>
            );
          })}
          {/* Placeholder for other lessons */}
          {['science', 'social', 'english', 'religious'].map((l) => (
             <div key={l} className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl border border-gray-100 opacity-60 grayscale cursor-not-allowed">
                <div className="bg-gray-200 p-4 rounded-full mb-4">
                  {React.createElement(LESSON_ICONS[l as LessonType], { className: "w-8 h-8 text-gray-400" })}
                </div>
                <span className="text-lg font-bold text-gray-500">{LESSON_LABELS[l as LessonType]}</span>
                <span className="text-xs text-gray-400 mt-2">Yakında</span>
             </div>
          ))}
        </div>
      )}

      {/* STEP 2: TERM SELECTION */}
      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in max-w-2xl mx-auto">
          <button onClick={() => handleTermSelect(1, 1)} className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-l-8 border-blue-500 flex items-center justify-between group transition-all">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">1. Dönem 1. Yazılı</h3>
              <p className="text-gray-500 text-sm mt-1">Giriş konuları ve temel kazanımlar</p>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-2 transition-all" />
          </button>

          <button onClick={() => handleTermSelect(1, 2)} className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-l-8 border-indigo-500 flex items-center justify-between group transition-all">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">1. Dönem 2. Yazılı</h3>
              <p className="text-gray-500 text-sm mt-1">Dönem ortası ve ileri kazanımlar</p>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-indigo-500 transform group-hover:translate-x-2 transition-all" />
          </button>
          
          <button onClick={() => handleTermSelect(2, 1)} className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-l-8 border-orange-500 flex items-center justify-between group transition-all opacity-70">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">2. Dönem 1. Yazılı</h3>
              <p className="text-gray-500 text-sm mt-1">Bahar dönemi başlangıç konuları</p>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-orange-500 transform group-hover:translate-x-2 transition-all" />
          </button>

          <button onClick={() => handleTermSelect(2, 2)} className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-l-8 border-green-500 flex items-center justify-between group transition-all opacity-70">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">2. Dönem 2. Yazılı</h3>
              <p className="text-gray-500 text-sm mt-1">Yıl sonu değerlendirme konuları</p>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-green-500 transform group-hover:translate-x-2 transition-all" />
          </button>
        </div>
      )}

      {/* STEP 3: EXAM SELECTION */}
      {step === 3 && (
        <div className="animate-fade-in">
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <div 
                  key={exam.id}
                  onClick={() => onSelectExam(exam.id)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-t-4 border-accent overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                       <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded uppercase">
                         {LESSON_LABELS[exam.lesson]}
                       </span>
                       <span className="text-gray-400 text-xs font-mono">#{exam.id}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors">
                      {exam.title}
                    </h2>
                    <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide border-b pb-2">
                      {exam.theme}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {exam.description}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-center w-full bg-gray-50 rounded-lg py-2 group-hover:bg-accent group-hover:text-white transition-colors font-bold text-sm">
                      Sınava Başla
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                  <Activity className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700">Bu kategoride sınav bulunamadı.</h3>
                <p className="text-gray-500 mt-2">Şu an için bu ders ve dönemde ekli sınav yok.</p>
                <button onClick={() => setStep(2)} className="mt-6 text-accent font-bold hover:underline">
                  Farklı bir dönem seç
                </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;