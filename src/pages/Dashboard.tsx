import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { DAILY_TIPS, LEVEL_THRESHOLDS } from '../constants';
import { Level } from '../types';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const nextLevel = user?.level === Level.GOLD ? null : (user?.level === Level.BRONZE ? Level.SILVER : Level.GOLD);
  const progress = nextLevel ? ((user?.xp || 0) / LEVEL_THRESHOLDS[nextLevel]) * 100 : 100;
  
  const [dailyTip, setDailyTip] = React.useState('');

  React.useEffect(() => {
    const tips = DAILY_TIPS[language];
    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
  }, [language]);

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {t('hi')}, {user.name}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">{t('welcomeMessage')}</p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
           <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('totalXp')}</div>
              <div className="text-2xl font-black text-brand-600">{user.xp}</div>
           </div>
           <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-2xl">
              ✨
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Level Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border border-slate-100 dark:border-slate-700 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                       {t('currentLevel')}
                    </span>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white">{user.level}</h2>
                 </div>
                 <div className="text-6xl">
                    {user.level === Level.BRONZE ? '🥉' : user.level === Level.SILVER ? '🥈' : '🥇'}
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between text-sm font-bold text-slate-500">
                    <span>{user.xp} XP</span>
                    <span>{nextLevel ? `${LEVEL_THRESHOLDS[nextLevel]} XP` : 'MAX'}</span>
                 </div>
                 <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-200 dark:border-slate-600">
                    <div 
                      className="h-full bg-brand-500 transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                 </div>
                 {nextLevel && (
                   <p className="text-xs text-slate-400 font-medium">
                     {LEVEL_THRESHOLDS[nextLevel] - user.xp} XP more to reach {nextLevel} Level
                   </p>
                 )}
              </div>
           </div>
           
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Daily Tip Card */}
        <div className="bg-brand-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group">
           <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-6">
                 💡
              </div>
              <h3 className="text-xl font-bold mb-4">{t('dailyTipLabel')}</h3>
              <p className="text-brand-50 text-lg leading-relaxed font-medium italic">
                "{dailyTip}"
              </p>
           </div>
           <div className="absolute bottom-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Link to="/learn" className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-500 transition shadow-sm hover:shadow-xl flex items-center gap-6">
            <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/40 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
               📚
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{t('continueLearning')}</h3>
               <p className="text-slate-500 dark:text-slate-400">{t('continueLearningDesc')}</p>
            </div>
         </Link>

         <Link to="/arcade" className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-500 transition shadow-sm hover:shadow-xl flex items-center gap-6">
            <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
               🎮
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{t('playSimulations')}</h3>
               <p className="text-slate-500 dark:text-slate-400">{t('playSimulationsDesc')}</p>
            </div>
         </Link>
      </div>
    </div>
  );
};
