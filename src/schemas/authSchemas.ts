import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1).max(50),
    email: z.email().transform((val) => val.trim().toLowerCase()),
    password: z.string().min(8).max(20),
    passwordConfirmation: z.string().min(8).max(20),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });
