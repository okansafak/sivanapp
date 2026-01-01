
import React, { useState, useEffect } from 'react';
import { Exam, LessonType, LESSON_LABELS, User } from '../../types';
import { 
  BookOpen, Calculator, Globe, Heart, Activity, ArrowRight, ChevronLeft, 
  GraduationCap, School, Atom, FlaskConical, Dna, Hourglass, Map, Feather, Brain, Youtube, PlayCircle, Lock
} from 'lucide-react';

interface ExamWizardProps {
  exams: Exam[];
  user: User | null;
  onSelectExam: (id: number) => void;
}

const LESSON_ICONS: Record<LessonType, React.ElementType> = {
  turkish: BookOpen,
  math: Calculator,
  science: Activity,
  social: Globe,
  english: Globe,
  religious: Heart,
  arabic: GraduationCap,
  literature: Feather,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
  history: Hourglass,
  geography: Map,
  philosophy: Brain
};

const MIDDLE_SCHOOL_GRADES = [5, 6, 7, 8];
const HIGH_SCHOOL_GRADES = [9, 10, 11, 12];

const ExamWizard: React.FC<ExamWizardProps> = ({ exams, user, onSelectExam }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
  const [selectedTermConfig, setSelectedTermConfig] = useState<{term: 1|2, examNum: 1|2} | null>(null);

  useEffect(() => {
    if (user && user.grade) {
      setSelectedGrade(user.grade);
      setStep(2);
    }
  }, [user]);

  const handleGradeSelect = (grade: number) => { setSelectedGrade(grade); setStep(2); };
  const handleLessonSelect = (lesson: LessonType) => { setSelectedLesson(lesson); setStep(3); };
  const handleTermSelect = (term: 1 | 2, examNum: 1 | 2) => { setSelectedTermConfig({ term, examNum }); setStep(4); };

  const getAvailableLessons = (grade: number): LessonType[] => {
    if (grade <= 8) {
      return ['turkish', 'math', 'science', 'social', 'english', 'religious', 'arabic'];
    } else {
      return ['literature', 'math', 'physics', 'chemistry', 'biology', 'history', 'geography', 'english', 'religious', 'philosophy', 'arabic'];
    }
  };

  // Helper to check if a specific exam term exists in the database
  const isExamAvailable = (term: 1 | 2, examNum: 1 | 2) => {
    if (!selectedGrade || !selectedLesson) return false;
    return exams.some(e => 
      e.grade === selectedGrade &&
      e.lesson === selectedLesson &&
      e.term === term &&
      e.examNumber === examNum &&
      e.isActive !== false
    );
  };

  const handleYoutubeRedirect = () => {
    if (!selectedGrade || !selectedLesson || !selectedTermConfig) return;
    const lessonName = LESSON_LABELS[selectedLesson];
    const query = `${selectedGrade}. Sınıf ${lessonName} ${selectedTermConfig.term}. Dönem ${selectedTermConfig.examNum}. Yazılı Hazırlık Konu Anlatımı`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  const filteredExams = exams.filter(e => 
    e.grade === selectedGrade &&
    e.lesson === selectedLesson && 
    e.term === selectedTermConfig?.term && 
    e.examNumber === selectedTermConfig?.examNum &&
    e.isActive !== false
  );

  // Configuration for term buttons to avoid repetition
  const termConfigs = [
    { term: 1, examNum: 1, label: '1. Dönem 1. Yazılı', sub: 'Giriş konuları', bgClass: 'bg-blue-100', textClass: 'text-blue-600', hoverBorder: 'hover:border-blue-500', hoverBg: 'hover:bg-blue-50', arrowClass: 'group-hover:text-blue-500' },
    { term: 1, examNum: 2, label: '1. Dönem 2. Yazılı', sub: 'Dönem ortası', bgClass: 'bg-indigo-100', textClass: 'text-indigo-600', hoverBorder: 'hover:border-indigo-500', hoverBg: 'hover:bg-indigo-50', arrowClass: 'group-hover:text-indigo-500' },
    { term: 2, examNum: 1, label: '2. Dönem 1. Yazılı', sub: 'Bahar dönemi', bgClass: 'bg-orange-100', textClass: 'text-orange-600', hoverBorder: 'hover:border-orange-500', hoverBg: 'hover:bg-orange-50', arrowClass: 'group-hover:text-orange-500' },
    { term: 2, examNum: 2, label: '2. Dönem 2. Yazılı', sub: 'Yıl sonu', bgClass: 'bg-green-100', textClass: 'text-green-600', hoverBorder: 'hover:border-green-500', hoverBg: 'hover:bg-green-50', arrowClass: 'group-hover:text-green-500' },
  ] as const;

  return (
    <>
      <div className="text-center mb-6 animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {step === 1 && "Kaçıncı Sınıfsın?"}
          {step === 2 && "Hangi Derse Çalışacağız?"}
          {step === 3 && "Hangi Sınav?"}
          {step === 4 && "Hazırlık Zamanı!"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {step === 1 && "Sana uygun içerikleri getirelim."}
          {step === 2 && `${selectedGrade}. Sınıf içerikleri listeleniyor.`}
          {step === 3 && LESSON_LABELS[selectedLesson || 'turkish']}
          {step === 4 && "İster konu çalış, ister deneme çöz."}
        </p>
      </div>

      {step > 1 && (
        <button 
          onClick={() => {
            if (user && step === 2) return; 
            setStep(step - 1 as any);
          }}
          className={`flex items-center text-gray-500 font-bold text-sm mb-4 transition-colors ${user && step === 2 ? 'invisible' : 'hover:text-accent'} bg-gray-100 px-3 py-1.5 rounded-lg w-fit`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Geri
        </button>
      )}

      {step === 1 && (
        <div className="animate-fade-in space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-orange-100 text-orange-600 p-1 rounded">
                 <School className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-gray-700">Ortaokul</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {MIDDLE_SCHOOL_GRADES.map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleGradeSelect(grade)}
                  className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all active:scale-95"
                >
                  <span className="text-3xl font-extrabold text-gray-800 group-hover:text-orange-600">{grade}</span>
                  <span className="block text-xs font-bold text-gray-400 group-hover:text-orange-400">.SINIF</span>
                </button>
              ))}
            </div>
          </div>
          <div>
             <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-600 p-1 rounded">
                 <GraduationCap className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-gray-700">Lise</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {HIGH_SCHOOL_GRADES.map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleGradeSelect(grade)}
                  className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95"
                >
                  <span className="text-3xl font-extrabold text-gray-800 group-hover:text-indigo-600">{grade}</span>
                  <span className="block text-xs font-bold text-gray-400 group-hover:text-indigo-400">.SINIF</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && selectedGrade && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 animate-fade-in">
          {getAvailableLessons(selectedGrade).map((lesson) => {
            const Icon = LESSON_ICONS[lesson];
            const hasExams = exams.some(e => e.grade === selectedGrade && e.lesson === lesson && e.isActive !== false);

            return (
              <button
                key={lesson}
                onClick={() => handleLessonSelect(lesson)}
                className={`group flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm border transition-all active:scale-95
                  ${hasExams 
                    ? 'border-gray-100 hover:border-accent hover:shadow-md cursor-pointer' 
                    : 'border-gray-50 opacity-60 bg-gray-50'
                  }`}
              >
                <div className={`p-3 rounded-full transition-colors mb-2 ${hasExams ? 'bg-blue-50 text-accent group-hover:bg-accent group-hover:text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className={`text-sm md:text-base font-bold text-center ${hasExams ? 'text-gray-800' : 'text-gray-400'}`}>{LESSON_LABELS[lesson]}</span>
              </button>
            );
          })}
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 gap-3 animate-fade-in max-w-lg mx-auto">
          {termConfigs.map((config, index) => {
            const isAvailable = isExamAvailable(config.term as 1|2, config.examNum as 1|2);
            
            return (
              <button 
                key={index}
                disabled={!isAvailable}
                onClick={() => handleTermSelect(config.term as 1|2, config.examNum as 1|2)} 
                className={`bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between group transition-all relative
                  ${isAvailable 
                    ? `border-gray-100 ${config.hoverBorder} ${config.hoverBg} active:scale-95 cursor-pointer` 
                    : 'border-gray-100 opacity-60 bg-gray-50 cursor-not-allowed grayscale'
                  }
                `}
              >
                <div className="text-left flex items-center gap-3">
                  <div className={`${config.bgClass} ${config.textClass} font-bold px-2 py-1 rounded text-xs`}>
                    {config.term}.{config.examNum}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm md:text-base ${isAvailable ? 'text-gray-800' : 'text-gray-400'}`}>
                      {config.label}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">{config.sub}</p>
                  </div>
                </div>

                {isAvailable ? (
                  <ArrowRight className={`w-5 h-5 text-gray-300 ${config.arrowClass}`} />
                ) : (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    <Lock className="w-3 h-3" />
                    Henüz Eklenmedi
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in space-y-6">
          
          {/* Youtube Card - Mobile Optimized */}
          <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-xl p-5 text-white shadow-lg flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Konu Eksiğin mi Var?</h3>
                  <p className="text-red-100 text-xs opacity-90 mt-0.5">
                    Bu sınav için hazırladığımız konu anlatım videolarını izle.
                  </p>
                </div>
            </div>
            <button 
              onClick={handleYoutubeRedirect}
              className="w-full bg-white text-red-600 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Youtube'da İzle
            </button>
          </div>

          <div className="flex items-center gap-2 mt-6 mb-3">
            <Activity className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-bold text-gray-800">Deneme Sınavları</h3>
          </div>

          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExams.map((exam) => (
                <div 
                  key={exam.id}
                  onClick={() => onSelectExam(exam.id)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden active:scale-[0.98] cursor-pointer"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {LESSON_LABELS[exam.lesson]}
                      </span>
                      <span className="text-gray-300 text-[10px]">#{exam.id}</span>
                    </div>
                    
                    <h2 className="text-base font-bold text-gray-800 mb-1 leading-tight group-hover:text-accent">
                      {exam.title}
                    </h2>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 truncate">
                      {exam.theme}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 border-t pt-2 mt-2">
                      <span>{exam.questions.length} Soru</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>~40 Dk</span>
                    </div>

                    <div className="mt-3 w-full bg-accent text-white py-2 rounded-lg text-sm font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                      Başla
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
              <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Bu kategori için henüz sınav eklenmedi.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ExamWizard;
