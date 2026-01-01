import React, { useState, useRef } from 'react';
import { User } from '../types';
import { LogOut, Camera, Save, Lock, User as UserIcon, MapPin, School } from 'lucide-react';
import { addLog } from '../services/logger';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, onLogout }) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(user.avatar);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Görseli sıkıştırma ve yeniden boyutlandırma fonksiyonu (<10KB hedefi)
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Hedef boyut: 150x150 piksel (yeterince küçük)
          const MAX_SIZE = 150;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Kaliteyi düşürerek (0.6) JPEG formatında al
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
            resolve(dataUrl);
          } else {
            reject(new Error("Canvas context error"));
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processedImage = await processImage(file);
        setAvatar(processedImage);
      } catch (error) {
        console.error("Resim işleme hatası", error);
        alert("Resim yüklenirken bir hata oluştu.");
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedUser: User = {
      ...user,
      name: name,
      avatar: avatar,
      // Eğer şifre girildiyse güncelle (gerçek backend olmadığı için localde sadece objeyi güncelliyoruz)
      // password: password ? password : user.password 
    };

    // localStorage güncelleme
    localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Global User Index'i güncelle
    const userListStr = localStorage.getItem('user_index');
    if (userListStr) {
      const userList: User[] = JSON.parse(userListStr);
      const updatedList = userList.map(u => u.email === user.email ? updatedUser : u);
      localStorage.setItem('user_index', JSON.stringify(updatedList));
    }

    onUpdateUser(updatedUser);
    
    setTimeout(() => {
      setIsSaving(false);
      setPassword(''); // Temizle
      alert("Profil başarıyla güncellendi!");
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in pb-20">
      <div className="bg-slate-800 p-6 text-white text-center relative">
        <h2 className="text-xl font-bold mb-1">Profilim</h2>
        <p className="text-slate-400 text-xs">{user.email}</p>
        
        <div className="mt-6 relative inline-block group">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-600 overflow-hidden shadow-lg mx-auto flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-white/50">{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
      </div>

      <div className="p-6">
        
        {/* Read-Only School & Location Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
           <h3 className="text-xs font-bold text-blue-800 uppercase mb-3 border-b border-blue-100 pb-2">Okul Bilgileri</h3>
           <div className="space-y-2">
             <div className="flex items-center gap-2">
               <School className="w-4 h-4 text-blue-500" />
               <span className="text-sm text-blue-900 font-medium">{user.schoolName || 'Belirtilmemiş'}</span>
             </div>
             <div className="flex items-center gap-2">
               <MapPin className="w-4 h-4 text-blue-500" />
               <span className="text-sm text-blue-900">{user.district || '-'} / {user.city || '-'}</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-4 h-4 flex items-center justify-center text-xs font-bold text-white bg-blue-500 rounded-full">
                 {user.grade}
               </div>
               <span className="text-sm text-blue-900">{user.grade}. Sınıf Öğrencisi</span>
             </div>
           </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Ad Soyad</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                placeholder="Adınız"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Yeni Şifre (İsteğe Bağlı)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                placeholder="Değiştirmek için giriniz"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-green-700 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            {isSaving ? "Kaydediliyor..." : (
              <>
                <Save className="w-4 h-4" /> Değişiklikleri Kaydet
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
           <button 
             onClick={onLogout}
             className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-100"
           >
             <LogOut className="w-4 h-4" /> Hesaptan Çıkış Yap
           </button>
           <p className="text-center text-[10px] text-gray-400 mt-4">
             Akıllı Sınav Portalı v1.2<br/>
             Öğrenci ID: {user.registeredAt ? new Date(user.registeredAt).getTime().toString().slice(-6) : 'DEMO'}
           </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
