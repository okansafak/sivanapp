import React from 'react';
import { Exam, StudentAnswers } from '../types';
import { Save, ArrowLeft } from 'lucide-react';

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
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header / Toolbar - Responsive adjustments */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b shadow-sm py-3 md:py-4 mb-4 md:mb-6 no-print transition-all">
        <div className="flex justify-between items-center container mx-auto px-4">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-primary transition-colors font-medium bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm md:text-base md:bg-transparent md:px-0"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Ana Menü</span>
          </button>
          
          <div className="flex flex-col items-center">
            <div className="text-sm md:text-xl font-bold text-primary truncate max-w-[150px] md:max-w-none">
              {exam.title}
            </div>
            <div className="text-xs text-gray-400 md:hidden">{exam.theme}</div>
          </div>

          <button 
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`flex items-center px-3 md:px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all text-sm md:text-base
              ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95'}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin md:mr-2"></div>
                <span className="hidden md:inline">Değerlendiriliyor...</span>
                <span className="md:hidden">...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span>Bitir</span>
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
                        2025-2026 EĞİTİM YILI 5. SINIF TÜRKÇE 1. DÖNEM 2. ORTAK YAZILI
                    </td>
                </tr>
                <tr>
                    <td className="w-5/12 border border-black p-2">Adı Soyadı: ...........................................</td>
                    <td className="w-4/12 border border-black p-2">Sınıf / No: ....................</td>
                    <td rowSpan={2} className="w-3/12 border border-black p-2 text-center align-middle font-bold text-xl">
                        PUAN<br/><br/>________
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2">Okul: ....................................................</td>
                    <td className="border border-black p-2">Tarih: ...../...../2025</td>
                </tr>
            </tbody>
         </table>
      </div>

      {/* Questions Container */}
      <div className="bg-white md:rounded-xl shadow-lg p-4 md:p-8 min-h-[600px] md:min-h-[800px] print:shadow-none print:p-0">
        <h1 className="text-xl md:text-3xl font-bold text-center text-primary mb-1 print:hidden">{exam.title}</h1>
        <p className="text-center text-gray-500 text-sm md:text-base mb-6 md:mb-8 print:hidden">{exam.theme}</p>

        <div className="space-y-6 md:space-y-8">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="page-break border-b pb-6 md:pb-8 last:border-0 border-gray-100">
              <div className="flex items-baseline mb-2 md:mb-3">
                <span className="bg-accent text-white text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1 rounded-full mr-2 md:mr-3 print:border print:border-black print:text-black print:bg-transparent">
                  SORU {index + 1}
                </span>
                <span className="text-xs text-gray-400 font-mono">{q.code}</span>
              </div>
              
              <div className="mb-3 md:mb-4">
                {q.context && (
                  <div className="bg-gray-50 border-l-4 border-accent p-3 md:p-4 mb-3 md:mb-4 italic text-sm md:text-base text-gray-700 whitespace-pre-line print:bg-transparent print:border-l-2 print:border-black">
                    {q.context}
                  </div>
                )}
                <div className="font-semibold text-base md:text-lg text-gray-800 mb-2">
                    {q.questionText}
                </div>
              </div>

              <div className="mt-2">
                {q.type === 'textarea' ? (
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full h-40 md:h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none text-sm md:text-base print:border-black print:h-40"
                    disabled={isSubmitting}
                  />
                ) : (
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full p-3 border-b-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-accent transition-all outline-none text-sm md:text-base print:bg-transparent print:border-black print:border-b"
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