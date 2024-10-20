import { Request, Response } from "express";
import { atualizaLinksImagem, getUserById, obterImagens, processarImagens, relacionaImagemRequisicao } from "../services";
import { Image } from "../types/image";
import { criarRequisicao } from "../services/requisicao/criaRequisicao";
import { Requisicao } from "../entity";
import { atualizaStatusRequisicao } from "../services/requisicao/atualizaStatusRequisicao";

export const buscarImagens = async (req: Request, res: Response): Promise<void> => {
  const { bbox, datetime, id } = req.query;

  if (!bbox || !datetime || !id) {
    res.status(400).json({ erro: "Os parâmetros bbox, datetime e id são obrigatórios." });
    return;
  }

  const idUsuario = Number(id);
  const usuario = await getUserById(idUsuario);

  if (usuario == null) {
    throw new Error("Usuário não identificado")
  }

  const requisicao = await criarRequisicao(usuario, datetime as string, bbox as string);

  let imagens: Image[];
  try {
    imagens = await obterImagens(bbox as string, datetime as string, requisicao as Requisicao) as Image[];
    console.log("links: ", imagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao obter as imagens." });
    return;
  }

  let listaImagemProcessadas: Image[];
  try {
    listaImagemProcessadas = await processarImagens(imagens) as Image[];
  } catch (erro) {
    res.status(500).json({ erro });
    return;
  }

  try {
    listaImagemProcessadas.forEach(async(imagemProcessada) => {
      await atualizaLinksImagem(imagemProcessada.mascara as string, imagemProcessada.download_links as string, imagemProcessada.id);
      await relacionaImagemRequisicao(imagemProcessada.id, requisicao);
    })
  } catch (error) {
    
  } 

  atualizaStatusRequisicao(requisicao);

  res.status(200).json({
    imagens: listaImagemProcessadas
  });
}

