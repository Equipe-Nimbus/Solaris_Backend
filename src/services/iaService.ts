import axios from "axios";
import { Imagem } from "../entity";
import { Image } from "../types/image";
import { getImageById } from "./imagemService";


export const processarImagem = async(imagens: Image[]): Promise<Image[]> => {
    try {
        const imagensProcessadas: Image[] = [];     
        const links: string[] = [];
        let contador: number = 0;

        await Promise.all(imagens.map(async (imagem: Image) => {
            const imagemSalva = await getImageById(imagem.id) as Imagem;
            if(imagemSalva) {
              if(imagemSalva.mascaras_imagem == undefined || imagemSalva.mascaras_imagem == null) {
                imagensProcessadas.push(imagem);
                links.push(imagem.tiff);
              } else {
                imagensProcessadas.push(imagem)
              };              
            } else {
              imagensProcessadas.push(imagem);
              links.push(imagem.tiff);
            }
          })
        );
        if(links.length > 0) {
          const response = await axios.post('http://localhost:8080/geraMascara', {links});
          const resultadoPrevisao = response.data;          
          
          imagensProcessadas.map((imagem: Image) => {
            if (imagem.mascara == null || imagem.mascara == undefined) {
              const previsaoAtual = resultadoPrevisao.previsoes[contador];
              imagem.mascara = previsaoAtual.png_preview;
              imagem.download_links = previsaoAtual.download_link;
              imagem.estatistica_fundo = previsaoAtual.estatistica.fundo;
              imagem.estatistica_nuvem = previsaoAtual.estatistica.nuvem;
              imagem.estatistica_sombra = previsaoAtual.estatistica.sombra;     
              contador ++;
            } else {
              contador ++;
            } 
          })
        }
      return imagensProcessadas;
    } catch (error) {
      throw new Error(`Erro ao processar imagens: ${error}`);
    }
};
