import { Worker } from "bullmq";
import { Image } from "../types/image";
import { redis } from "../config/redisConfig";
import axios from "axios";
import { getImageById } from "./imagem/getImageById";
import { Imagem } from "../entity";

const imagemWorker = new Worker(
  'imagemFila',
  async job => {
    const { imagens } = job.data;
    try {
        const imagensProcessadas: Image[] = [];  
        let contador = 0;    
        let links: string[] = [];

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
          const response = await axios.post('http://localhost:8080/geraMascaraThumbnail', { links });
        
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
    } catch (error) {
      throw new Error(`Erro ao processar imagens: ${error}`);
    }
  },
  { connection: redis }
);
