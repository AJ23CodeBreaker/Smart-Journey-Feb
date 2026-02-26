import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { QUESTIONS } from '../data/questions';
import { Level } from '../types';

export const Quiz = () => {
  const { level } = useParams();
  const { t, language } = useLanguage();
  const { updateXP } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Filter questions by level
  const questions = useMemo(() => {
    return QUESTIONS.filter(q => q.difficulty === level as Level);
  }, [level]);

  const handleAnswer = (idx: number) => {
    if (idx === questions[step].correctIndex) {
      setScore(s => s + 1);
    }
    
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      setFinished(true);
      // Calculate XP: 50 base + 20 per correct answer
      const xpGained = 50 + (score * 20);
      updateXP(xpGained);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-700">
        <div className="text-6xl mb-6">🚧</div>
        <h2 className="text-2xl font-bold mb-4">No Questions Yet</h2>
        <p className="text-slate-500 mb-8">We are still preparing the {level} level exam questions. Please check back later!</p>
        <button 
          onClick={() => navigate('/quiz')}
          className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition"
        >
          {t('backToModules')}
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-700">
        <div className="text-6xl mb-6">🎯</div>
        <h2 className="text-3xl font-bold mb-2">{t('completed')}!</h2>
        <p className="text-slate-500 mb-8">You scored {score} out of {questions.length}</p>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl mb-8">
           <p className="text-brand-700 dark:text-brand-300 font-bold">+{50 + (score * 20)} XP Earned!</p>
        </div>
        <button 
          onClick={() => navigate('/quiz')}
          className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition"
        >
          {t('backToModules')}
        </button>
      </div>
    );
  }

  const currentQ = questions[step];
  const content = currentQ.content[language];

  return (
    <div className="max-w-2xl mx-auto mt-12 space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border border-slate-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-8">
           <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold uppercase tracking-widest">{level} Exam</span>
           <span className="text-sm font-bold text-slate-400">Question {step + 1}/{questions.length}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
          {content.question}
        </h2>

        <div className="space-y-4">
          {content.options.map((opt: string, i: number) => (
            <button 
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all font-medium text-slate-700 dark:text-slate-200"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
