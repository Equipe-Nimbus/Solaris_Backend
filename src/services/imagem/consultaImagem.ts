import { AppDataSource } from "../../config";
import { Imagem } from "../../entity";

export const consultaImagem = async (idImagem: string): Promise<boolean> =>  {
    const imageRepositorio = AppDataSource.getRepository(Imagem);
   
    const imagemRecuperada = await imageRepositorio.findOne({
        where: {
            id_imagem: idImagem,
        },
    });

    return imagemRecuperada !== null;
    
};