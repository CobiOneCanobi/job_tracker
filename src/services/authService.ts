import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import type { User } from '../../generated/prisma/client.js';
import { PrismaClientKnownRequestError } from '../../generated/prisma/internal/prismaNamespace.js';

export const authService = {
  async signUp(data : { name: string; email: string; password: string }) : Promise<User>  {
    try{
      const hashed = await bcrypt.hash(data.password, 10);
      return await prisma.user.create({
        data: { name: data.name, email: data.email, password: hashed },
      });
    } catch (error: unknown) {
      // P2002 = Prisma unique constraint violation (duplicate email)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Email already exists');
        }
      }
      throw error;
    }
  },
  async login(email : string, password : string) : Promise<User> {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
      throw new Error('Invalid credentials');
    }

    const sessionId = crypto.randomUUID();

    user = await prisma.user.update({ where: { id: user.id }, data: { sessionId } });

    return user;
  },
  async logout(userId : number) : Promise<void> {
    await prisma.user.update({ where: { id: userId }, data: { sessionId: null }});
  },
};

