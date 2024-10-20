import { AppDataSource } from "../../config";
import { Imagem, Requisicao } from "../../entity";
import { montaObjetoImagem } from "./montaObjetoImagem";

export const criarImagem = async (idImagem: string, bboxImagem: number[], linkImagemTiff: string, linkImagemThumbnail: string, requisicao: Requisicao): Promise<void> => {
    let imagem = new Imagem();
    imagem = montaObjetoImagem(imagem, idImagem, linkImagemTiff,linkImagemThumbnail ,bboxImagem);

    try {
        const imagemRepositorio = AppDataSource.getRepository(Imagem);
        await imagemRepositorio.save(imagem);
        await imagemRepositorio.createQueryBuilder().
            relation(Imagem, "requisicoes").
            of(imagem).
            add(requisicao);
    } catch (error) {
        console.log(error);
    };
}