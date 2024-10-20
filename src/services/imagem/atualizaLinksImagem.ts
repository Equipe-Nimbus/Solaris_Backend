import { AppDataSource } from "../../config";
import { Imagem } from "../../entity";
import { getImageById } from "./getImageById";

export const atualizaLinksImagem = async (linkMascara: string, linkDownload: string, idImagem: string) => {
    const imagemRepositorio = AppDataSource.getRepository(Imagem);
    try {
        const imagemRecuperada = await getImageById(idImagem) as Imagem;
        if(imagemRecuperada.mascaras_imagem == null || imagemRecuperada.mascaras_imagem == undefined) {
            await imagemRepositorio.createQueryBuilder().
                    update(imagemRecuperada).
                    set({
                        mascaras_imagem: imagemRecuperada.mascaras_imagem,
                        links_download_imagem: imagemRecuperada.links_download_imagem,
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
