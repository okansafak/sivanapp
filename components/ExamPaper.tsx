import React from 'react';
import { Exam, StudentAnswers } from '../types';
import { Save, ArrowLeft, ChevronLeft } from 'lucide-react';

interface ExamPaperProps {
  exam: Exam;
  answers: StudentAnswers;
  onAnswerChange: (qId: number, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const ExamPaper: React.FC<ExamPaperProps> = ({ exam, answers, onAnswerChange, onSubmit, onBack, isSubmitting }) => {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto pb-20">
      
      {/* Mobile-First Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm transition-all">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Title - Hidden on very small screens if needed, centered */}
          <div className="flex-1 text-center px-2">
            <div className="text-sm font-bold text-gray-800 truncate">
              {exam.title}
            </div>
            <div className="text-[10px] text-gray-500 truncate hidden sm:block">
              {exam.theme}
            </div>
          </div>

          <button 
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white shadow-sm transition-all text-xs md:text-sm
              ${isSubmitting ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="hidden sm:inline">Sınavı</span> Bitir <Save className="w-3 h-3 md:w-4 md:h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Printable Header - Only visible when printing */}
      <div className="hidden print-only mb-8 border-2 border-black p-4">
         <table className="w-full border-collapse">
            <tbody>
                <tr>
                    <td colSpan={3} className="text-center font-bold text-lg border border-black p-2">
                        {exam.grade}. SINIF {exam.lesson.toUpperCase()} DERSİ {exam.term}. DÖNEM {exam.examNumber}. YAZILI
                    </td>
                </tr>
                <tr>
                    <td className="w-5/12 border border-black p-2">Adı Soyadı: ...........................................</td>
                    <td className="w-4/12 border border-black p-2">Sınıf / No: ....................</td>
                    <td rowSpan={2} className="w-3/12 border border-black p-2 text-center align-middle font-bold text-xl">
                        PUAN<br/><br/>________
                    </td>
                </tr>
            </tbody>
         </table>
      </div>

      {/* Questions Container */}
      <div className="bg-white md:rounded-2xl md:shadow-sm md:border border-gray-200 p-4 md:p-8 mt-4 print:shadow-none print:p-0 print:border-0 min-h-screen md:min-h-auto">
        <div className="text-center mb-6 md:mb-8 hidden md:block">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{exam.title}</h1>
          <p className="text-gray-500">{exam.theme}</p>
        </div>

        <div className="space-y-8">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="page-break border-b pb-8 last:border-0 border-gray-100">
              
              <div className="flex gap-3 mb-3">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 font-bold text-sm rounded-lg border border-gray-200">
                  {index + 1}
                </span>
                <div className="flex-1 pt-1">
                   {q.context && (
                    <div className="bg-gray-50 border-l-4 border-accent p-3 mb-3 text-sm text-gray-700 italic rounded-r-lg">
                      {q.context}
                    </div>
                  )}
                  <div className="font-semibold text-gray-900 text-base md:text-lg leading-relaxed">
                      {q.questionText}
                  </div>
                </div>
              </div>

              <div className="pl-0 md:pl-11 mt-2">
                {q.type === 'textarea' ? (
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder || "Cevabınızı buraya yazınız..."}
                    className={`w-full h-32 md:h-40 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none text-base shadow-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                    disabled={isSubmitting}
                  />
                ) : (
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder || "Cevabınız..."}
                    className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-base shadow-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                    disabled={isSubmitting}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamPaper;