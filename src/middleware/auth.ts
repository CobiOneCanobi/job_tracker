import { env } from '../config/env.js';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import type { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ errors: [{ message: 'Missing or invalid token' }] });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ errors: [{ message: 'Missing token' }] });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    // decoded can technically be string or JwtPayload
    if (typeof decoded === 'string') {
      res.status(401).json({ errors: [{ message: 'Invalid token' }] });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId as number } });

    if (!user) {
      res.status(401).json({ errors: [{ message: 'User not found' }] });
      return;
    }

    if (user.sessionId !== decoded.sessionId) {
      res.status(401).json({ errors: [{ message: 'Session expired' }] });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(401).json({ errors: [{ message: 'Invalid or expired token' }] });
  }

};
