import { Request, Response } from "express";
import { criarUser } from "../services/userService";

export const criarNovouser = async (req: Request, res: Response): Promise<void> => {
  const { nome_user, email_user, senha_user, cpf_user } = req.body;

  if (!nome_user || !email_user || !senha_user || !cpf_user) {
    res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    return;
  }

  try {
    const user = await criarUser({ nome_user, email_user, senha_user, cpf_user });
    res.status(201).json({ mensagem: "Usuário criado com sucesso", user });
  } catch (erro) {
    if (erro instanceof Error) {
      res.status(500).json({ erro: "Erro ao criar o usuário", detalhes: erro.message });
    }
  }
};