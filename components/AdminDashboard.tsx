import React, { useState, useEffect } from 'react';
import { User, Exam, LogEntry, ExamHistoryItem } from '../types';
import { getLogs, clearLogs } from '../services/logger';
import { 
  Users, FileText, LogOut, Shield, Activity, TrendingUp, Clock, AlertCircle, BookOpen
} from 'lucide-react';
import AdminUserList from './admin/AdminUserList';
import AdminExamList from './admin/AdminExamList';
import AdminLogs from './admin/AdminLogs';
import AdminExamCreator from './admin/AdminExamCreator';

interface AdminDashboardProps {
  user: User;
  exams: Exam[];
  onUpdateExams: (exams: Exam[]) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, exams, onUpdateExams, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'exams' | 'logs'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Stats State
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    recentUsers: 0,
    totalQuestions: 0
  });
  
  // Exam Management States
  const [isCreatingExam, setIsCreatingExam] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  // Load Users, Logs and Calculate Stats
  useEffect(() => {
    // 1. Load Users
    const userListStr = localStorage.getItem('user_index');
    let loadedUsers: User[] = [];
    if (userListStr) {
      loadedUsers = JSON.parse(userListStr);
      setUsers(loadedUsers);
    }

    // 2. Load Logs
    setLogs(getLogs());

    // 3. Calculate Extended Stats
    let totalScore = 0;
    let attempts = 0;
    
    // Calculate User Performance & Activity
    loadedUsers.forEach(u => {
      const historyStr = localStorage.getItem(`history_${u.email}`);
      if (historyStr) {
        const history: ExamHistoryItem[] = JSON.parse(historyStr);
        attempts += history.length;
        totalScore += history.reduce((sum, h) => sum + h.score, 0);
      }
    });

    // Calculate Recent Users (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUserCount = loadedUsers.filter(u => 
      u.registeredAt && new Date(u.registeredAt) > thirtyDaysAgo
    ).length;

    // Calculate Total Questions in System
    const questionCount = exams.reduce((acc, curr) => acc + (curr.questions?.length || 0), 0);

    setStats({
      totalAttempts: attempts,
      averageScore: attempts > 0 ? Math.round(totalScore / attempts) : 0,
      recentUsers: recentUserCount,
      totalQuestions: questionCount
    });

    // Refresh logs periodically
    const interval = setInterval(() => {
      setLogs(getLogs());
    }, 10000);

    return () => clearInterval(interval);
  }, [exams]); // Re-calc when exams change

  const handleDeleteUser = (email: string) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
    const newUsers = users.filter(u => u.email !== email);
    setUsers(newUsers);
    localStorage.setItem('user_index', JSON.stringify(newUsers));
    localStorage.removeItem(`user_${email}`);
    localStorage.removeItem(`history_${email}`);
    localStorage.removeItem(`schedule_${email}`);
  };

  const toggleExamStatus = (examId: number) => {
    const updatedExams = exams.map(e => 
      e.id === examId ? { ...e, isActive: e.isActive === false ? true : false } : e
    );
    onUpdateExams(updatedExams);
  };

  const handleDeleteExam = (examId: number) => {
    if (!confirm('Bu sınavı silmek istediğinize emin misiniz?')) return;
    const updatedExams = exams.filter(e => e.id !== examId);
    onUpdateExams(updatedExams);
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setIsCreatingExam(true);
  };

  const handleSaveExam = (savedExam: Exam) => {
    let updatedExams: Exam[];
    
    // Check if updating existing exam (by ID)
    const exists = exams.some(e => e.id === savedExam.id);

    if (exists) {
      // Update existing
      updatedExams = exams.map(e => e.id === savedExam.id ? savedExam : e);
      alert("Sınav başarıyla güncellendi.");
    } else {
      // Add new
      updatedExams = [...exams, savedExam];
      alert("Yeni sınav başarıyla oluşturuldu.");
    }

    onUpdateExams(updatedExams);
    setIsCreatingExam(false);
    setEditingExam(null);
  };

  const handleCancelCreation = () => {
    setIsCreatingExam(false);
    setEditingExam(null);
  };

  const handleClearLogs = () => {
    if (!confirm('Tüm kayıtları temizlemek istiyor musunuz?')) return;
    clearLogs();
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-10">
      
      {/* Navbar (Responsive) */}
      <div className="bg-slate-800 text-white shadow-lg sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-lg shadow-red-500/50 shadow-lg shrink-0">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-xl tracking-tight leading-tight">Yönetici Paneli</h1>
              <p className="text-[10px] md:text-xs text-gray-400 hidden sm:block">Sistem Kontrol Merkezi</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-sm font-medium hidden lg:inline bg-slate-700 px-3 py-1 rounded-full">{user.email}</span>
             <button 
               onClick={onLogout}
               className="bg-slate-700 hover:bg-red-600 p-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm border border-slate-600"
               title="Çıkış Yap"
             >
               <LogOut className="w-5 h-5 md:w-4 md:h-4" /> <span className="hidden md:inline">Çıkış</span>
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 animate-fade-in">
        
        {/* Stats Section - Collapsible on Mobile or simplified */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
          
          {/* Card 1: Students */}
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Öğrenciler</p>
               <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{users.length}</h3>
               <div className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit mt-1">
                 <TrendingUp className="w-3 h-3 mr-1" /> +{stats.recentUsers} yeni
               </div>
             </div>
             <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
               <Users className="w-6 h-6" />
             </div>
          </div>

          {/* Card 2: Exams */}
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Sınavlar</p>
               <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{exams.length}</h3>
               <div className="flex items-center text-[10px] font-bold text-gray-400 mt-1">
                 <BookOpen className="w-3 h-3 mr-1" /> {stats.totalQuestions} soru
               </div>
             </div>
             <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
               <FileText className="w-6 h-6" />
             </div>
          </div>

          {/* Card 3: Performance (Hidden on very small screens to save space if needed, keeping for now) */}
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Ortalama</p>
               <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{stats.averageScore}</h3>
               <div className="flex items-center text-[10px] font-bold text-gray-400 mt-1">
                 <TrendingUp className="w-3 h-3 mr-1" /> {stats.totalAttempts} çözüm
               </div>
             </div>
             <div className="bg-green-50 p-3 rounded-xl text-green-600">
               <Activity className="w-6 h-6" />
             </div>
          </div>

          {/* Card 4: Logs */}
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Loglar</p>
               <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{logs.length}</h3>
               <div className="flex items-center text-[10px] font-bold text-gray-400 mt-1 truncate max-w-[100px]">
                 <Clock className="w-3 h-3 mr-1" /> {logs.length > 0 ? new Date(logs[0].timestamp).toLocaleTimeString('tr-TR') : '-'}
               </div>
             </div>
             <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
               <AlertCircle className="w-6 h-6" />
             </div>
          </div>
        </div>

        {/* Desktop Tabs (Hidden on Mobile) */}
        <div className="hidden md:flex mb-6 space-x-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 w-fit">
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Users className="w-4 h-4" /> Öğrenciler
            </button>
            <button 
              onClick={() => setActiveTab('exams')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'exams' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <FileText className="w-4 h-4" /> Sınav Yönetimi
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'logs' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Activity className="w-4 h-4" /> Sistem Logları
            </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[500px] overflow-hidden relative mb-4">
          
          {activeTab === 'users' && (
             <AdminUserList users={users} onDeleteUser={handleDeleteUser} />
          )}

          {activeTab === 'exams' && (
            isCreatingExam ? (
              <AdminExamCreator 
                initialData={editingExam}
                onSave={handleSaveExam} 
                onCancel={handleCancelCreation} 
              />
            ) : (
              <AdminExamList 
                exams={exams} 
                onToggleStatus={toggleExamStatus} 
                onDeleteExam={handleDeleteExam}
                onUpdateExams={onUpdateExams}
                onCreateClick={() => {
                  setEditingExam(null);
                  setIsCreatingExam(true);
                }}
                onEditExam={handleEditExam}
              />
            )
          )}

          {activeTab === 'logs' && (
            <AdminLogs logs={logs} onClearLogs={handleClearLogs} />
          )}

        </div>
      </div>

      {/* --- MOBILE ADMIN BOTTOM NAVIGATION --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-2 z-50 flex justify-around items-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <button 
            onClick={() => setActiveTab('users')}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${activeTab === 'users' ? 'text-slate-800' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <Users className={`w-6 h-6 ${activeTab === 'users' ? 'fill-current opacity-20' : ''}`} />
            <span className="text-[10px] font-bold">Öğrenciler</span>
         </button>

         <button 
            onClick={() => setActiveTab('exams')}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${activeTab === 'exams' ? 'text-slate-800' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <FileText className={`w-6 h-6 ${activeTab === 'exams' ? 'fill-current opacity-20' : ''}`} />
            <span className="text-[10px] font-bold">Sınavlar</span>
         </button>

         <button 
            onClick={() => setActiveTab('logs')}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${activeTab === 'logs' ? 'text-slate-800' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <Activity className={`w-6 h-6 ${activeTab === 'logs' ? 'fill-current opacity-20' : ''}`} />
            <span className="text-[10px] font-bold">Loglar</span>
         </button>
      </div>

    </div>
  );
};

export default AdminDashboard;