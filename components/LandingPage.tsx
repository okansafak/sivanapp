
import React from 'react';
import { Brain, Target, Sparkles, ChevronRight, School, CheckCircle, Smartphone, Calculator, Globe, BookOpen, Layers, ShieldCheck, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200">
                <Brain className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight">Akıllı Sınav</span>
            </div>
            <button 
              onClick={onGetStarted}
              className="font-bold text-sm md:text-base text-white bg-blue-600 hover:bg-blue-700 transition-all px-6 py-2.5 rounded-xl shadow-md shadow-blue-200 active:scale-95"
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden relative">
        {/* Background Blobs */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-4xl mx-auto text-center animate-fade-in-up relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-600 font-bold text-xs mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span>Yeni: Maarif Modeli'ne Uygun Açık Uçlu Sınavlar!</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Sınavlara Hazırlanmanın <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">En Akıllı Yolu</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed px-2 font-medium">
            Türkiye Yüzyılı Maarif Modeli'ne tam uyumlu, yeni nesil açık uçlu sorularla analiz yeteneğini geliştir.
            <span className="hidden md:inline"> Klasik testlerin ötesine geç, yapay zeka ile eksiklerini nokta atışı belirle.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 group ring-offset-2 focus:ring-2 ring-blue-500"
            >
              Hemen Başla 
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-blue-200 hover:text-blue-600 hover:shadow-lg transition-all active:scale-95"
            >
              Demo Hesabı Dene
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-slate-400 text-xs md:text-sm font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100"><CheckCircle className="w-4 h-4 text-green-500" /> 5-12. Sınıflar</div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100"><CheckCircle className="w-4 h-4 text-green-500" /> Maarif Modeli</div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100"><CheckCircle className="w-4 h-4 text-green-500" /> Detaylı Karne</div>
          </div>
        </div>
      </section>

      {/* Supported Lessons Marquee/Grid */}
      <section className="py-10 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4">
           <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Desteklenen Dersler</p>
           <div className="flex flex-wrap justify-center gap-3 md:gap-6 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"><BookOpen className="w-4 h-4 text-orange-500"/> Türkçe</div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"><Calculator className="w-4 h-4 text-blue-500"/> Matematik</div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"><Globe className="w-4 h-4 text-green-500"/> Fen Bilimleri</div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"><Layers className="w-4 h-4 text-indigo-500"/> Sosyal Bilgiler</div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-gray-500 text-xs font-bold">+9 Ders Daha</div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Neden Akıllı Sınav?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Öğrenme sürecini hızlandıran, teknolojiyi eğitimle birleştiren özellikler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100 hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Gemini AI Analizi</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Yazdığın açık uçlu cevaplar Google Gemini yapay zekası tarafından okunur, puanlanır ve sana özel tavsiyeler verilir.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100 hover:shadow-2xl hover:border-orange-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Maarif Modeli & Açık Uçlu</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Sınavlar, Türkiye Yüzyılı Maarif Modeli'ne uygun olarak; analiz, sentez ve eleştirel düşünme becerilerini ölçen açık uçlu sorulardan oluşur.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100 hover:shadow-2xl hover:border-green-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Mobil Öncelikli</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Telefon, tablet veya bilgisayar. Uygulama her cihazda kusursuz çalışacak şekilde tasarlandı. Her an yanında.
              </p>
            </div>

             {/* Feature 4 */}
             <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100 hover:shadow-2xl hover:border-purple-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Güvenli & Özel</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Verilerin tarayıcında saklanır. Kayıt olmak zorunda değilsin, demo hesaplarla anında sistemi deneyebilirsin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Showcase */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="md:w-1/2">
              <div className="inline-block bg-blue-500/20 text-blue-300 font-bold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">
                NASIL ÇALIŞIR?
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">Başarıya Giden <br/> 3 Basit Adım</h2>
              
              <div className="space-y-8">
                <div className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-lg">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">Dersini Seç</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Ortaokul (5-8) veya Lise (9-12) seviyesinde çalışmak istediğin dersi ve konuyu sihirbaz yardımıyla belirle.</p>
                  </div>
                </div>
                
                <div className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-lg">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-orange-300 transition-colors">Soruları Çöz</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Sadece şık işaretleme değil; yeni modele uygun klasik sorulara kendi cümlelerinle cevap ver.</p>
                  </div>
                </div>
                
                <div className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-green-400 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-lg">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-green-300 transition-colors">Yapay Zeka Karneni Alsın</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Saniyeler içinde "Sınavı Bitir"e bas. Yapay zeka öğretmenin cevaplarını okusun, puanlasın ve sana tavsiyeler versin.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                 <button onClick={onGetStarted} className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg active:scale-95">
                   Hemen Denemeye Başla
                 </button>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full relative">
               {/* Decorative Abstract UI */}
               <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-20 blur-xl animate-pulse"></div>
               <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-2xl relative">
                  {/* Mock Interface Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                           <School className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                           <div className="text-sm font-bold text-white">Sonuç Ekranı</div>
                           <div className="text-[10px] text-slate-400">8. Sınıf • Türkçe</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-2xl font-extrabold text-green-400">95</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Puan</div>
                     </div>
                  </div>

                  {/* Mock Interface Content */}
                  <div className="space-y-4">
                     <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-slate-700 text-[10px] px-1.5 py-0.5 rounded text-slate-300">SORU 3</span>
                           <span className="text-xs font-bold text-slate-300">Metnin ana düşüncesi nedir?</span>
                        </div>
                        <p className="text-xs text-slate-400 italic">"Yazar burada doğa sevgisinin insanı iyileştirdiğini anlatıyor..."</p>
                     </div>

                     <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                           <Zap className="w-3 h-3 text-green-400" />
                           <span className="text-xs font-bold text-green-400">AI DEĞERLENDİRMESİ</span>
                        </div>
                        <p className="text-xs text-green-100 leading-relaxed">
                           "Harika bir tespit! Metindeki 'orman nefestir' metaforunu doğru yakaladın ve ana fikri kendi cümlelerinle çok güzel özetledin. Tam puan!"
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Hazır mısın?</h2>
            <p className="text-slate-500 mb-8 text-lg">Hemen ücretsiz giriş yap veya demo hesaplarla sistemi keşfet. Kaybetmek yok, öğrenmek var.</p>
            <button 
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              Sisteme Giriş Yap
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-2 mb-4 text-slate-800 font-bold text-xl">
              <Brain className="w-6 h-6" />
              <span>Akıllı Sınav Portalı</span>
           </div>
           <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500 font-medium">
              <a href="#" className="hover:text-blue-600 transition-colors">Hakkımızda</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Özellikler</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Gizlilik</a>
              <a href="#" className="hover:text-blue-600 transition-colors">İletişim</a>
           </div>
           <p className="text-gray-400 text-xs">
             © 2024 Tüm Hakları Saklıdır. Eğitim amaçlı geliştirilmiştir. Maarif Modeli müfredatı referans alınmıştır.
           </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
