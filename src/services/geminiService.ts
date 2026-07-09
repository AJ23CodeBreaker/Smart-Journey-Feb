import { QuizQuestion, Level, Language, ChatMessage } from "../types";
import { QUESTIONS } from "../data/questions";
import { AI_API_BASE_URL, AI_MODEL } from "../constants";

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

// Calls APIYI's OpenAI-compatible chat completions endpoint.
const callAiChat = async (systemPrompt: string, messages: { role: string; content: string }[]): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error('missing_api_key');

  const response = await fetch(`${AI_API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
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

    const systemPrompt = "You are Dr. $mart, an expert financial educator for Hong Kong tertiary students.";
    const userPrompt = `
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
    `;

    return await callAiChat(systemPrompt, [{ role: 'user', content: userPrompt }]);
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
    console.log(`[AI Service] API Key Status: ${apiKey ? 'Present' : 'Missing'}`);
    // -----------------

    if (!apiKey) {
      return language === Language.EN
        ? "I am currently offline. Please ensure the GEMINI_API_KEY is set in the environment."
        : "我暫時離線。請確保環境中已設置 GEMINI_API_KEY。";
    }

    const languageInstruction = language === Language.EN
      ? 'Reply in English.'
      : language === Language.ZH_HK
        ? 'Reply in Traditional Chinese (繁體中文), using Hong Kong terminology and phrasing.'
        : 'Reply in Simplified Chinese (简体中文).';

    const systemPrompt = `
      You are Dr. $mart, a warm, encouraging financial mentor speaking directly to a tertiary student in Hong Kong, the way a favorite teacher would explain things face to face.
      Your goal is to help students manage money, understand student loans (TSFS/NLSPS), MPF, savings, and basic investing.

      Guidelines:
      1. Keep your answers concise (under 80 words), in flowing natural spoken sentences — not a list of facts.
      2. Never use markdown syntax such as **, ##, bullet points ("-"), or numbered lists. Write plain prose only, as if speaking aloud.
      3. Use specific Hong Kong terminology (e.g., "Octopus card", "MPF", "Grant/Loan").
      4. ${languageInstruction}
      5. Do not give financial advice on specific stocks.
    `;

    const messages = history.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.text,
    }));

    const text = await callAiChat(systemPrompt, messages);
    return text || (language === Language.EN ? "I'm thinking..." : "我在思考中...");

  } catch (error) {
    console.error("AI Advisor Error:", error);
    return language === Language.EN
      ? "I'm having trouble connecting to the server. Please try again."
      : "連線錯誤，請重試。";
  }
};
