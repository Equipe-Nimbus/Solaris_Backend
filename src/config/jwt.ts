import jwt from "jsonwebtoken";
import { carregaEnv } from "../utils";

const secret = carregaEnv("JWT_SECRET");

if (!secret) {
  throw new Error("JWT_SECRET não definida no arquivo .env");
}

export const gerarToken = (id: number, nome: string): string => {
  return jwt.sign({ id, nome }, secret, { expiresIn: "1h" });
};

export const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (erro) {
    throw new Error("Token inválido ou expirado");
  }
};
