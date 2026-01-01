import React, { useState, useMemo } from 'react';
import { ExamHistoryItem, LESSON_LABELS, LessonType } from '../types';
import { Trophy, Calendar, FileText, Frown, TrendingUp, Filter, BarChart3, ArrowUpRight, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ExamHistoryProps {
  history: ExamHistoryItem[];
}

const ExamHistory: React.FC<ExamHistoryProps> = ({ history }) => {
  const [selectedLesson, setSelectedLesson] = useState<LessonType | 'all'>('all');

  // Filter History
  const filteredHistory = useMemo(() => {
    let data = selectedLesson === 'all' 
      ? history 
      : history.filter(h => h.lesson === selectedLesson);
    
    // Sort by Date Descending (For List)
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [history, selectedLesson]);

  // Calculate Stats
  const stats = useMemo(() => {
    if (filteredHistory.length === 0) return { total: 0, average: 0, highest: 0 };
    
    const total = filteredHistory.length;
    const sum = filteredHistory.reduce((acc, curr) => acc + curr.score, 0);
    const average = Math.round(sum / total);
    const highest = Math.max(...filteredHistory.map(h => h.score));

    return { total, average, highest };
  }, [filteredHistory]);

  // Chart Data (Sort by Date Ascending)
  const chartData = useMemo(() => {
    return [...filteredHistory]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(h => ({
        date: new Date(h.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
        score: h.score,
        name: h.examTitle
      }));
  }, [filteredHistory]);

  if (history.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 animate-fade-in">
        <div className="bg-gray-50 p-6 rounded-full inline-block mb-4 shadow-sm">
          <Frown className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Henüz Sınav Geçmişi Yok</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
          Çözdüğün denemelerin sonuçları ve gelişim grafiğin burada listelenecek.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header & Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="text-blue-500 bg-blue-50 p-2 rounded-lg mb-1 md:mb-2"><FileText className="w-4 h-4 md:w-5 md:h-5"/></div>
           <span className="text-2xl md:text-3xl font-extrabold text-blue-900">{stats.total}</span>
           <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase">Sınav</span>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-xl border border-purple-100 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="text-purple-500 bg-purple-50 p-2 rounded-lg mb-1 md:mb-2"><TrendingUp className="w-4 h-4 md:w-5 md:h-5"/></div>
           <span className="text-2xl md:text-3xl font-extrabold text-purple-900">{stats.average}</span>
           <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase">Ortalama</span>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-xl border border-green-100 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="text-green-500 bg-green-50 p-2 rounded-lg mb-1 md:mb-2"><Trophy className="w-4 h-4 md:w-5 md:h-5"/></div>
           <span className="text-2xl md:text-3xl font-extrabold text-green-900">{stats.highest}</span>
           <span className="text-[10px] md:text-xs font-bold text-green-400 uppercase">En Yüksek</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm md:text-base">
             <BarChart3 className="w-5 h-5 text-accent" />
             Gelişim Grafiği
           </h3>
           
           {/* Lesson Filter */}
           <div className="flex gap-2 max-w-[200px] overflow-x-auto no-scrollbar">
             <select 
               value={selectedLesson} 
               onChange={(e) => setSelectedLesson(e.target.value as any)}
               className="text-xs font-bold border border-gray-200 rounded-lg p-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent"
             >
                <option value="all">Tüm Dersler</option>
                {Object.entries(LESSON_LABELS).map(([k,v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
             </select>
           </div>
        </div>

        <div className="h-52 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10, fill: '#9ca3af'}} 
                  axisLine={false} 
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[0, 100]} 
                  hide={true}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  labelStyle={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* History List */}
      <div>
        <h3 className="font-bold text-gray-700 mb-3 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4" /> Son Çözülenler
        </h3>
        
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div key={item.id} className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
               <div className="flex items-center gap-4">
                  {/* Score Badge */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg border-2 ${
                    item.score >= 85 ? 'bg-green-50 text-green-600 border-green-100' :
                    item.score >= 70 ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    item.score >= 50 ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                    'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {item.score}
                  </div>
                  
                  {/* Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                       <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">
                         {LESSON_LABELS[item.lesson]}
                       </span>
                       <span className="text-[10px] text-gray-400">
                         {new Date(item.date).toLocaleDateString('tr-TR')}
                       </span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm md:text-base leading-tight">
                      {item.examTitle}
                    </h4>
                  </div>
               </div>
               
               {/* Arrow Icon */}
               <div className="text-gray-300 group-hover:text-accent transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
               </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
             <div className="text-center py-8 text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed">
               Bu dersten henüz sınav kaydı yok.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamHistory;