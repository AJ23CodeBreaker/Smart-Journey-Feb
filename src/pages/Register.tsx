import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [tempPass, setTempPass] = useState('');
  const { register } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pass = register(email, name);
    setTempPass(pass);
  };

  if (tempPass) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">{t('registerSuccess')}</h2>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl font-mono text-2xl font-bold my-6 border-2 border-dashed border-green-300">
          {tempPass}
        </div>
        <p className="text-green-700 dark:text-green-400 mb-8">{t('registerNote')}</p>
        <Link to="/login" className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{t('register')}</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">{t('registerSubtitle')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('name')}</label>
          <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-brand-500 outline-none transition"
            placeholder="Your Name"
          />
        </div>
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
        <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition shadow-lg">
          {t('register')}
        </button>
      </form>
      
      <p className="mt-8 text-center text-slate-500 dark:text-slate-400">
        Already have an account? <Link to="/login" className="text-brand-600 font-bold hover:underline">{t('login')}</Link>
      </p>
    </div>
  );
};
