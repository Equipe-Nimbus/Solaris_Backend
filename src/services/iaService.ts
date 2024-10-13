import axios from 'axios';
import { Image } from '../types/image';

export const processarImagens = async (imagens: Image[]): Promise<string[]> => {
  try {
    const links = imagens.map((imagem) => imagem.thumbnail);
    
    const response = await axios.post('http://localhost:8080/geraMascaraThumbnail', { links });
    return response.data.svgs;
  } catch (error) {
    throw new Error('Erro ao processar as imagens.');
  }
};