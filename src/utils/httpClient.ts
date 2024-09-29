import axios from "axios";

export const api = async (url: string): Promise<any> => {
  try {
    const resposta = await axios.get(url);
    return resposta.data;
  } catch (erro) {
    throw new Error("Erro na requisição: " + erro);
  }
};
