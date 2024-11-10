import { Worker } from "bullmq";
import { Image } from "../types/image";
import { redis } from "../config/redisConfig";
import axios from "axios";

const imagemWorker = new Worker(
  'imagemFila',
  async job => {
    const { imagens } = job.data;
    try {
        imagemWorker.on('ready', () => {
          console.log("Worker pronto e conectado à fila.");
        });
          
        imagemWorker.on('error', (error) => {
          console.error("Erro no Worker:", error);
        });
        console.log("Entrei no worker");
        const imagensProcessadas: Image[] = [];
  
        let contador = 0;    
        let links: string[] = [];
        imagens.forEach((imagem: Image) => {
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
    } catch (error) {
      throw new Error(`Erro ao processar imagens: ${error}`);
    }
  },
  { connection: redis }
);

imagemWorker.on('completed', job => {
  console.log(`Job ${job.id} concluído com sucesso`);
});

imagemWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} falhou: ${err.message}`);
});
