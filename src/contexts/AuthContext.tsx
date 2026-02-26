import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Level } from '../types';
import { LEVEL_THRESHOLDS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  updateXP: (amount: number) => void;
  completeModule: (moduleId: string) => void;
  register: (email: string, name: string) => string; // returns temp password
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email: string, name: string) => {
    // Mock login - in real app would verify password
    const newUser: User = {
      email,
      name,
      passwordHash: 'mock_hash',
      xp: 0,
      level: Level.BRONZE,
      streak: 1,
      completedModules: [],
      certificates: []
    };
    setUser(newUser);
  };

  const register = () => {
    const tempPassword = Math.random().toString(36).slice(-8);
    // In real app, we'd save to DB. Here we just return temp password.
    return tempPassword;
  };

  const logout = () => {
    setUser(null);
  };

  const calculateLevel = (xp: number): Level => {
    if (xp >= LEVEL_THRESHOLDS[Level.GOLD]) return Level.GOLD;
    if (xp >= LEVEL_THRESHOLDS[Level.SILVER]) return Level.SILVER;
    return Level.BRONZE;
  };

  const updateXP = (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = calculateLevel(newXP);
    
    setUser({
      ...user,
      xp: newXP,
      level: newLevel
    });
  };

  const completeModule = (moduleId: string) => {
    if (!user || user.completedModules.includes(moduleId)) return;
    
    const newCompleted = [...user.completedModules, moduleId];
    const xpGain = 50; // XP for completing a module
    const newXP = user.xp + xpGain;
    const newLevel = calculateLevel(newXP);

    setUser({
      ...user,
      completedModules: newCompleted,
      xp: newXP,
      level: newLevel
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateXP, completeModule, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
