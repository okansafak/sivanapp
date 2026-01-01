import React, { useState, useEffect } from 'react';
import { User, ExamHistoryItem, LessonType, LESSON_LABELS } from '../types';
import { Trophy, Crown, Info, BookOpen, Layers } from 'lucide-react';

interface LeaderboardProps {
  currentUser: User;
}

interface LeaderboardEntry {
  name: string;
  email: string;
  grade: number;
  totalScore: number;
  examCount: number;
  rank: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
  const [selectedSubject, setSelectedSubject] = useState<LessonType | 'all'>('all');
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    const allUsersStr = localStorage.getItem('user_index');
    if (!allUsersStr) return;
    
    const allUsers: User[] = JSON.parse(allUsersStr);
    const classMates = allUsers.filter(u => u.grade === currentUser.grade);

    const calculatedLeaders: LeaderboardEntry[] = classMates.map(u => {
      const historyStr = localStorage.getItem(`history_${u.email}`);
      const history: ExamHistoryItem[] = historyStr ? JSON.parse(historyStr) : [];
      
      const filteredHistory = selectedSubject === 'all' 
        ? history 
        : history.filter(h => h.lesson === selectedSubject);

      const latestExamMap = new Map<number, { score: number, date: number }>();

      filteredHistory.forEach(h => {
        const hDate = new Date(h.date).getTime();
        const existing = latestExamMap.get(h.examId);
        if (!existing || hDate > existing.date) {
           latestExamMap.set(h.examId, { score: h.score, date: hDate });
        }
      });

      const totalScore = Array.from(latestExamMap.values()).reduce((acc, curr) => acc + curr.score, 0);
      const uniqueExamCount = latestExamMap.size;
      
      return {
        name: u.name,
        email: u.email,
        grade: u.grade,
        totalScore: totalScore,
        examCount: uniqueExamCount,
        rank: 0 
      };
    });

    calculatedLeaders.sort((a, b) => b.totalScore - a.totalScore);
    const rankedLeaders = calculatedLeaders.map((l, idx) => ({ ...l, rank: idx + 1 }));

    setLeaders(rankedLeaders);
    const myEntry = rankedLeaders.find(l => l.email === currentUser.email);
    setUserRank(myEntry || null);

  }, [selectedSubject, currentUser]);

  const topThree = leaders.slice(0, 3);
  const showUserSeparate = userRank && userRank.rank > 3;

  return (
    <div className="space-y-4 animate-fade-in pb-4">
      
      {/* Subject Filter - Touch Friendly */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-accent" />
          <h2 className="text-sm font-bold text-gray-800">
             {selectedSubject === 'all' ? 'Genel' : LESSON_LABELS[selectedSubject]} Sıralaması
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2 scroll-smooth">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border
                ${selectedSubject === 'all' 
                  ? 'bg-accent text-white border-accent shadow-sm' 
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
            >
              <Layers className="w-4 h-4" /> Genel
            </button>
            
            {Object.entries(LESSON_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedSubject(key as LessonType)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border
                  ${selectedSubject === key 
                    ? 'bg-accent text-white border-accent shadow-sm' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
              >
                <BookOpen className="w-4 h-4" /> {label}
              </button>
            ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 text-blue-800 p-3 rounded-xl text-xs flex items-start gap-2 border border-blue-100">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
        <p>Sıralama sadece <strong>{currentUser.grade}. sınıf</strong> içindir. Aynı sınavın en yüksek puanı değil, en son çözülen puanı geçerlidir.</p>
      </div>

      {/* PODIUM SECTION - Mobile Optimized */}
      {leaders.length > 0 && leaders[0].totalScore > 0 ? (
        <div className="relative pt-6 pb-2">
            <div className="flex justify-center items-end gap-1 sm:gap-4 text-center">
                {/* 2nd Place */}
                {topThree[1] && (
                    <div className="flex flex-col items-center animate-scale-in w-[28%] sm:w-auto" style={{animationDelay: '0.1s'}}>
                        <div className="mb-1 relative">
                            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm sm:text-xl shadow-md">
                                {topThree[1].name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-gray-400 text-white text-[10px] font-bold px-1.5 rounded-full border border-white">#2</div>
                        </div>
                        <div className="w-full sm:w-28 h-20 sm:h-32 bg-gradient-to-t from-gray-200 to-gray-50 rounded-t-lg border-x border-t border-gray-300 flex flex-col justify-end p-1 shadow-sm">
                            <span className="text-[10px] sm:text-xs font-bold text-gray-700 truncate w-full">{topThree[1].name.split(' ')[0]}</span>
                            <span className="text-[10px] text-gray-500 font-mono font-bold">{topThree[1].totalScore}</span>
                        </div>
                    </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                    <div className="flex flex-col items-center z-10 animate-scale-in w-[34%] sm:w-auto">
                         <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mb-1 animate-bounce" />
                         <div className="mb-1 relative">
                            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-400 bg-yellow-50 flex items-center justify-center text-yellow-600 font-bold text-lg sm:text-3xl shadow-lg">
                                {topThree[0].name.charAt(0)}
                            </div>
                             <div className="absolute -bottom-2 -right-1 bg-yellow-500 text-white text-xs font-bold px-2 rounded-full border border-white">#1</div>
                        </div>
                        <div className="w-full sm:w-32 h-28 sm:h-44 bg-gradient-to-t from-yellow-100 to-yellow-50 rounded-t-lg border-x border-t border-yellow-300 flex flex-col justify-end p-2 shadow-lg relative overflow-hidden">
                             <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
                             <span className="text-xs sm:text-sm font-bold text-yellow-800 truncate w-full relative z-10">{topThree[0].name.split(' ')[0]}</span>
                             <span className="text-xs text-yellow-700 font-mono font-bold relative z-10">{topThree[0].totalScore} P</span>
                        </div>
                    </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                    <div className="flex flex-col items-center animate-scale-in w-[28%] sm:w-auto" style={{animationDelay: '0.2s'}}>
                        <div className="mb-1 relative">
                             <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border-2 border-orange-300 bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-sm sm:text-xl shadow-md">
                                {topThree[2].name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-orange-400 text-white text-[10px] font-bold px-1.5 rounded-full border border-white">#3</div>
                        </div>
                        <div className="w-full sm:w-28 h-16 sm:h-24 bg-gradient-to-t from-orange-100 to-orange-50 rounded-t-lg border-x border-t border-orange-300 flex flex-col justify-end p-1 shadow-sm">
                             <span className="text-[10px] sm:text-xs font-bold text-gray-700 truncate w-full">{topThree[2].name.split(' ')[0]}</span>
                             <span className="text-[10px] text-gray-500 font-mono font-bold">{topThree[2].totalScore}</span>
                        </div>
                    </div>
                )}
            </div>
            
            {/* List for Rest */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-4 overflow-hidden">
                {leaders.slice(3, 20).map((leader) => (
                    <div key={leader.email} className={`flex items-center justify-between p-3 border-b last:border-0 active:bg-gray-50 ${leader.email === currentUser.email ? 'bg-blue-50' : ''}`}>
                         <div className="flex items-center gap-3 overflow-hidden">
                             <span className="w-5 text-center text-xs font-bold text-gray-400">#{leader.rank}</span>
                             <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold">
                                 {leader.name.charAt(0)}
                             </div>
                             <div className="min-w-0">
                                 <p className={`text-sm font-bold truncate ${leader.email === currentUser.email ? 'text-blue-700' : 'text-gray-700'}`}>
                                     {leader.name} {leader.email === currentUser.email && '(Sen)'}
                                 </p>
                                 <p className="text-[10px] text-gray-400 truncate">
                                   {leader.examCount} Sınav
                                 </p>
                             </div>
                         </div>
                         <div className="text-sm font-mono font-bold text-gray-600 pl-2">
                             {leader.totalScore}
                         </div>
                    </div>
                ))}
            </div>
        </div>
      ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 mt-4">
             <Trophy className="w-12 h-12 text-gray-200 mx-auto mb-2" />
             <p className="text-gray-500 font-medium">Bu kategoride henüz puan yok.</p>
          </div>
      )}

      {/* USER'S STICKY RANK (If not in top 3) */}
      {showUserSeparate && (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-auto md:w-[896px] mx-auto z-40 animate-fade-in-up">
            <div className="bg-slate-800 text-white p-3 rounded-xl shadow-2xl flex items-center justify-between border border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="bg-white/10 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base text-yellow-400">
                        #{userRank.rank}
                    </div>
                    <div>
                        <p className="font-bold text-sm">Senin Sıralaman</p>
                        <p className="text-[10px] text-slate-400">
                           {userRank.totalScore} Puan
                        </p>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Leaderboard;