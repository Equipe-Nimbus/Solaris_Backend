import { Request, Response } from "express";
import { getUserByEmail } from "../services/userService";
import { comparePassword } from "../utils";
import { gerarToken } from "../config/";
import { loginSchema } from "./validators";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({ erro: "Dados inválidos", detalhes: error.details });
    return;
  }

  const { email_user, senha_user } = req.body;

  try {
    const user = await getUserByEmail(email_user);
    
    if (!user) {
      res.status(401).json({ erro: "Credenciais inválidas" });
      return;
    }

    const isPasswordValid = await comparePassword(senha_user, user.senha_user);
    
    if (!isPasswordValid) {
      res.status(401).json({ erro: "Credenciais inválidas" });
      return;
    }

    const userId = parseInt(user.id_user, 10);
    const token = gerarToken(userId, user.nome_user);

    res.status(200).json({ token, id: userId, nome_user: user.nome_user });
  } catch (erro) {
    if (erro instanceof Error) {
      res.status(500).json({ erro: "Erro ao fazer login", detalhes: erro.message });
    } else {
      res.status(500).json({ erro: "Erro ao fazer login" });
    }
  }
};
