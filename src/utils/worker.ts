import { Worker } from "bullmq";
import { Image } from "../types/image";
import { redis } from "../config/redisConfig";
import { processarImagem } from "../services/index"

export const imagemWorker = new Worker(
  'imagemFila',
  async job => {
    const { imagens } = job.data;
    try {
      let imagensProcessadas: Image[];
      imagensProcessadas = processarImagem(imagens) as unknown as Image[];
      return imagensProcessadas;
    } catch (error) {
      throw new Error(`Erro ao processar imagens: ${error}`);
    }
  },
  { connection: redis }
);