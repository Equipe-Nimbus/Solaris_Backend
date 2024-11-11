import Redis from 'ioredis';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

redis.on('connect', () => {
  console.log('Conectado ao Redis com sucesso');
});

redis.on('error', (error) => {
  console.error('Erro ao conectar ao Redis:', error);
});