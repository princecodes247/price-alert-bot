import dotenv from "dotenv";
dotenv.config();

function getEnv(variable: string, optional: boolean = false) {
  if (process.env[variable] === undefined) {
    if (optional) {
      console.warn(
        `[@env]: Environmental variable for ${variable} is not supplied. \n So a default value will be generated for you.`
      );
    } else {
      throw new Error(
        `You must create an environment variable for ${variable}`
      );
    }
  }

  return process.env[variable]?.replace(/\\n/gm, "\n");
}

//environments
export const env = {
  isDev: String(process.env.NODE_ENV).toLowerCase().includes("dev"),
  isTest: String(process.env.NODE_ENV).toLowerCase().includes("test"),
  isProd: String(process.env.NODE_ENV).toLowerCase().includes("prod"),
  isStaging: String(process.env.NODE_ENV).toLowerCase().includes("staging"),
  env: process.env.NODE_ENV,
};

export const PORT = getEnv("PORT")!;
export const DATABASE_URL = getEnv("DATABASE_URL")!;
export const JWT_SECRET_KEY = getEnv("JWT_SECRET_KEY")!;
export const TELEGRAM_TOKEN = getEnv("TELEGRAM_TOKEN")!;
// export const STORAGE_KEY = getEnv("STORAGE_KEY")!;
