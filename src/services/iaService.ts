import axios from 'axios';
import https from 'https';
import { Image } from '../types/image';

export const processarImagens = async (imagens: Image[]): Promise<Image[] | void> => {

  try {
    const imagensProcessadas: Image[] = [];

    let contador = 0;    
    let linksTiff: string[] = [];
    imagens.forEach((imagem) => {
      if (imagem.mascara == undefined || imagem.mascara == null) {        
        imagensProcessadas.push(imagem);
        linksTiff.push(imagem.tiff);
        contador ++;
      } else {
        imagensProcessadas.push(imagem);
        contador++;
      }
    });

    const response = await axios.post('http://localhost:8080/geraMascaraThumbnail', { linksTiff });

    const { download_links, pngs} = response.data;

    contador = 0;
    imagensProcessadas.forEach((imagem) => {
      if (imagem.mascara == null || imagem.mascara == undefined) {
        imagem.mascara = pngs[contador];
        imagem.download_links = download_links[contador];

        contador ++;
      } contador ++;
    })

    return imagensProcessadas;
  } catch (error: any) {
    throw new Error(`Erro ao processar imagens: ${error.message || error}`);
  }
};