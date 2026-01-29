import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

export const authService = {
  async signUp(data : { name: string; email: string; password: string }) {
    try{
      const hashed = await bcrypt.hash(data.password, 10);
      return await prisma.user.create({
        data: { name: data.name, email: data.email, password: hashed },
      });
    } catch (error ) {
      if (error.code === 'P2002') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  },
};

