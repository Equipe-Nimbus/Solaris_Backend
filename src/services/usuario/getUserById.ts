import { AppDataSource } from "../../config";
import { User } from "../../entity";

export const getUserById = async (idUsuario: string): Promise<User | null> => {
    const userRepositorio = AppDataSource.getRepository(User);
  
    const usuarioRecuperado = await userRepositorio.findOne({
        where: {
            id_user: idUsuario
        },
    })
  
    return usuarioRecuperado;
  }