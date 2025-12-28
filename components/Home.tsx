import React from 'react';
import { EXAMS } from '../data/exams';
import { BookOpen, Star, PenTool, Activity, Clock } from 'lucide-react';

interface HomeProps {
  onSelectExam: (id: number) => void;
}

const icons = [BookOpen, Star, PenTool, Activity, Clock];

const Home: React.FC<HomeProps> = ({ onSelectExam }) => {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          5. Sınıf Türkçe <span className="text-accent">Akıllı Sınav Portalı</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Yapay zeka destekli sınav sistemi ile kendini test et, anında geri bildirim al. 
          Her sınav 9 temel kazanımı içerir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {EXAMS.map((exam, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div 
              key={exam.id}
              onClick={() => onSelectExam(exam.id)}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-8 border-accent overflow-hidden transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div className="bg-blue-50 p-3 rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                     <Icon className="w-8 h-8 text-accent group-hover:text-white" />
                   </div>
                   <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase">
                     1. Dönem 2. Yazılı
                   </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors">
                  {exam.title}
                </h2>
                <h3 className="text-md font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  {exam.theme}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {exam.description}
                </p>
                
                <div className="flex items-center text-accent font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  Sınava Başla →
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
