import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Robust Key Retrieval: Try loaded env first, fall back to process.env
  // This ensures Netlify's build environment variables are captured.
  const geminiApiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  const apiKey = env.API_KEY || process.env.API_KEY || geminiApiKey;

  return {
    plugins: [react()],
    define: {
      // Expose API Key via process.env.API_KEY as per guidelines
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey || apiKey),
      // Expose app version
      '__APP_VERSION__': JSON.stringify(packageJson.version),
    }
  }
})