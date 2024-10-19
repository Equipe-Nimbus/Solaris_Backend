import { Request, Response } from "express";
import { obterImagens, processarImagens } from "../services";
import { Image } from "../types/image";

export const buscarImagens = async (req: Request, res: Response): Promise<void> => {
  const { bbox, datetime, id } = req.query;

  if (!bbox || !datetime || !id) {
    res.status(400).json({ erro: "Os parâmetros bbox, datetime e id são obrigatórios." });
    return;
  }

  let imagens: Image[];
  try {
    imagens = await obterImagens(bbox as string, datetime as string, id as string);
    console.log("links: ", imagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao obter as imagens." });
    return;
  }

  /* let imagensProcessadas;
  try {
    imagensProcessadas = await processarImagens(imagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao processar as imagens." });
    return;
  }

  imagens.forEach((imagem, index) => {
    imagem.mascara = imagensProcessadas[index];
  }) */

  await res.status(200).json({
    imagens
  });
};