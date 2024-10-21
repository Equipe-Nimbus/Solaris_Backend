import dotenv from "dotenv";

dotenv.config();

export const carregaEnv = (chave: string): string | undefined => {
  return process.env[chave];
};
