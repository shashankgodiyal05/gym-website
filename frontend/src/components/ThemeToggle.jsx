import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function ThemeToggle({ showLabel = false, className = '' }) {
  const { theme, toggleTheme } = useGym();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 focus:outline-none ${
        isDark
          ? 'bg-slate-900/90 border-slate-700/80 text-yellow-300 hover:text-white hover:border-[#CCFF00]/60 hover:shadow-glow-lime'
          : 'bg-white border-slate-200 text-amber-500 hover:text-amber-600 hover:border-amber-400 hover:shadow-md'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 transition-all duration-500 absolute ${
            isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100 text-amber-500'
          }`}
        />
        <Moon
          className={`w-4 h-4 transition-all duration-500 absolute ${
            isDark ? 'opacity-100 rotate-0 scale-100 text-[#CCFF00]' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}
