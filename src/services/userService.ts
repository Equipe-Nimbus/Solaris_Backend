import { User } from "../entity";
import { AppDataSource } from "../config/data-source";

export const criarUser = async (dadosUser: Partial<User>): Promise<User> => {
  const UserRepository = AppDataSource.getRepository(User);
  
  const novoUser = UserRepository.create(dadosUser);

  const UserSalvo = await UserRepository.save(novoUser);
  
  return UserSalvo;
};
