import React, { useState } from 'react';
import { ScheduleItem, LessonType, LESSON_LABELS } from '../types';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, AlertCircle } from 'lucide-react';

interface ExamCalendarProps {
  schedule: ScheduleItem[];
  onAdd: (item: ScheduleItem) => void;
  onDelete: (id: string) => void;
}

const ExamCalendar: React.FC<ExamCalendarProps> = ({ schedule, onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonType>('turkish');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      lesson: selectedLesson,
      title,
      date
    };

    onAdd(newItem);
    setIsAdding(false);
    setTitle('');
    setDate('');
  };

  const calculateDaysLeft = (targetDate: string) => {
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Sort by nearest date
  const sortedSchedule = [...schedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-gray-800">Sınav Takvimim</h2>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 bg-accent text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Sınav Ekle
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 animate-scale-in">
          <h3 className="font-bold text-gray-700 mb-3 text-sm">Yeni Sınav Tarihi Ekle</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Ders</label>
                <select 
                  value={selectedLesson} 
                  onChange={(e) => setSelectedLesson(e.target.value as LessonType)}
                  className="w-full p-2 border rounded-lg text-sm bg-white"
                >
                  {Object.entries(LESSON_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Sınav Adı</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: 2. Dönem 1. Yazılı"
                  className="w-full p-2 border rounded-lg text-sm"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Tarih</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
               <button 
                 type="button" 
                 onClick={() => setIsAdding(false)}
                 className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-200 rounded-lg"
               >
                 İptal
               </button>
               <button 
                 type="submit" 
                 className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
               >
                 Kaydet
               </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedSchedule.length > 0 ? (
          sortedSchedule.map(item => {
            const daysLeft = calculateDaysLeft(item.date);
            const isUrgent = daysLeft >= 0 && daysLeft <= 3;
            const isPast = daysLeft < 0;

            return (
              <div 
                key={item.id} 
                className={`relative p-5 rounded-xl border shadow-sm transition-all hover:shadow-md
                  ${isUrgent ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}
                  ${isPast ? 'opacity-60 bg-gray-50' : ''}
                `}
              >
                <button 
                  onClick={() => onDelete(item.id)}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white/50 px-2 py-0.5 rounded">
                    {LESSON_LABELS[item.lesson]}
                  </span>
                  {!isPast && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      <Clock className="w-3 h-3" />
                      {daysLeft === 0 ? 'Bugün!' : `${daysLeft} gün kaldı`}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  {new Date(item.date).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>

                {isPast && (
                  <div className="mt-3 text-xs font-bold text-gray-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Bu sınav tarihi geçti.
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 bg-white rounded-xl border border-dashed text-gray-400">
             <CalendarIcon className="w-10 h-10 mx-auto mb-2 opacity-20" />
             <p>Henüz planlanmış bir sınavın yok.</p>
             <button onClick={() => setIsAdding(true)} className="text-accent text-sm font-bold mt-2 hover:underline">
               İlk sınavını ekle
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCalendar;