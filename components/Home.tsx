
import React, { useState, useEffect } from 'react';
import { Exam, User, ExamHistoryItem, ScheduleItem } from '../types';
import ExamHistory from './ExamHistory';
import ExamCalendar from './ExamCalendar';
import ExamWizard from './home/ExamWizard';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import { 
  LayoutDashboard, CalendarRange, Trophy, User as UserIcon, ScrollText, History, PlusCircle
} from 'lucide-react';

interface HomeProps {
  exams: Exam[]; 
  onSelectExam: (id: number) => void;
  user: User | null;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ exams, onSelectExam, user, onLogout }) => {
  // Varsayılan sekme 'exams' olarak güncellendi
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'exams' | 'calendar' | 'profile'>('exams');
  
  // Sınavlar sekmesi içindeki alt görünüm (Yeni Sınav / Geçmiş)
  const [examSubView, setExamSubView] = useState<'new' | 'history'>('new');

  const [userHistory, setUserHistory] = useState<ExamHistoryItem[]>([]);
  const [userSchedule, setUserSchedule] = useState<ScheduleItem[]>([]);
  
  // Profildeki güncellemeleri anlık yansıtmak için
  const [localUser, setLocalUser] = useState<User | null>(user);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  useEffect(() => {
    if (localUser) {
      const historyKey = `history_${localUser.email}`;
      const storedHistory = localStorage.getItem(historyKey);
      if (storedHistory) {
        setUserHistory(JSON.parse(storedHistory));
      }

      const scheduleKey = `schedule_${localUser.email}`;
      const storedSchedule = localStorage.getItem(scheduleKey);
      if (storedSchedule) {
        setUserSchedule(JSON.parse(storedSchedule));
      }
    }
  }, [localUser, activeTab, examSubView]);

  const handleAddSchedule = (item: ScheduleItem) => {
    if (!localUser) return;
    const newSchedule = [...userSchedule, item];
    setUserSchedule(newSchedule);
    localStorage.setItem(`schedule_${localUser.email}`, JSON.stringify(newSchedule));
  };

  const handleDeleteSchedule = (id: string) => {
    if (!localUser) return;
    const newSchedule = userSchedule.filter(i => i.id !== id);
    setUserSchedule(newSchedule);
    localStorage.setItem(`schedule_${localUser.email}`, JSON.stringify(newSchedule));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setLocalUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-10">
      
      {/* --- DESKTOP HEADER (Hidden on Mobile) --- */}
      <div className="hidden md:flex justify-between items-center py-4 px-6 bg-white shadow-sm mb-6 sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="bg-accent text-white p-1.5 rounded-lg"><ScrollText className="w-6 h-6"/></span>
           <h1 className="text-2xl font-extrabold text-primary tracking-tight">Akıllı Sınav</h1>
        </div>

        {/* Desktop Nav Pills */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setActiveTab('leaderboard')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'leaderboard' ? 'bg-white shadow-sm text-accent' : 'text-gray-500 hover:text-gray-700'}`}>Sıralama</button>
            <button onClick={() => setActiveTab('exams')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'exams' ? 'bg-white shadow-sm text-accent' : 'text-gray-500 hover:text-gray-700'}`}>Sınavlar</button>
            <button onClick={() => setActiveTab('calendar')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'calendar' ? 'bg-white shadow-sm text-accent' : 'text-gray-500 hover:text-gray-700'}`}>Takvim</button>
        </div>

        {localUser && (
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('profile')}>
             <div className="text-right">
               <p className="text-sm font-bold text-gray-800">{localUser.name}</p>
               <p className="text-xs text-gray-500">{localUser.grade}. Sınıf</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                {localUser.avatar ? <img src={localUser.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">{localUser.name[0]}</div>}
             </div>
          </div>
        )}
      </div>

      {/* --- MOBILE HEADER (Minimal) --- */}
      <div className="md:hidden flex justify-center items-center py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
         <span className="bg-accent text-white p-1 rounded-lg mr-2"><ScrollText className="w-4 h-4"/></span>
         <h1 className="text-lg font-extrabold text-primary tracking-tight">Akıllı Sınav</h1>
      </div>


      {/* --- CONTENT AREA --- */}
      <div className="px-4 pt-4 md:px-0 max-w-5xl mx-auto animate-fade-in-up">
        
        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && localUser && (
          <div className="max-w-4xl mx-auto">
            <Leaderboard currentUser={localUser} />
          </div>
        )}

        {/* EXAMS TAB */}
        {activeTab === 'exams' && (
          <div className="max-w-5xl mx-auto">
            {/* Mobile-friendly Toggle */}
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex mb-6 mx-auto max-w-xs">
              <button 
                onClick={() => setExamSubView('new')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${examSubView === 'new' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400'}`}
              >
                <PlusCircle className="w-4 h-4" /> Yeni Sınav
              </button>
              <button 
                onClick={() => setExamSubView('history')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${examSubView === 'history' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400'}`}
              >
                <History className="w-4 h-4" /> Geçmişim
              </button>
            </div>

            {examSubView === 'new' ? (
              <ExamWizard exams={exams} user={localUser} onSelectExam={onSelectExam} />
            ) : (
              <ExamHistory history={userHistory} />
            )}
          </div>
        )}

        {/* CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="max-w-4xl mx-auto">
            <ExamCalendar 
              schedule={userSchedule} 
              onAdd={handleAddSchedule} 
              onDelete={handleDeleteSchedule} 
            />
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && localUser && (
          <Profile user={localUser} onUpdateUser={handleUpdateUser} onLogout={onLogout} />
        )}
      </div>


      {/* --- MOBILE BOTTOM NAVIGATION BAR (Fixed) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-2 z-50 flex justify-around items-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         
         <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${activeTab === 'leaderboard' ? 'text-accent' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <Trophy className={`w-6 h-6 ${activeTab === 'leaderboard' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">Sıralama</span>
         </button>

         <button 
            onClick={() => setActiveTab('exams')}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${activeTab === 'exams' ? 'text-accent' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <LayoutDashboard className={`w-6 h-6 ${activeTab === 'exams' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">Sınavlar</span>
         </button>

         <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${activeTab === 'calendar' ? 'text-accent' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <CalendarRange className={`w-6 h-6 ${activeTab === 'calendar' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">Takvim</span>
         </button>

         <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${activeTab === 'profile' ? 'text-accent' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <div className={`relative rounded-full border-2 ${activeTab === 'profile' ? 'border-accent' : 'border-transparent'}`}>
              {localUser?.avatar ? (
                <img src={localUser.avatar} className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <UserIcon className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
              )}
            </div>
            <span className="text-[10px] font-bold">Profil</span>
         </button>

      </div>

    </div>
  );
};

export default Home;
