import { z } from 'zod';

export const companySchema = z
  .object({
    name: z.string().min(1).max(50),
    website: z.url().nullish().transform((val) => val ?? null),
    notes: z.string().max(300).nullish().transform((val) => val ?? null),
  });
