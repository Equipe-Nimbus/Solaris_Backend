import { Request, Response } from "express";
import { criarUser } from "../services/userService";
import { userSchema } from "./validators";
import { hashPassword } from '../utils';

export const criarNovouser = async (req: Request, res: Response): Promise<void> => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({ erro: "Dados inválidos", detalhes: error.details });
    return;
  }

  const { nome_user, email_user, senha_user, cpf_user } = req.body;

  try {
    const hashedPassword = await hashPassword(senha_user);
    const user = await criarUser({ nome_user, email_user, senha_user: hashedPassword, cpf_user });
    res.status(201).json({ mensagem: "Usuário criado com sucesso", user });
  } catch (erro) {
    if (erro instanceof Error) {
      res.status(500).json({ erro: "Erro ao criar o usuário", detalhes: erro.message });
    }
  }
};