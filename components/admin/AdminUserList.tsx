import React, { useState } from 'react';
import { User } from '../../types';
import { Search, UserX, Filter } from 'lucide-react';

interface AdminUserListProps {
  users: User[];
  onDeleteUser: (email: string) => void;
}

const AdminUserList: React.FC<AdminUserListProps> = ({ users, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = filterGrade === 'all' || u.grade.toString() === filterGrade;

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Kayıtlı Öğrenciler</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          {/* Grade Filter */}
          <div className="relative w-full sm:w-auto">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
             </div>
             <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white appearance-none cursor-pointer hover:bg-gray-50 w-full"
             >
                <option value="all">Tüm Sınıflar</option>
                {[5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                  <option key={g} value={g}>{g}. Sınıf</option>
                ))}
             </select>
          </div>

          {/* Search */}
          <div className="relative flex-1 w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Öğrenci ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 w-full"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-3">Ad Soyad</th>
              <th className="px-6 py-3">E-Posta</th>
              <th className="px-6 py-3">Sınıf</th>
              <th className="px-6 py-3">Kayıt Tarihi</th>
              <th className="px-6 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((u, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">{u.grade}. Sınıf</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('tr-TR') : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => onDeleteUser(u.email)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                        title="Kullanıcıyı Sil"
                      >
                        <UserX className="w-5 h-5" />
                      </button>
                    )}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Kayıt bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;