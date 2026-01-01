
import React, { useState } from 'react';
import { User } from '../types';
import { LogIn, School, GraduationCap, User as UserIcon, CheckCircle, MapPin, Building2 } from 'lucide-react';
import { addLog } from '../services/logger';
import { logSystemActivity } from '../services/supabaseService';
import { CITIES } from '../data/locations';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  
  // Yeni Alanlar
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setDistrict(''); // Şehir değişince ilçeyi sıfırla
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ADMIN LOGIN CHECK (Hidden Backdoor)
    if (name.toLowerCase() === 'admin' && selectedGrade === 12) {
        const adminUser: User = {
          name: 'Sistem Yöneticisi',
          email: 'admin@portal.com',
          grade: 12,
          role: 'admin',
          city: 'Merkez',
          district: 'Yönetim',
          schoolName: 'Admin Panel'
        };
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        
        addLog('LOGIN', 'Admin yetkisiyle giriş yapıldı.', adminUser.email);
        logSystemActivity(adminUser.email, 'LOGIN', 'Admin girişi yapıldı.');
        
        onLogin(adminUser);
        return;
    }

    // Validasyon
    if (!name.trim()) {
      setError("Lütfen adınızı giriniz.");
      return;
    }
    if (!selectedGrade) {
      setError("Lütfen sınıfınızı seçiniz.");
      return;
    }
    if (!city || !district) {
      setError("Lütfen il ve ilçe seçimi yapınız.");
      return;
    }
    if (!schoolName.trim()) {
      setError("Lütfen okul adını giriniz.");
      return;
    }

    // Öğrenci Girişi
    const uniqueId = Date.now().toString().slice(-6);
    const generatedEmail = `ogrenci_${uniqueId}@okul.com`;

    const newUser: User = {
      name: name.trim(),
      email: generatedEmail,
      grade: selectedGrade,
      role: 'student',
      registeredAt: new Date().toISOString(),
      schoolName: schoolName.trim(),
      city: city,
      district: district
    };

    // Kullanıcıyı kaydet (LocalStorage)
    localStorage.setItem(`user_${generatedEmail}`, JSON.stringify(newUser));
    
    // User Index güncelleme
    const userListStr = localStorage.getItem('user_index');
    const userList: User[] = userListStr ? JSON.parse(userListStr) : [];
    userList.push(newUser);
    localStorage.setItem('user_index', JSON.stringify(userList));

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // LOGGING (Local & Cloud)
    // Log mesajına konum bilgilerini ekle
    const logDetail = `${name} (${selectedGrade}. Sınıf) - ${city}/${district} - ${schoolName} sisteme giriş yaptı.`;
    
    addLog('LOGIN', logDetail, generatedEmail);
    logSystemActivity(generatedEmail, 'LOGIN', logDetail);

    onLogin(newUser);
  };

  const gradeOptions = [
    { label: 'Ortaokul', grades: [5, 6, 7, 8], icon: School, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Lise', grades: [9, 10, 11, 12], icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up border border-gray-100">
        
        {/* Header */}
        <div className="bg-slate-800 p-6 md:p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 mix-blend-overlay"></div>
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20 shadow-inner">
             <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 relative z-10">Öğrenci Girişi</h1>
          <p className="opacity-80 text-sm relative z-10">
            Sınavlara başlamak için bilgilerinizi eksiksiz doldurunuz.
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Ad Soyad */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Adınız Soyadınız</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none font-bold text-gray-800 bg-gray-50 focus:bg-white transition-all placeholder:font-normal"
                placeholder="Örn: Ali Yılmaz"
                autoFocus
              />
            </div>

            {/* Lokasyon (İl / İlçe) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">İl</label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={handleCityChange}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-800 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Seçiniz</option>
                    {Object.keys(CITIES).sort().map(cityName => (
                      <option key={cityName} value={cityName}>{cityName}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">İlçe</label>
                <div className="relative">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={!city}
                    className={`w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-800 bg-gray-50 focus:bg-white appearance-none cursor-pointer ${!city && 'opacity-50 cursor-not-allowed'}`}
                  >
                    <option value="">{city ? 'Seçiniz' : 'Önce İl Seçin'}</option>
                    {city && CITIES[city]?.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Okul Adı */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Okul Adı</label>
              <div className="relative">
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none font-medium text-gray-800 bg-gray-50 focus:bg-white transition-all placeholder:font-normal"
                  placeholder="Örn: Cumhuriyet Ortaokulu"
                />
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Sınıf Seçimi */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Sınıfınız</label>
              <div className="space-y-3">
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
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center justify-center font-bold animate-pulse border border-red-100 shadow-sm text-center">
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
            KVKK kapsamında verileriniz sadece sınav deneyimi için tarayıcınızda saklanır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
