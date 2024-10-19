import { Imagem, Requisicao } from "../../entity";

export const montaObjetoImagem = (imagem: Imagem, id_imagem: string, linkImagem: string, bboxImagem: number[]): Imagem => {
    imagem.id_imagem = id_imagem;
    imagem.link_imagem = linkImagem;
    imagem.bbox_imagem = bboxImagem;
    return imagem;
}