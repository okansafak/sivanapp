
import React, { useState } from 'react';
import { User } from '../types';
import { LogIn, School, GraduationCap, User as UserIcon, CheckCircle } from 'lucide-react';
import { addLog } from '../services/logger';
import { logSystemActivity } from '../services/supabaseService';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ADMIN LOGIN CHECK (Hidden Backdoor)
    if (name.toLowerCase() === 'admin' && selectedGrade === 12) {
        const adminUser: User = {
          name: 'Sistem Yöneticisi',
          email: 'admin@portal.com',
          grade: 12,
          role: 'admin'
        };
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        
        // Log to Local & Cloud
        addLog('LOGIN', 'Admin yetkisiyle giriş yapıldı.', adminUser.email);
        logSystemActivity(adminUser.email, 'LOGIN', 'Admin girişi yapıldı.');
        
        onLogin(adminUser);
        return;
    }

    if (!name.trim() || !selectedGrade) {
      setError("Lütfen adınızı girin ve sınıfınızı seçin.");
      return;
    }

    // Basitleştirilmiş Öğrenci Girişi
    const uniqueId = Date.now().toString().slice(-6);
    const generatedEmail = `ogrenci_${uniqueId}@okul.com`;

    const newUser: User = {
      name: name.trim(),
      email: generatedEmail,
      grade: selectedGrade,
      role: 'student',
      registeredAt: new Date().toISOString(),
      schoolName: 'Misafir Okulu',
      city: 'Genel',
      district: 'Genel'
    };

    // Kullanıcıyı kaydet (LocalStorage - Basit Session)
    localStorage.setItem(`user_${generatedEmail}`, JSON.stringify(newUser));
    
    // Admin panelinde görünebilmesi için User Index'e ekleyelim
    const userListStr = localStorage.getItem('user_index');
    const userList: User[] = userListStr ? JSON.parse(userListStr) : [];
    userList.push(newUser);
    localStorage.setItem('user_index', JSON.stringify(userList));

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // LOGGING (Local & Cloud)
    addLog('LOGIN', `${name} (${selectedGrade}. Sınıf) sisteme giriş yaptı.`, generatedEmail);
    logSystemActivity(generatedEmail, 'LOGIN', `Yeni oturum: ${name}, ${selectedGrade}. Sınıf`);

    onLogin(newUser);
  };

  const gradeOptions = [
    { label: 'Ortaokul', grades: [5, 6, 7, 8], icon: School, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Lise', grades: [9, 10, 11, 12], icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up border border-gray-100">
        
        {/* Header */}
        <div className="bg-slate-800 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 mix-blend-overlay"></div>
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20 shadow-inner">
             <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 relative z-10">Hoş Geldiniz</h1>
          <p className="opacity-80 text-sm relative z-10">
            Sınavlara başlamak için bilgilerinizi giriniz.
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Adınız Soyadınız</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-5 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-lg font-bold text-gray-800 bg-gray-50 focus:bg-white transition-all placeholder:font-normal"
                  placeholder="Örn: Ali Yılmaz"
                  autoFocus
                />
              </div>
            </div>

            {/* Grade Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Sınıfınız</label>
              <div className="space-y-4">
                {gradeOptions.map((level) => (
                  <div key={level.label}>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wide px-1">
                      <level.icon className="w-3 h-3" /> {level.label}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {level.grades.map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setSelectedGrade(g)}
                          className={`py-3 rounded-xl font-bold text-lg transition-all relative overflow-hidden active:scale-95 ${
                            selectedGrade === g 
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105 z-10 ring-2 ring-offset-2 ring-blue-600' 
                              : 'bg-white text-gray-600 border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {g}.
                          {selectedGrade === g && (
                            <div className="absolute top-1 right-1">
                              <CheckCircle className="w-3 h-3 text-white/50" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center justify-center font-bold animate-pulse border border-red-100 shadow-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 text-lg active:scale-95 transform mt-4 ring-offset-2 focus:ring-2 focus:ring-blue-600"
            >
              <LogIn className="w-5 h-5" />
              Sisteme Giriş Yap
            </button>
            
          </form>
          
          <p className="text-center text-xs text-gray-400 mt-6 font-medium">
            Giriş yaparak kullanım koşullarını kabul etmiş sayılırsınız.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
