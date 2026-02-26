import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const CertificateView = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      <header>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">My Certificates</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Your earned credentials for financial literacy.</p>
      </header>

      {user.certificates.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
           <div className="text-6xl mb-6">🎓</div>
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">No Certificates Yet</h2>
           <p className="text-slate-500 max-w-md mx-auto">
             Complete the final exam for Bronze, Silver, or Gold levels to earn your official $mart Journey certificate.
           </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {user.certificates.map(cert => (
             <div key={cert.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-paper border-2 border-brand-100 dark:border-brand-900/30 relative overflow-hidden">
                <div className="relative z-10">
                   <div className="text-4xl mb-4">📜</div>
                   <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{cert.level} Proficiency</h3>
                   <p className="text-slate-500 text-sm mb-6">Earned on {cert.dateEarned}</p>
                   <button className="bg-brand-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-brand-700 transition">
                      Download PDF
                   </button>
                </div>
                {/* Background Seal */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-500/10 rounded-full flex items-center justify-center text-6xl rotate-12">
                   🎖️
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};
