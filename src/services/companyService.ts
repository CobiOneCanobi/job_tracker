import { prisma } from '../lib/prisma.js';
import type { Company } from '../../generated/prisma/client.js';

export const companyService = {
  async getAll(userId: number) : Promise<Company[]> {
    return await prisma.company.findMany({ where: { userId: userId }});
  },

  async create(data: { name: string, website: string | null, notes: string | null, userId: number }) : Promise<Company> {
    return await prisma.company.create({ data: data });
  },
};
