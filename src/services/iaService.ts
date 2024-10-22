import axios from 'axios';
import { Image } from '../types/image';

export const processarImagens = async (imagens: Image[]): Promise<Image[] | void> => {

  try {
    const imagensProcessadas: Image[] = [];

    let contador = 0;    
    let links: string[] = [];
    imagens.forEach((imagem) => {
      if (imagem.mascara == undefined || imagem.mascara == null) {        
        imagensProcessadas.push(imagem);
        links.push(imagem.tiff);
      } else {
        imagensProcessadas.push(imagem);
      }
    });

    if(links.length > 0) {
      const response = await axios.post('http://localhost:8080/geraMascaraThumbnail', { links });
      console.log("response: ", response.data);

      const { download_links, pngs} = response.data;

      imagensProcessadas.forEach((imagem) => {
        if (imagem.mascara == null || imagem.mascara == undefined) {
          imagem.mascara = pngs[contador];
          imagem.download_links = download_links[contador];
  
          contador ++;
        } else {
          contador ++;
        } 
      })
    }
    return imagensProcessadas;
  } catch (error: any) {
    throw new Error(`Erro ao processar imagens: ${error.message || error}`);
  }
};