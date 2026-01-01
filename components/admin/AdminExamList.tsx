import React, { useState, useRef, useMemo } from 'react';
import { Exam, LESSON_LABELS, LessonType } from '../../types';
import { Search, Upload, Download, Plus, Eye, EyeOff, Trash2, Edit, FileDown, Filter, ChevronDown, ChevronRight, Book, Layers } from 'lucide-react';

interface AdminExamListProps {
  exams: Exam[];
  onToggleStatus: (id: number) => void;
  onDeleteExam: (id: number) => void;
  onUpdateExams: (exams: Exam[]) => void;
  onCreateClick: () => void;
  onEditExam: (exam: Exam) => void;
}

const AdminExamList: React.FC<AdminExamListProps> = ({ 
  exams, onToggleStatus, onDeleteExam, onUpdateExams, onCreateClick, onEditExam 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterLesson, setFilterLesson] = useState<string>('all');
  
  // Expanded States for Accordions (Grade IDs)
  const [expandedGrades, setExpandedGrades] = useState<number[]>([5, 6, 7, 8, 9, 10, 11, 12]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Filter Logic
  const filteredExams = useMemo(() => {
    return exams.filter(e => {
      const matchesSearch = 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        LESSON_LABELS[e.lesson].toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = filterGrade === 'all' || e.grade.toString() === filterGrade;
      const matchesLesson = filterLesson === 'all' || e.lesson === filterLesson;

      return matchesSearch && matchesGrade && matchesLesson;
    });
  }, [exams, searchTerm, filterGrade, filterLesson]);

  // 2. Grouping Logic (Grade -> Lesson -> Exams)
  const groupedExams = useMemo(() => {
    const groups: Record<number, Record<string, Exam[]>> = {};

    filteredExams.forEach(exam => {
      if (!groups[exam.grade]) {
        groups[exam.grade] = {};
      }
      if (!groups[exam.grade][exam.lesson]) {
        groups[exam.grade][exam.lesson] = [];
      }
      groups[exam.grade][exam.lesson].push(exam);
    });

    // Sort exams inside groups by Term then Exam Number
    Object.keys(groups).forEach(gradeKey => {
      const grade = Number(gradeKey);
      Object.keys(groups[grade]).forEach(lessonKey => {
        groups[grade][lessonKey].sort((a, b) => {
          if (a.term !== b.term) return a.term - b.term;
          return a.examNumber - b.examNumber;
        });
      });
    });

    return groups;
  }, [filteredExams]);

  const toggleGrade = (grade: number) => {
    setExpandedGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  const handleExportExams = () => {
    const dataStr = JSON.stringify(exams, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `exams_export_all_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSingleExam = (exam: Exam) => {
    const dataStr = JSON.stringify([exam], null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeTitle = exam.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `exam_${exam.lesson}_${safeTitle}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed: any = JSON.parse(content);
        
        if (!Array.isArray(parsed)) {
          alert("Hata: Yüklenen dosya geçerli bir sınav listesi formatında değil.");
          return;
        }

        const importedExams = parsed as Exam[];

        if (confirm(`${importedExams.length} adet sınav yüklenecek. Onaylıyor musunuz?`)) {
          const currentIds = new Set(exams.map(e => e.id));
          const safeImported = importedExams.map((ex, idx) => {
             // ID conflict resolution
             if (currentIds.has(ex.id)) {
                return { ...ex, id: Date.now() + idx, isActive: true };
             }
             return { ...ex, isActive: true };
          });

          onUpdateExams([...exams, ...safeImported]);
          alert("Başarıyla yüklendi.");
        }
      } catch (err) {
        console.error(err);
        alert("Dosya okunamadı.");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; 
  };

  // Get sorted grades present in current view
  const visibleGrades = Object.keys(groupedExams).map(Number).sort((a, b) => a - b);

  return (
    <div className="p-4 md:p-6 pb-20">
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Sınav Yönetimi</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto flex-wrap">
           {/* Filters */}
           <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
             <select 
               value={filterGrade} 
               onChange={(e) => setFilterGrade(e.target.value)}
               className="p-2 pl-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer shadow-sm"
             >
                <option value="all">Tüm Sınıflar</option>
                {[5, 6, 7, 8, 9, 10, 11, 12].map(g => <option key={g} value={g}>{g}. Sınıf</option>)}
             </select>

             <select 
               value={filterLesson} 
               onChange={(e) => setFilterLesson(e.target.value)}
               className="p-2 pl-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer shadow-sm"
             >
                <option value="all">Tüm Dersler</option>
                {Object.entries(LESSON_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
             </select>
           </div>

           {/* Search & Actions */}
           <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1">
               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Sınav ara..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 w-full shadow-sm"
               />
             </div>
             
             <div className="flex gap-2">
                 <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                     <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
                     <button onClick={handleImportClick} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg tooltip" title="İçe Aktar">
                       <Upload className="w-4 h-4" />
                     </button>
                     <button onClick={handleExportExams} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg tooltip" title="Dışa Aktar">
                       <Download className="w-4 h-4" />
                     </button>
                 </div>

                 <button 
                   onClick={onCreateClick}
                   className="bg-accent text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 shadow-md whitespace-nowrap active:scale-95 transition-transform"
                 >
                   <Plus className="w-5 h-5" /> <span className="hidden sm:inline">Yeni Sınav</span>
                 </button>
             </div>
           </div>
        </div>
      </div>

      {/* --- CONTENT (ACCORDION) --- */}
      <div className="space-y-4">
        {visibleGrades.map((grade) => {
          const isExpanded = expandedGrades.includes(grade);
          const lessonsInGrade = groupedExams[grade];
          const totalExamsInGrade = Object.values(lessonsInGrade).reduce((acc, curr) => acc + curr.length, 0);

          return (
            <div key={grade} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Grade Header */}
              <button 
                onClick={() => toggleGrade(grade)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-sm ${isExpanded ? 'bg-slate-700' : 'bg-gray-400'}`}>
                      {grade}
                   </div>
                   <h3 className="text-lg font-bold text-gray-800">{grade}. Sınıf</h3>
                   <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-gray-500 border border-gray-200">
                     {totalExamsInGrade} Sınav
                   </span>
                </div>
                {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
              </button>

              {/* Lesson Groups */}
              {isExpanded && (
                <div className="p-2 sm:p-4 bg-white space-y-4 animate-fade-in">
                  {Object.keys(lessonsInGrade).map((lessonKey) => {
                    const examsInLesson = lessonsInGrade[lessonKey];
                    return (
                      <div key={lessonKey} className="border border-gray-100 rounded-xl overflow-hidden">
                        {/* Lesson Header */}
                        <div className="bg-blue-50/50 px-4 py-2 border-b border-blue-50 flex items-center gap-2">
                           <Book className="w-4 h-4 text-blue-500" />
                           <span className="font-bold text-gray-700 text-sm">{LESSON_LABELS[lessonKey as LessonType]}</span>
                           <span className="text-xs text-gray-400 font-mono">({examsInLesson.length})</span>
                        </div>

                        {/* Exam Rows */}
                        <div className="divide-y divide-gray-50">
                          {examsInLesson.map((exam) => (
                            <div key={exam.id} className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors group">
                                <div className="flex items-start gap-3">
                                   <div className="mt-1 sm:mt-0">
                                      <div className={`w-2 h-2 rounded-full ${exam.isActive !== false ? 'bg-green-500' : 'bg-gray-300'}`} />
                                   </div>
                                   <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h4 className={`text-sm font-bold ${exam.isActive !== false ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                                          {exam.title}
                                        </h4>
                                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                          {exam.term}. Dönem {exam.examNumber}. Yazılı
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{exam.theme} • {exam.questions.length} Soru</p>
                                   </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 self-end sm:self-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => handleExportSingleExam(exam)}
                                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                                      title="İndir"
                                    >
                                      <FileDown className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => onEditExam(exam)}
                                      className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded"
                                      title="Düzenle"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => onToggleStatus(exam.id)}
                                      className={`p-1.5 rounded ${exam.isActive !== false ? 'text-gray-500 hover:text-yellow-600 hover:bg-yellow-50' : 'text-green-600 bg-green-50'}`}
                                      title={exam.isActive !== false ? 'Pasife Al' : 'Aktif Et'}
                                    >
                                      {exam.isActive !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    <button 
                                      onClick={() => onDeleteExam(exam.id)}
                                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                                      title="Sil"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredExams.length === 0 && (
           <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
             <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
             <p className="text-gray-500 font-medium">Bu filtrelemeye uygun sınav bulunamadı.</p>
             <button onClick={onCreateClick} className="text-accent text-sm font-bold mt-2 hover:underline">
               Yeni sınav oluştur
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminExamList;