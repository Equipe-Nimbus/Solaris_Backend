import { Image } from '../types/image';
import { Queue, QueueEvents } from 'bullmq';
import { redis } from '../config/redisConfig';

const imagemFila = new Queue('imagemFila', { connection: redis});
const queueEvents = new QueueEvents('imagemFila', { connection: redis });

export const processarImagens = async (imagens: Image[]): Promise<Image[]> => {
  try {  
    const job = await imagemFila.add('processarImagemJob', {imagens}, { removeOnComplete: true, removeOnFail: true });
   
  
    return new Promise((resolve, reject) => {
      queueEvents.on('completed', ({ jobId, returnvalue }) => {
        if (jobId === job.id) {
          resolve(returnvalue as unknown as Image[]);
        }
      });
  
      queueEvents.on('failed', ({ jobId, failedReason }) => {
        if (jobId === job.id) {
          reject(new Error(`Job falhou: ${failedReason}`));
        }
      });
    });      
  } catch (error: any) {
    throw new Error(`Erro ao processar imagens: ${error.message || error}`);
  }
};