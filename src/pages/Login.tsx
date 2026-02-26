import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login(email, email.split('@')[0]);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{t('login')}</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">{t('loginSubtitle')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('email')}</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-brand-500 outline-none transition"
            placeholder="student@ive.edu.hk"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('password')}</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-brand-500 outline-none transition"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition shadow-lg">
          {t('login')}
        </button>
      </form>
      
      <p className="mt-8 text-center text-slate-500 dark:text-slate-400">
        Don't have an account? <Link to="/register" className="text-brand-600 font-bold hover:underline">{t('register')}</Link>
      </p>
    </div>
  );
};
