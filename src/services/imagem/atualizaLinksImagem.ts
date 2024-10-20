import { AppDataSource } from "../../config";
import { Imagem } from "../../entity";
import { getImageById } from "./getImageById";

export const atualizaLinksImagem = async (linkMascara: string, linkDownload: string, idImagem: string): Promise<void> => {
    const imagemRepositorio = AppDataSource.getRepository(Imagem);
    try {
        const imagemRecuperada = await getImageById(idImagem) as Imagem;
        if(imagemRecuperada.mascaras_imagem == null || imagemRecuperada.mascaras_imagem == undefined) {
            await imagemRepositorio.createQueryBuilder().
                    update(imagemRecuperada).
                    set({
                        mascaras_imagem: linkMascara,
                        links_download_imagem: linkDownload,
                    }).
                    where(
                        "id_imagem = :id", {id: imagemRecuperada.id_imagem} 
                    ).
                    execute();          
        }
    } catch (error) {
        console.log(`Descrição do erro: ${error}`)
    } 
}
