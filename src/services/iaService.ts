import axios from 'axios';
import https from 'https';
import { Image } from '../types/image';
import { ResponseIA } from '../types/responseIA';

export const processarImagens = async (imagens: Image[]): Promise<ResponseIA | void> => {
  try {
    let linkImagens: string[] = [];
    imagens.forEach(async (imagem) => {
      if (imagem.mascara === undefined || imagem.mascara === null) {
        const agent = new https.Agent({  
          rejectUnauthorized: false
        });
        
        const response = await axios.get('https://demo9989392.mockable.io/gerarMascaraTiff', { httpsAgent: agent });
        const { download_links, pngs} = response.data;
        return { download_links, pngs};
        
      }
    });
    console.log(linkImagens.length);
    if (linkImagens.length > 0) {
    }
  } catch (error: any) {
    // Captura a mensagem de erro de forma mais clara
    throw new Error(`Erro ao processar imagens: ${error.message || error}`);
  }
};