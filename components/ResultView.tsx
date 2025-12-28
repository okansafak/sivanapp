import React from 'react';
import { AIExamResult, Exam } from '../types';
import { CheckCircle, XCircle, Home, Printer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultViewProps {
  result: AIExamResult;
  exam: Exam;
  onHome: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, exam, onHome }) => {
  
  // Prepare data for chart
  const chartData = result.corrections.map((c, index) => ({
    name: `S${index + 1}`,
    score: c.score,
    fullMark: 100 
  }));

  return (
    <div className="max-w-4xl mx-auto pb-10 px-4 md:px-0">
      {/* Actions Header */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mb-6 no-print mt-4 md:mt-0">
        <button onClick={onHome} className="w-full sm:w-auto flex justify-center items-center text-primary hover:text-accent font-bold py-2 bg-gray-100 sm:bg-transparent rounded-lg">
          <Home className="w-5 h-5 mr-2" /> Ana Sayfa
        </button>
        <button onClick={() => window.print()} className="w-full sm:w-auto flex justify-center items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 shadow-md">
          <Printer className="w-5 h-5 mr-2" /> Raporu Yazdır
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-gray-200 print:shadow-none print:border-2 print:border-black">
        <div className="bg-primary text-white p-4 md:p-6 text-center print:bg-white print:text-black print:border-b-2 print:border-black">
          <h2 className="text-xl md:text-2xl font-bold mb-1">Sınav Sonuç Raporu</h2>
          <p className="opacity-90 text-sm md:text-base">{exam.title}: {exam.theme}</p>
        </div>
        
        <div className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-8">
            {/* Score Circle */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full border-8 border-gray-100 shadow-inner flex-shrink-0">
               <div className="text-center">
                 <span className={`text-4xl md:text-5xl font-extrabold ${result.totalScore >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                   {result.totalScore}
                 </span>
                 <span className="block text-gray-400 text-xs md:text-sm font-bold">/ 100</span>
               </div>
               <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                 <circle 
                   className={`${result.totalScore >= 50 ? 'text-green-500' : 'text-red-500'} stroke-current`} 
                   strokeWidth="8"
                   fill="transparent"
                   r="46"
                   cx="50" 
                   cy="50"
                   strokeDasharray={`${(result.totalScore / 100) * 289} 289`}
                   strokeLinecap="round"
                 />
               </svg>
            </div>

            {/* General Feedback */}
            <div className="w-full bg-blue-50 p-4 md:p-6 rounded-lg border-l-4 border-blue-500 print:bg-white print:border">
              <h3 className="text-base md:text-lg font-bold text-blue-800 mb-2">Öğretmen Görüşü:</h3>
              <p className="text-gray-700 italic leading-relaxed text-sm md:text-base">{result.generalFeedback}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-48 md:h-64 w-full mb-8 no-print">
            <h4 className="text-center font-bold text-gray-500 mb-4 text-sm md:text-base">Soru Bazlı Başarı Analizi</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis domain={[0, 100]} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 50 ? '#22c55e' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold border-b pb-2">Detaylı Değerlendirme</h3>
            {result.corrections.map((corr, idx) => {
              const question = exam.questions.find(q => q.id === corr.questionId);
              return (
                <div key={idx} className={`p-3 md:p-4 rounded-lg border ${corr.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} print:bg-white print:border-gray-300`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                       {corr.isCorrect ? 
                         <CheckCircle className="text-green-600 w-5 h-5 md:w-6 md:h-6 mr-2" /> : 
                         <XCircle className="text-red-500 w-5 h-5 md:w-6 md:h-6 mr-2" />
                       }
                       <span className="font-bold text-gray-800 text-sm md:text-base">Soru {idx + 1}</span>
                    </div>
                    <span className={`font-bold px-2 py-1 md:px-3 rounded-full text-xs md:text-sm ${corr.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {corr.score} Puan
                    </span>
                  </div>
                  
                  {question && <p className="text-xs md:text-sm text-gray-500 mb-2 font-medium">{question.title}</p>}
                  
                  <div className="mt-2">
                    <span className="font-bold text-xs md:text-sm text-gray-700 block mb-1">Düzeltme & Yorum:</span>
                    <p className="text-gray-800 text-sm md:text-base">{corr.feedback}</p>
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