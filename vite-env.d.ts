declare module "*.css";
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare const __APP_VERSION__: string;
// process.env is typed via @types/node, but this helps in some setups
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
  }
}