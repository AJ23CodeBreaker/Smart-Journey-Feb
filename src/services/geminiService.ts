import { QuizQuestion, Level, Language, ChatMessage } from "../types";
import { QUESTIONS } from "../data/questions";
import { GoogleGenAI } from "@google/genai";

// Shuffle array helper
const shuffle = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const getGameSessionQuestions = (level: Level, count: number = 10): QuizQuestion[] => {
  // Filter questions by level
  const pool = QUESTIONS.filter((q: QuizQuestion) => q.difficulty === level);
  
  // Shuffle and take 'count'
  const shuffled = shuffle([...pool]);
  return shuffled.slice(0, count);
};

// Generate Detailed Teaching Note
export const generateTeachingNote = async (
  topic: string,
  moduleTitle: string,
  language: Language
): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) return "";

    const ai = new GoogleGenAI({ apiKey });
    const model = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are Dr. $mart, an expert financial educator for Hong Kong tertiary students.
        Generate a detailed "Teaching Note" for the topic: "${topic}" within the module "${moduleTitle}".
        
        Requirements:
        1. Length: At least 400 words.
        2. Style: Educational, professional yet accessible, like a university lecture note.
        3. Context: Specifically for Hong Kong students (mention HK examples like Octopus, MPF, local banks, TSFS/NLSPS loans, etc.)
        4. Structure:
           - Introduction to the concept.
           - Key Principles/Mechanics.
           - Practical Examples in HK.
           - Common Pitfalls for Students.
           - Summary/Actionable Advice.
        5. Language: ${language === Language.EN ? 'English' : language === Language.ZH_HK ? 'Traditional Chinese (繁體中文)' : 'Simplified Chinese (简体中文)'}.
        6. Format: Use Markdown (headers, bold text, lists).
      `
    });

    const response = await model;
    return response.text || "";
  } catch (error) {
    console.error("Teaching Note Error:", error);
    return "";
  }
};

// Dr. $mart AI Advisor
export const getAiAdvisorResponse = async (
  history: ChatMessage[], 
  language: Language
): Promise<string> => {
  try {
    // API Key Handling
    // The API key must be obtained exclusively from the environment variable process.env.GEMINI_API_KEY.
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    // --- DEBUG LOG ---
    console.log(`[Gemini Service] API Key Status: ${apiKey ? 'Present' : 'Missing'}`);
    // -----------------

    if (!apiKey) {
      return language === Language.EN 
        ? "I am currently offline. Please ensure the GEMINI_API_KEY is set in the environment." 
        : "我暫時離線。請確保環境中已設置 GEMINI_API_KEY。";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // 1. Prepare History
    // We must exclude the *last* message from history, because we send it as the new trigger message.
    // Also, map 'assistant' role to 'model' for Gemini.
    const pastMessages = history.slice(0, -1);
    const currentMessage = history[history.length - 1];

    const formattedHistory = pastMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // 2. Define Persona
    const systemPrompt = `
      You are Dr. $mart, a friendly and knowledgeable financial advisor specifically for tertiary students in Hong Kong.
      Your goal is to help students manage money, understand student loans (TSFS/NLSPS), MPF, savings, and basic investing.
      
      Guidelines:
      1. Keep your answers concise (under 80 words) and encouraging.
      2. Use specific Hong Kong terminology (e.g., "Octopus card", "MPF", "Grant/Loan").
      3. If the user speaks English, reply in English.
      4. If the user speaks Chinese, reply in Traditional Chinese.
      5. Do not give financial advice on specific stocks.
    `;

    // 3. Create Chat Session (The robust way)
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemPrompt,
      },
      history: formattedHistory
    });

    // 4. Send the new message
    const result = await chat.sendMessage({ message: currentMessage.text });
    return result.text || (language === Language.EN ? "I'm thinking..." : "我在思考中...");

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return language === Language.EN 
      ? "I'm having trouble connecting to the server. Please try again."
      : "連線錯誤，請重試。";
  }
};