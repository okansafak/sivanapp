import React, { useState } from 'react';
import { Key, ExternalLink, X, Lock } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [inputKey, setInputKey] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSubmit(inputKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-scale-in border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-slate-800 p-5 flex justify-between items-start">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">API Anahtarı Gerekli</h3>
              <p className="text-blue-100 text-xs opacity-80">Sınavı değerlendirmek için Google Gemini anahtarı giriniz.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 flex flex-col gap-2">
              <p><strong>Nasıl Alınır?</strong></p>
              <p>Bu uygulama Google Gemini AI kullanır. Ücretsiz bir anahtar almak için aşağıdaki butona tıklayın.</p>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors mt-1"
              >
                Anahtar Oluşturma Sayfasına Git <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                API Anahtarınızı Yapıştırın
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="apiKey"
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Anahtarınız sadece tarayıcınızda saklanır.</p>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
              >
                İptal
              </button>
              <button 
                type="submit"
                disabled={!inputKey.trim()}
                className="px-6 py-2 rounded-lg text-white font-bold bg-green-600 hover:bg-green-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Kaydet ve Değerlendir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;