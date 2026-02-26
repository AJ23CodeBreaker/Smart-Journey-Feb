import { QuizQuestion, Language, Level } from '../types';

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    moduleId: 'm1',
    correctIndex: 0,
    difficulty: Level.BRONZE,
    content: {
      [Language.EN]: {
        question: "What is the 50/30/20 rule?",
        options: ["50% Needs, 30% Wants, 20% Savings", "50% Savings, 30% Needs, 20% Wants", "50% Wants, 30% Savings, 20% Needs", "50% Debt, 30% Needs, 20% Wants"],
        explanation: "The 50/30/20 rule allocates 50% to needs, 30% to wants, and 20% to savings or debt repayment.",
        category: "Budgeting"
      },
      [Language.ZH_HK]: {
        question: "什麼是50/30/20儲蓄法則？",
        options: ["50%必需開支, 30%想要開支, 20%儲蓄", "50%儲蓄, 30%必需開支, 20%想要開支", "50%想要開支, 30%儲蓄, 20%必需開支", "50%債務, 30%必需開支, 20%想要開支"],
        explanation: "50/30/20法則建議將50%收入用於必需品，30%用於想要的東西，20%用於儲蓄或還債。",
        category: "預算管理"
      },
      [Language.ZH_CN]: {
        question: "什么是50/30/20储蓄法则？",
        options: ["50%必需开支, 30%想要开支, 20%储蓄", "50%储蓄, 30%必需开支, 20%想要开支", "50%想要开支, 30%储蓄, 20%必需开支", "50%债务, 30%必需开支, 20%想要开支"],
        explanation: "50/30/20法则建议将50%收入用于必需品，30%用于想要的东西，20%用于储蓄或还债。",
        category: "预算管理"
      }
    }
  },
  {
    id: 'q2',
    moduleId: 'm2',
    correctIndex: 1,
    difficulty: Level.BRONZE,
    content: {
      [Language.EN]: {
        question: "What does the 'S' in SMART goals stand for?",
        options: ["Simple", "Specific", "Saving", "Standard"],
        explanation: "SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound.",
        category: "Goal Setting"
      },
      [Language.ZH_HK]: {
        question: "SMART目標中的'S'代表什麼？",
        options: ["簡單 (Simple)", "具體 (Specific)", "儲蓄 (Saving)", "標準 (Standard)"],
        explanation: "SMART代表具體、可衡量、可達成、相關性及有時限。",
        category: "目標設定"
      },
      [Language.ZH_CN]: {
        question: "SMART目标中的'S'代表什么？",
        options: ["简单 (Simple)", "具体 (Specific)", "储蓄 (Saving)", "标准 (Standard)"],
        explanation: "SMART代表具体、可衡量、可达成、相关性及有时限。",
        category: "目标设定"
      }
    }
  }
];
