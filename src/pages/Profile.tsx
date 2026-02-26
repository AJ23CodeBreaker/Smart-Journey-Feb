import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-black text-4xl flex items-center justify-center border-4 border-brand-200 dark:border-brand-700 shadow-lg">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{user.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-4">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">{t('currentLevel')}</span>
               <span className="font-bold text-brand-600">{user.level}</span>
            </div>
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">{t('xp')}</span>
               <span className="font-bold text-brand-600">{user.xp}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={logout}
          className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-8 py-3 rounded-xl font-bold border border-red-100 dark:border-red-900/50 hover:bg-red-100 transition"
        >
          {t('logout')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>🏆</span> Achievements
          </h2>
          <div className="space-y-4">
             {user.completedModules.length === 0 ? (
               <p className="text-slate-500 italic">No achievements yet. Start learning to earn badges!</p>
             ) : (
               <div className="grid grid-cols-4 gap-4">
                  {user.completedModules.map(mId => (
                    <div key={mId} className="aspect-square bg-brand-50 dark:bg-brand-900/40 rounded-2xl flex items-center justify-center text-2xl border border-brand-100 dark:border-brand-800" title={mId}>
                       🏅
                    </div>
                  ))}
               </div>
             )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>📜</span> {t('certificates')}
          </h2>
          <div className="space-y-4">
            {user.certificates.length === 0 ? (
              <p className="text-slate-500 italic">Complete the final exam for each level to earn certificates.</p>
            ) : (
              user.certificates.map(cert => (
                <div key={cert.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                   <div>
                      <div className="font-bold text-slate-800 dark:text-white">{cert.level} Proficiency</div>
                      <div className="text-xs text-slate-500">{cert.dateEarned}</div>
                   </div>
                   <button className="text-brand-600 font-bold text-sm">View</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
