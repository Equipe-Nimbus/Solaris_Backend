import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../config';

export async function authenticateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (token) {
      try {
        const jwtData = verificarToken(token);
        if (typeof jwtData !== 'string' && 'id' in jwtData) {
          next();
          return;
        }
      } catch (error) {
        console.error('Erro ao verificar o token:', error);
      }
    }
  }

  res.sendStatus(401);
}