import { Imagem } from "../../entity";

export const montaObjetoImagem = (imagem: Imagem, id_imagem: string, linkImagemTiff: string, linkImagemThumbnail: string, bboxImagem: number[]): Imagem => {
    imagem.id_imagem = id_imagem;
    imagem.link_imagem_tiff = linkImagemTiff;
    imagem.link_imagem_thumbnail = linkImagemThumbnail;
    imagem.bbox_imagem = bboxImagem;
    return imagem;
}