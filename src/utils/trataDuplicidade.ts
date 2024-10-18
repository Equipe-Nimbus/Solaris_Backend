import { QueryFailedError } from "typeorm";

export const tratarErroDuplicidade = (erro: any, camposUnique: string[]): string => {
  if (erro instanceof QueryFailedError && erro.driverError.code === '23505') {
    const detalheErro = erro.driverError.detail;

    for (const campo of camposUnique) {
      if (detalheErro.includes(campo)) {
        return `Esse ${campo} já está cadastrado.`;
      }
    }
  }

  return 'Erro ao salvar os dados.';
};
