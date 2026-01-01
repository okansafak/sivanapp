import React from 'react';
import { AIExamResult, Exam, StudentAnswers } from '../types';
import { CheckCircle, XCircle, Home, Printer, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultViewProps {
  result: AIExamResult;
  exam: Exam;
  answers: StudentAnswers;
  onHome: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, exam, answers, onHome }) => {
  
  // Prepare data for chart
  const chartData = result.corrections.map((c, index) => ({
    name: `S${index + 1}`,
    score: c.score,
    fullMark: 100 
  }));

  return (
    <div className="max-w-3xl mx-auto pb-20 px-4 md:px-0 animate-fade-in">
      
      {/* Mobile-friendly Action Header */}
      <div className="flex gap-2 mb-4 mt-4 no-print sticky top-0 bg-background/90 backdrop-blur z-20 py-2">
        <button onClick={onHome} className="flex-1 flex justify-center items-center text-primary font-bold py-3 bg-white border border-gray-200 shadow-sm rounded-xl active:scale-95 transition-transform text-sm">
          <Home className="w-4 h-4 mr-2" /> Ana Menü
        </button>
        <button onClick={() => window.print()} className="flex-none flex justify-center items-center bg-gray-800 text-white p-3 rounded-xl shadow-sm active:scale-95 transition-transform">
          <Printer className="w-5 h-5" />
        </button>
      </div>

      {/* Main Report Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 print:shadow-none print:border-2 print:border-black">
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 text-center print:bg-white print:text-black print:border-b">
          <div className="inline-flex p-2 bg-white/10 rounded-full mb-3">
             <Award className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-xl font-bold mb-1">Sınav Sonucu</h2>
          <p className="opacity-80 text-sm">{exam.title}</p>
        </div>
        
        <div className="p-4 md:p-8">
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Score */}
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-[6px] border-gray-50 shadow-lg">
               <div className="text-center">
                 <span className={`text-5xl font-extrabold tracking-tighter ${result.totalScore >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                   {result.totalScore}
                 </span>
                 <span className="block text-gray-400 text-xs font-bold uppercase mt-1">Puan</span>
               </div>
               <svg className="absolute w-full h-full -rotate-90 top-0 left-0 pointer-events-none" viewBox="0 0 100 100" style={{ transform: 'scale(1.1)' }}>
                 <circle 
                   className={`${result.totalScore >= 50 ? 'text-green-500' : 'text-red-500'} stroke-current`} 
                   strokeWidth="6"
                   fill="transparent"
                   r="45"
                   cx="50" 
                   cy="50"
                   strokeDasharray={`${(result.totalScore / 100) * 283} 283`}
                   strokeLinecap="round"
                 />
               </svg>
            </div>

            {/* General Feedback */}
            <div className="w-full bg-blue-50/80 p-5 rounded-xl border border-blue-100 print:bg-white print:border">
              <h3 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">Öğretmen Değerlendirmesi</h3>
              <p className="text-gray-700 italic text-sm leading-relaxed">"{result.generalFeedback}"</p>
            </div>
          </div>

          {/* Chart - Hidden on very small screens or print */}
          <div className="h-48 w-full mb-8 no-print hidden sm:block">
            <h4 className="text-center font-bold text-gray-400 mb-4 text-xs uppercase tracking-wider">Soru Bazlı Başarı</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" radius={[4, 4, 4, 4]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 50 ? '#22c55e' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Soru Analizi</h3>
            {result.corrections.map((corr, idx) => {
              const question = exam.questions.find(q => q.id === corr.questionId);
              const studentAnswer = answers[corr.questionId] || "-";
              
              return (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Card Header */}
                  <div className={`px-4 py-3 flex justify-between items-center border-b ${corr.isCorrect ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
                    <div className="flex items-center gap-2">
                       {corr.isCorrect ? 
                         <CheckCircle className="text-green-600 w-5 h-5" /> : 
                         <XCircle className="text-red-500 w-5 h-5" />
                       }
                       <span className="font-bold text-gray-700 text-sm">Soru {idx + 1}</span>
                    </div>
                    <span className={`font-bold px-2.5 py-0.5 rounded-md text-xs ${corr.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {corr.score} Puan
                    </span>
                  </div>
                  
                  <div className="p-4">
                    {question && <p className="text-sm font-semibold text-gray-800 mb-3">{question.questionText}</p>}
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Cevabın</span>
                        <p className="text-sm text-gray-700 break-words font-medium">{studentAnswer}</p>
                      </div>

                      <div className="pl-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Açıklama</span>
                        <p className="text-sm text-gray-600 leading-relaxed">{corr.feedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultView;