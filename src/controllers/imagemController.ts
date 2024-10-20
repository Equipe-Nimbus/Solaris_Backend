import { Request, Response } from "express";
import { getUserById, obterImagens, processarImagens } from "../services";
import { Image } from "../types/image";
import { criarRequisicao } from "../services/requisicao/criaRequisicao";
import { Requisicao } from "../entity";
import { atualizaMascaraImagem } from "../services/imagem/atualizaMascaraImagem";
import { atualizaStatusRequisicao } from "../services/requisicao/atualizaStatusRequisicao";

export const buscarImagens = async (req: Request, res: Response): Promise<void> => {
  const { bbox, datetime, id } = req.query;

  if (!bbox || !datetime || !id) {
    res.status(400).json({ erro: "Os parâmetros bbox, datetime e id são obrigatórios." });
    return;
  }

  const usuario = await getUserById(id as string);

  if (usuario == null) {
    throw new Error("Usuário não identificado")
  }

  const requisicao = await criarRequisicao(usuario, datetime as string);

  let imagens: Image[];
  try {
    imagens = await obterImagens(bbox as string, datetime as string, requisicao as Requisicao);
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
  if(imagensProcessadas != null) {
    imagens.forEach((imagem, index) => {
      imagem.mascara = imagensProcessadas[index];
      const mascara = imagem.mascara;
      atualizaMascaraImagem(mascara, imagem.id);      
    }
  )};

  atualizaStatusRequisicao(requisicao);
  
  res.status(200).json({
    imagens
  });
}