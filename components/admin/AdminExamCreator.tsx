import React, { useState, useEffect } from 'react';
import { Exam, Question, LESSON_LABELS, LessonType } from '../../types';
import { Plus, Save, X, Trash2 } from 'lucide-react';

interface AdminExamCreatorProps {
  initialData?: Exam | null;
  onSave: (exam: Exam) => void;
  onCancel: () => void;
}

const AdminExamCreator: React.FC<AdminExamCreatorProps> = ({ initialData, onSave, onCancel }) => {
  const [newExamData, setNewExamData] = useState<Partial<Exam>>({
    grade: 5,
    lesson: 'turkish',
    term: 1,
    examNumber: 1,
    title: '',
    theme: '',
    description: '',
    isActive: true
  });
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'text',
    code: '',
    title: '',
    questionText: '',
    placeholder: '',
    context: ''
  });

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setNewExamData({
        ...initialData
      });
      setNewQuestions(initialData.questions || []);
    }
  }, [initialData]);

  const handleAddQuestion = () => {
    if (!currentQuestion.questionText || !currentQuestion.code) {
      alert("Lütfen en azından Soru Metni ve Kazanım Kodunu giriniz.");
      return;
    }
    const newQ: Question = {
      id: newQuestions.length + 1,
      code: currentQuestion.code || 'GENEL',
      title: currentQuestion.title || 'Soru',
      questionText: currentQuestion.questionText || '',
      type: currentQuestion.type as 'text' | 'textarea' | 'fill-gap',
      placeholder: currentQuestion.placeholder,
      context: currentQuestion.context
    };
    setNewQuestions([...newQuestions, newQ]);
    setCurrentQuestion({
      type: 'text',
      code: '',
      title: '',
      questionText: '',
      placeholder: '',
      context: ''
    });
  };

  const handleRemoveQuestion = (idx: number) => {
    const filtered = newQuestions.filter((_, i) => i !== idx);
    const reindexed = filtered.map((q, i) => ({ ...q, id: i + 1 }));
    setNewQuestions(reindexed);
  };

  const handleSaveExam = () => {
    if (!newExamData.title || !newExamData.theme || newQuestions.length === 0) {
      alert("Lütfen sınav başlığı, teması ve en az 1 soru ekleyiniz.");
      return;
    }

    const finalExam: Exam = {
      id: newExamData.id || Date.now(), // Preserve ID if editing, else new ID
      grade: newExamData.grade || 5,
      lesson: newExamData.lesson as LessonType,
      term: newExamData.term as 1 | 2,
      examNumber: newExamData.examNumber as 1 | 2,
      title: newExamData.title || 'Başlıksız Sınav',
      theme: newExamData.theme || '',
      description: newExamData.description || '',
      questions: newQuestions,
      isActive: true
    };

    onSave(finalExam);
  };

  return (
    <div className="p-4 md:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b gap-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {initialData ? <Save className="w-6 h-6 text-blue-600" /> : <Plus className="w-6 h-6 text-accent" />} 
            {initialData ? 'Sınavı Düzenle' : 'Yeni Sınav Oluştur'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg w-full sm:w-auto justify-center"
        >
          <X className="w-5 h-5" /> İptal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Exam Meta Data */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-600 border-b pb-2">1. Sınav Bilgileri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Sınıf</label>
                  <select 
                    value={newExamData.grade} 
                    onChange={(e) => setNewExamData({...newExamData, grade: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    {[5,6,7,8,9,10,11,12].map(g => <option key={g} value={g}>{g}. Sınıf</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Ders</label>
                  <select 
                    value={newExamData.lesson} 
                    onChange={(e) => setNewExamData({...newExamData, lesson: e.target.value as LessonType})}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    {Object.entries(LESSON_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Dönem</label>
                <select 
                  value={newExamData.term} 
                  onChange={(e) => setNewExamData({...newExamData, term: Number(e.target.value) as 1|2})}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value={1}>1. Dönem</option>
                  <option value={2}>2. Dönem</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Yazılı No</label>
                <select 
                  value={newExamData.examNumber} 
                  onChange={(e) => setNewExamData({...newExamData, examNumber: Number(e.target.value) as 1|2})}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value={1}>1. Yazılı</option>
                  <option value={2}>2. Yazılı</option>
                </select>
              </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Sınav Başlığı</label>
                <input 
                  type="text" 
                  value={newExamData.title}
                  onChange={(e) => setNewExamData({...newExamData, title: e.target.value})}
                  className="w-full p-2 border rounded-lg" 
                  placeholder="Örn: Sınav A (Temel Seviye)"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Tema / Alt Başlık</label>
                <input 
                  type="text" 
                  value={newExamData.theme}
                  onChange={(e) => setNewExamData({...newExamData, theme: e.target.value})}
                  className="w-full p-2 border rounded-lg" 
                  placeholder="Örn: Doğa ve Evren"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Açıklama</label>
                <textarea 
                  value={newExamData.description}
                  onChange={(e) => setNewExamData({...newExamData, description: e.target.value})}
                  className="w-full p-2 border rounded-lg h-20" 
                  placeholder="Örn: Bu sınav okuma anlama becerilerini ölçer."
                />
            </div>
          </div>

          {/* Question Builder */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-600 border-b pb-2">2. Soru Ekle</h3>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Kazanım Kodu</label>
                  <input 
                    type="text" 
                    value={currentQuestion.code}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, code: e.target.value})}
                    className="w-full p-2 border rounded-lg text-sm"
                    placeholder="Örn: T.5.1.2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Soru Türü</label>
                  <select 
                    value={currentQuestion.type}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value as any})}
                    className="w-full p-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="text">Kısa Cevap</option>
                    <option value="textarea">Uzun Cevap (Paragraf)</option>
                    <option value="fill-gap">Boşluk Doldurma</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-500 mb-1">Konu Başlığı</label>
                <input 
                  type="text" 
                  value={currentQuestion.title}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, title: e.target.value})}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Örn: Söz Sanatları"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-500 mb-1">Bağlam / Metin (Opsiyonel)</label>
                <textarea 
                  value={currentQuestion.context}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, context: e.target.value})}
                  className="w-full p-2 border rounded-lg text-sm h-16"
                  placeholder="Şiir, paragraf veya ön bilgi..."
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-500 mb-1">Soru Metni</label>
                <textarea 
                  value={currentQuestion.questionText}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, questionText: e.target.value})}
                  className="w-full p-2 border rounded-lg text-sm h-16"
                  placeholder="Soruyu buraya yazınız..."
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-500 mb-1">İpucu / Placeholder (Opsiyonel)</label>
                <input 
                  type="text" 
                  value={currentQuestion.placeholder}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, placeholder: e.target.value})}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Cevap kutusunda görünecek silik yazı..."
                />
              </div>
              <button 
                onClick={handleAddQuestion}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-md active:scale-95"
              >
                + Listeye Ekle
              </button>
            </div>
          </div>
      </div>

      {/* Added Questions List */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-600 border-b pb-2 mb-4 flex justify-between items-center">
          <span>3. Eklenen Sorular ({newQuestions.length})</span>
          {newQuestions.length > 0 && <span className="text-xs font-normal text-green-600 bg-green-100 px-2 py-1 rounded">Hazır</span>}
        </h3>
        
        {newQuestions.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 rounded-xl border border-dashed border-gray-300 text-gray-400">
            Henüz soru eklenmedi.
          </div>
        ) : (
          <div className="space-y-2">
            {newQuestions.map((q, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-white border rounded-lg shadow-sm group relative">
                <div className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded text-sm">
                  S.{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono bg-blue-50 text-blue-600 px-1 rounded">{q.code}</span>
                      <span className="text-xs font-bold text-gray-500 truncate">{q.title}</span>
                    </div>
                    <p className="text-sm text-gray-800 line-clamp-2">{q.questionText}</p>
                </div>
                <button 
                  onClick={() => handleRemoveQuestion(idx)}
                  className="text-red-400 hover:text-red-600 p-2 lg:opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 lg:static"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Footer */}
      <div className="flex justify-end pt-4 border-t">
          <button 
            onClick={handleSaveExam}
            className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 flex items-center justify-center gap-2 transform hover:scale-[1.02] transition-all"
          >
            <Save className="w-5 h-5" /> {initialData ? 'Değişiklikleri Kaydet' : 'Sınavı Kaydet'}
          </button>
      </div>
    </div>
  );
};

export default AdminExamCreator;