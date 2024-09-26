import { Request, Response } from "express";
import { obterImagens } from "../services";

export const buscarImagens = async (req: Request, res: Response): Promise<void> => {
  const { bbox, datetime } = req.query;

  if (!bbox || !datetime) {
    res.status(400).json({ erro: "Os parâmetros bbox e datetime são obrigatórios." });
    return;
  }

  try {
    const imagens = await obterImagens(bbox as string, datetime as string);
    res.status(200).json(imagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar as imagens." });
  }
};
