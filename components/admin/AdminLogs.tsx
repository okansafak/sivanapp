import React, { useState } from 'react';
import { LogEntry } from '../../types';
import { Search, Filter, Smartphone, Monitor, Globe, X, Info } from 'lucide-react';

interface AdminLogsProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

const AdminLogs: React.FC<AdminLogsProps> = ({ logs, onClearLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.deviceInfo?.ipAddress || '').includes(searchTerm);
    
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    
    return matchesSearch && matchesAction;
  });

  // Unique actions for the dropdown
  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  return (
    <div className="p-0 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 border-b gap-4">
        <h2 className="text-xl font-bold text-gray-800">Sistem Hareketleri</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
            {/* Filter Action */}
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white cursor-pointer w-full"
              >
                  <option value="all">Tüm Olaylar</option>
                  {uniqueActions.map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1 w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Loglarda ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 w-full"
              />
            </div>

            <button onClick={onClearLogs} className="text-red-500 text-sm hover:underline ml-2 whitespace-nowrap self-end sm:self-auto">
               Temizle
            </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead className="bg-gray-50 text-gray-500 text-xs sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3">Zaman</th>
              <th className="px-6 py-3">Kullanıcı</th>
              <th className="px-6 py-3">Olay</th>
              <th className="px-6 py-3">Özet</th>
              <th className="px-6 py-3 text-right">Teknik</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="text-sm hover:bg-gray-50 font-mono transition-colors">
                <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString('tr-TR')}
                </td>
                <td className="px-6 py-3 font-bold text-slate-700">
                  {log.userEmail}
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap ${
                    log.action === 'LOGIN' ? 'bg-green-100 text-green-700' :
                    log.action === 'LOGIN_FAILED' ? 'bg-red-100 text-red-700' :
                    log.action === 'REGISTER' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'EXAM_START' ? 'bg-yellow-100 text-yellow-700' :
                    log.action === 'ADMIN_ACTION' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-600 max-w-xs truncate" title={log.details}>
                  {log.details}
                </td>
                <td className="px-6 py-3 text-right">
                  <button 
                    onClick={() => setSelectedLog(log)}
                    className="text-accent hover:bg-blue-50 p-1.5 rounded-full transition-colors tooltip"
                    title="Cihaz ve IP Detayları"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  {logs.length === 0 ? "Henüz kayıt yok." : "Filtreye uygun kayıt bulunamadı."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="bg-slate-800 p-4 text-white flex justify-between items-center sticky top-0">
              <h3 className="font-bold flex items-center gap-2">
                <Monitor className="w-5 h-5" /> Teknik Log Detayı
              </h3>
              <button onClick={() => setSelectedLog(null)} className="hover:bg-slate-700 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold uppercase">IP Adresi</p>
                  <p className="font-mono text-gray-800 font-bold break-all">{selectedLog.deviceInfo?.ipAddress || 'Bilinmiyor'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                   <p className="text-xs text-gray-500 font-bold uppercase">Platform / OS</p>
                   <p className="font-mono text-gray-800">{selectedLog.deviceInfo?.platform || '-'}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-500 font-bold uppercase flex items-center gap-1">
                  <Smartphone className="w-3 h-3" /> Tarayıcı (User Agent)
                </p>
                <p className="text-xs text-blue-900 break-all font-mono mt-1 leading-relaxed">
                  {selectedLog.deviceInfo?.userAgent || 'Bilgi yok'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <p className="text-xs text-gray-500 font-bold">Ekran Çözünürlüğü</p>
                   <p className="text-sm text-gray-800">{selectedLog.deviceInfo?.screenResolution || '-'}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 font-bold">Dil</p>
                   <p className="text-sm text-gray-800">{selectedLog.deviceInfo?.language || '-'}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 font-bold">Bağlantı Tipi</p>
                   <p className="text-sm text-gray-800">{selectedLog.deviceInfo?.connectionType || '-'}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 font-bold">Log ID</p>
                   <p className="text-xs text-gray-400 font-mono truncate">{selectedLog.id}</p>
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                 <p className="text-xs text-gray-500 font-bold mb-1">Olay Mesajı</p>
                 <p className="bg-yellow-50 text-yellow-800 p-2 rounded text-sm border border-yellow-200">
                    {selectedLog.details}
                 </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t flex justify-end">
              <button 
                onClick={() => setSelectedLog(null)}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-700 w-full sm:w-auto"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogs;