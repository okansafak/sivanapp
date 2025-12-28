import React from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  type = 'info'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all animate-scale-in">
        {/* Header */}
        <div className={`p-4 flex justify-between items-center ${type === 'warning' ? 'bg-amber-50' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
              {type === 'warning' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            </div>
            <h3 className={`font-bold text-lg ${type === 'warning' ? 'text-amber-800' : 'text-blue-800'}`}>
              {title}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {message}
          </p>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Vazgeç
          </button>
          <button 
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white font-bold shadow-md transition-transform active:scale-95 text-sm
              ${type === 'warning' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {type === 'warning' ? 'Evet, Yine de Bitir' : 'Sınavı Tamamla'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;