import { Request, Response } from "express";
import { obterImagens, processarImagens } from "../services";

export const buscarImagens = async (req: Request, res: Response): Promise<void> => {
  const { bbox, datetime } = req.query;

  if (!bbox || !datetime) {
    res.status(400).json({ erro: "Os parâmetros bbox e datetime são obrigatórios." });
    return;
  }

  try {
    const imagens = await obterImagens(bbox as string, datetime as string);
    const imagensProcessadas = await processarImagens(imagens);
    res.status(200).json(imagensProcessadas);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar e processar as imagens." });
  }
};