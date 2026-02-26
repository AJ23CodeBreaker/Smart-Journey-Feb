import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Level } from '../types';
import { Link } from 'react-router-dom';

export const QuizSelect = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const levels = [
    { id: Level.BRONZE, icon: '🥉', color: 'bg-orange-100 text-orange-700 border-orange-200', desc: 'Basics of budgeting and saving.' },
    { id: Level.SILVER, icon: '🥈', color: 'bg-slate-100 text-slate-700 border-slate-200', desc: 'Credit, loans, and financial security.' },
    { id: Level.GOLD, icon: '🥇', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', desc: 'Investment, MPF, and long-term planning.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('exam')}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Earn certificates by passing the proficiency exam for each level.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {levels.map((lvl) => {
          const isUnlocked = user.xp >= (lvl.id === Level.BRONZE ? 0 : lvl.id === Level.SILVER ? 300 : 800);
          
          return (
            <div 
              key={lvl.id}
              className={`bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border-2 flex flex-col h-full transition-all duration-300 ${
                isUnlocked ? "border-slate-100 dark:border-slate-700 hover:border-brand-500" : "opacity-60 grayscale border-transparent"
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm ${lvl.color}`}>
                {lvl.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{lvl.id}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 flex-grow">{lvl.desc}</p>
              
              {isUnlocked ? (
                <Link 
                  to={`/quiz/${lvl.id}`}
                  className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold text-center hover:bg-brand-700 transition shadow-md"
                >
                  {t('generateQuestion')}
                </Link>
              ) : (
                <div className="w-full bg-slate-100 dark:bg-slate-700 text-slate-400 py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                   {t('locked')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
