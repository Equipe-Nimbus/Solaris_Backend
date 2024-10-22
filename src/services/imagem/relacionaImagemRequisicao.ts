import { AppDataSource } from "../../config";
import { Imagem, Requisicao } from "../../entity";
import { getImageById } from "./getImageById";

export const relacionaImagemRequisicao = async (imagemId: string, requisicao: Requisicao): Promise<void> => {
    const imagemRepositorio = AppDataSource.getRepository(Imagem);

    const imagemRecuperada = await getImageById(imagemId);

    console.log(imagemRecuperada);

    await imagemRepositorio.createQueryBuilder().
                relation(Requisicao, "imagens").
                of(requisicao).
                add(imagemRecuperada);
}