import { User } from "../entity";
import { AppDataSource } from "../config/data-source";
import { tratarErroDuplicidade } from "../utils";

export const criarUser = async (dadosUser: Partial<User>): Promise<User> => {
  const UserRepository = AppDataSource.getRepository(User);

  const novoUser = UserRepository.create(dadosUser);

  try {
    const UserSalvo = await UserRepository.save(novoUser);
    return UserSalvo;
  } catch (erro) {
    const mensagemErro = tratarErroDuplicidade(erro, ['email', 'cpf']);
    throw new Error(mensagemErro);
  }
};
