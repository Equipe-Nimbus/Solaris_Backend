import { AppDataSource } from "../../config";
import { Imagem } from "../../entity";

export const getImageById = async (idImagem: string): Promise<Imagem | null> =>  {
    const imageRepositorio = AppDataSource.getRepository(Imagem);
   
    const imagemRecuperada = await imageRepositorio.findOne({
        where: {
            id_imagem: idImagem,
        },
    });

    return imagemRecuperada;
    
};