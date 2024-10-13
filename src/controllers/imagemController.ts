import { Request, Response } from "express";
import { obterImagens, processarImagens, combinarImagens } from "../services";

export const buscarImagens = async (req: Request, res: Response): Promise<void> => {
  const { bbox, datetime } = req.query;

  if (!bbox || !datetime) {
    res.status(400).json({ erro: "Os parâmetros bbox e datetime são obrigatórios." });
    return;
  }

  let imagens;
  try {
    imagens = await obterImagens(bbox as string, datetime as string);
    console.log("links: ", imagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao obter as imagens." });
    return;
  }

  let imagensProcessadas;
  try {
    imagensProcessadas = await processarImagens(imagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao processar as imagens." });
    return;
  }

  const imagensCombinadas = combinarImagens(imagens, imagensProcessadas);

  res.status(200).json({
    imagens: imagensCombinadas
  });
};