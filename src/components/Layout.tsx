import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Language } from '../types';
import { APP_VERSION } from '../constants';
import { Link, useLocation } from 'react-router-dom';

// Helper components moved outside to prevent re-creation on every render
const NavItem = ({ to, icon, label, isActive }: { to: string, icon: React.ReactNode, label: string, isActive: boolean }) => (
  <Link 
    to={to} 
    className={`group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 border-2 ${
      isActive 
        ? "bg-brand-100 dark:bg-brand-900/40 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-200 font-bold shadow-sm transform -translate-y-0.5" 
        : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
    }`}
  >
    <div className={`w-5 h-5 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-400 group-hover:text-brand-500"}`}>
      {icon}
    </div>
    <span className="font-medium">{label}</span>
  </Link>
);

const MobileNavItem = ({ to, icon, label, onClick, isActive }: { to: string, icon: React.ReactNode, label: string, onClick: () => void, isActive: boolean }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-bold border border-brand-100 dark:border-brand-800" 
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
    }`}
  >
    <div className={`w-6 h-6 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-400"}`}>
      {icon}
    </div>
    <span className="font-medium text-lg">{label}</span>
  </Link>
);

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { t, setLanguage, language } = useLanguage();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Mobile Menu Backdrop - Only visible when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Navigation Bar - Z-Index set to 100 to stay above everything */}
      <nav className="sticky top-0 z-[100] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-2 border-slate-100 dark:border-slate-800 transition-colors duration-300 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
                <div className="w-12 h-12 bg-brand-500 rounded-xl rotate-3 flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform duration-300 border-2 border-brand-600">
                  <span className="text-2xl">🎓</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-hand font-bold text-slate-800 dark:text-white tracking-wide leading-none">$mart Journey</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">Business Department - IVE (Haking Wong)</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {user ? (
                <>
                  <NavItem to="/dashboard" isActive={isActive('/dashboard')} label={t('home')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504 1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>} />
                  <NavItem to="/learn" isActive={isActive('/learn')} label={t('learn')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>} />
                  <NavItem to="/arcade" isActive={isActive('/arcade')} label={t('games')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>} />
                  <NavItem to="/quiz" isActive={isActive('/quiz')} label={t('exam')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>} />
                  <NavItem to="/advisor" isActive={isActive('/advisor')} label={t('askAi')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>} />
                  
                  <Link to="/profile" className="ml-2 pl-2 flex items-center gap-2 group">
                     <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-200 font-black text-sm flex items-center justify-center border-2 border-brand-200 dark:border-brand-700 group-hover:scale-110 transition-transform">
                        {user.name.charAt(0)}
                     </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 font-bold px-4 py-2">{t('login')}</Link>
                  <Link to="/register" className="bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-700 transition shadow-paper hover:shadow-lg border-2 border-brand-700">{t('register')}</Link>
                </>
              )}
              
              <div className="flex items-center space-x-2 ml-4 border-l border-slate-200 pl-4">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                    </svg>
                  )}
                </button>
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="bg-transparent text-xs font-bold text-slate-500 hover:text-brand-600 cursor-pointer outline-none">
                  <option value={Language.EN}>Eng</option>
                  <option value={Language.ZH_HK}>繁體</option>
                  <option value={Language.ZH_CN}>简体</option>
                </select>
              </div>
            </div>

            {/* Mobile Menu Button - Z-index high, increased hit area */}
            <div className="flex items-center md:hidden">
               <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="p-3 -mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-200 cursor-pointer relative z-[101]"
                  aria-label="Toggle menu"
               >
                  {isMenuOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  ) : (
                     <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                     </svg>
                  )}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown - FIXED POSITION to prevent cutoff */}
        {isMenuOpen && (
           <div className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-800 shadow-2xl animate-fade-in flex flex-col overflow-y-auto z-[100]">
              <div className="px-4 py-6 space-y-2 pb-20">
                 {user ? (
                   <>
                     {/* Mobile User Info */}
                     <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-black text-sm flex items-center justify-center border-2 border-brand-200 dark:border-brand-700">
                           {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
                           <span className="text-xs text-slate-500">{user.email}</span>
                        </div>
                     </div>

                     <MobileNavItem 
                        to="/dashboard" 
                        isActive={isActive('/dashboard')}
                        label={t('home')} 
                        onClick={() => setIsMenuOpen(false)}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504 1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>}
                     />
                     <MobileNavItem 
                        to="/learn" 
                        isActive={isActive('/learn')}
                        label={t('learn')} 
                        onClick={() => setIsMenuOpen(false)}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>} 
                     />
                     <MobileNavItem 
                        to="/arcade" 
                        isActive={isActive('/arcade')}
                        label={t('games')} 
                        onClick={() => setIsMenuOpen(false)}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>} 
                     />
                     <MobileNavItem 
                        to="/quiz" 
                        isActive={isActive('/quiz')}
                        label={t('exam')} 
                        onClick={() => setIsMenuOpen(false)}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>} 
                     />
                     <MobileNavItem 
                        to="/advisor" 
                        isActive={isActive('/advisor')}
                        label={t('askAi')} 
                        onClick={() => setIsMenuOpen(false)}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>} 
                     />
                     <MobileNavItem 
                        to="/profile" 
                        isActive={isActive('/profile')}
                        label={t('profile')} 
                        onClick={() => setIsMenuOpen(false)}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
                     />
                     
                     <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl font-bold border border-red-100 dark:border-red-900/50">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                           </svg>
                           {t('logout')}
                        </button>
                     </div>
                   </>
                 ) : (
                   <div className="flex flex-col gap-3">
                     <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-white">{t('login')}</Link>
                     <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 rounded-xl bg-brand-600 text-white font-bold">{t('register')}</Link>
                   </div>
                 )}

                 {/* Mobile Language Selector */}
                 <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4 px-2">
                       <span className="text-sm font-bold text-slate-500">Theme</span>
                       <button 
                          onClick={toggleTheme}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700"
                       >
                          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                       </button>
                    </div>
                    <div className="flex justify-center gap-2">
                      <button onClick={() => setLanguage(Language.EN)} className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${language === Language.EN ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-slate-50 border-transparent text-slate-500'}`}>English</button>
                      <button onClick={() => setLanguage(Language.ZH_HK)} className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${language === Language.ZH_HK ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-slate-50 border-transparent text-slate-500'}`}>繁體</button>
                      <button onClick={() => setLanguage(Language.ZH_CN)} className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${language === Language.ZH_CN ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-slate-50 border-transparent text-slate-500'}`}>简体</button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </nav>
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
        <div className="fixed bottom-2 right-2 text-[10px] text-slate-300 dark:text-slate-700 font-mono pointer-events-none z-0">
           v{APP_VERSION}
        </div>
      </main>
    </div>
  );
};