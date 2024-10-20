import { AppDataSource } from "../../config";
import { Imagem } from "../../entity";
import { Image } from "../../types/image";
import { getImageById } from "./getImageById";

export const atualizaMascaraImagem = async (mascara: string, idImagem: string) => {
    const imagemRepositorio = AppDataSource.getRepository(Imagem);
    try {
        const imagemRecuperada = await getImageById(idImagem) as Imagem;
        if(imagemRecuperada.mascaras_imagem !== null) {
            const mascarasImagemRecuperada: string[] = imagemRecuperada.mascaras_imagem;
    
            mascarasImagemRecuperada.push(mascara);
            await imagemRepositorio.createQueryBuilder().
                update(imagemRecuperada).
                set({
                    mascaras_imagem: mascarasImagemRecuperada,
                }).
                where(
                    "id_imagem = :id", {id: imagemRecuperada.id_imagem} 
                ).
                execute();
        }
        const listaMascara: string[] = [];
        listaMascara.push(mascara);
        await imagemRepositorio.createQueryBuilder().
                update(imagemRecuperada).
                set({
                    mascaras_imagem: listaMascara,
                }).
                where(
                    "id_imagem = :id", {id: imagemRecuperada.id_imagem} 
                ).
                execute();

    } catch (error) {
        console.log(`Descrição do erro: ${error}`)
    } 
}
