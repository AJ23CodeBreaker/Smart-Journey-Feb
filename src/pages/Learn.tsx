import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { MODULES } from '../data/modules';
import { Link } from 'react-router-dom';

export const Learn = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  if (!user) return null;

  return (
    <div className="space-y-12 animate-fade-in">
      <header>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{t('learn')}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Progress through modules to master your finances.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MODULES.map((module) => {
          const isCompleted = user.completedModules.includes(module.id);
          
          return (
            <Link 
              key={module.id} 
              to={`/lesson/${module.id}`}
              className={`group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border-2 transition-all duration-300 hover:shadow-xl ${
                isCompleted 
                  ? "border-green-100 dark:border-green-900/30" 
                  : "border-slate-100 dark:border-slate-700 hover:border-brand-500"
              }`}
            >
              <div className={`w-16 h-16 ${module.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                {module.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-brand-600 transition-colors">
                {module.title[language]}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                {module.description[language]}
              </p>

              <div className="flex items-center justify-between mt-auto">
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{module.pages.length} Pages</span>
                 </div>
                 {isCompleted ? (
                   <span className="flex items-center gap-1 text-green-600 font-bold text-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      {t('completed')}
                   </span>
                 ) : (
                   <span className="text-brand-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Start →
                   </span>
                 )}
              </div>

              {isCompleted && (
                <div className="absolute top-4 right-4 text-green-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
