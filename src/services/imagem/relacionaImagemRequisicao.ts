import { AppDataSource } from "../../config";
import { Imagem, Requisicao } from "../../entity";

export const relacionaImagemRequisicao = async (imagem: Imagem, requisicao: Requisicao): Promise<void> => {
    const imagemRepositorio = AppDataSource.getRepository(Imagem);

    await imagemRepositorio.createQueryBuilder().
                relation(Imagem, "requisicoes").
                of(imagem).
                add(requisicao);
}