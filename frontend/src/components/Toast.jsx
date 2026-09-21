import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function Toast() {
  const { toast, dismissToast } = useGym();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#CCFF00] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-[#CCFF00]/40',
    error: 'border-red-500/40',
    info: 'border-cyan-400/40'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-in">
      <div className={`bg-[#121722]/95 backdrop-blur-xl border ${borderColors[toast.type] || borderColors.success} shadow-2xl rounded-xl p-4 flex items-start gap-3 shadow-black/80`}>
        {icons[toast.type] || icons.success}
        <div className="flex-1 pr-2">
          <h4 className="text-white font-semibold text-sm tracking-wide">{toast.title}</h4>
          <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
