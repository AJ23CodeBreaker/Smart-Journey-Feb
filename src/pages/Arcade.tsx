import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MiniGameEngine } from '../components/MiniGameEngine';

export const Arcade = () => {
  const { t } = useLanguage();
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  return (
    <div className="space-y-12 animate-fade-in">
      <header>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{t('games')}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Test your financial decisions in real-life simulations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          onClick={() => setActiveGameId('m1')}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border border-slate-100 dark:border-slate-700 hover:border-brand-500 transition-all cursor-pointer group"
        >
           <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
              🏙️
           </div>
           <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Campus Tycoon</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-6">Manage your budget through a full semester at IVE. Can you survive until the final exam?</p>
           <span className="inline-block px-4 py-2 bg-brand-100 text-brand-700 rounded-xl font-bold text-sm">Play Now</span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border border-slate-100 dark:border-slate-700 opacity-50 cursor-not-allowed">
           <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6">
              💳
           </div>
           <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Credit Card Combat</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-6">Battle against high interest rates and hidden fees. Learn the true cost of borrowing.</p>
           <span className="inline-block px-4 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm">Coming Soon</span>
        </div>
      </div>
      
      <div className="bg-brand-50 dark:bg-brand-900/20 rounded-3xl p-12 text-center border-2 border-dashed border-brand-200 dark:border-brand-800">
         <div className="text-6xl mb-6">🚧</div>
         <h2 className="text-2xl font-bold text-brand-800 dark:text-brand-300 mb-4">Under Construction</h2>
         <p className="text-brand-700/60 dark:text-brand-400 max-w-lg mx-auto">
           We are currently building immersive financial simulations based on IFEC guidelines. Check back soon for the full experience!
         </p>
      </div>

      {activeGameId && (
        <MiniGameEngine 
          moduleId={activeGameId} 
          onClose={() => setActiveGameId(null)} 
        />
      )}
    </div>
  );
};
