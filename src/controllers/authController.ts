import type { Request, Response } from 'express';
import { signUpSchema } from '../schemas/authSchemas.js';
import { authService } from '../services/authService.js';

/**
 * @openapi
 * /sign-up:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const signUp = async (req: Request, res: Response) => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  try {
    const user = await authService.signUp(result.data);

    return res.status(201).json({
      message: 'Account created',
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return res.status(409).json({ errors: [{ message: error.message }] });
    }
    return res.status(500).json({ errors: [{ message: 'Unable to create account' }] });
  }
};
