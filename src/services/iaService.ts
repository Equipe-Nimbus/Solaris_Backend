import axios from 'axios';

export const processarImagens = async (links: string[]): Promise<string[]> => {
  try {
    const response = await axios.post('http://localhost:8080/geraMascaraThumbnail', { links });
    return response.data.svgs;
  } catch (error) {
    throw new Error('Erro ao processar as imagens.');
  }
};