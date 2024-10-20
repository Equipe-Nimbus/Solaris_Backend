import axios from 'axios';
import { Image } from '../types/image';

export const processarImagens = async (imagens: Image[]): Promise<string[] | void> => {
  try {
    let linkImagens: string[] = [];
    imagens.forEach((imagem) => {
      if (imagem.mascara === undefined || imagem.mascara === null) {
        linkImagens.push(imagem.thumbnail);
      }
    });
    if (linkImagens.length != 0) {
      const response = await axios.post('http://localhost:8080/geraMascaraThumbnail', { links: linkImagens });
      // Mudar a lógica do recebimento da IA;
      return response.data.svgs;
    }
  } catch (error) {
    throw new Error('Erro ao processar as imagens.');
  }
};