import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { signUpSchema, loginSchema } from '../schemas/authSchemas.js';
import { authService } from '../services/authService.js';
import { env } from '../config/env.js';

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
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errors: result.error.issues.map((err) => ({
        field: err.path.map(String).join('.'),
        message: err.message,
      })),
    });
    return;
  }

  try {
    const user = await authService.signUp(result.data);

    res.status(201).json({
      message: 'Account created',
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      res.status(409).json({ errors: [{ message: error.message }] });
      return;
    }
    console.error('Sign up error:', error);
    res.status(500).json({ errors: [{ message: 'Unable to create account' }] });
  }
};

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login to an existing account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid credentials
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
export const login = async (req: Request, res: Response) : Promise<void> => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errors: result.error.issues.map((err) => ({
        field: err.path.map(String).join('.'),
        message: err.message,
      })),
    });
    return;
  }

  try {
    const { email, password } = result.data;
    const user = await authService.login(email, password);

    const token = jwt.sign(
      { userId: user.id, sessionId: user.sessionId },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn } as jwt.SignOptions,
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Invalid credentials')) {
      res.status(401).json({ errors: [{ message: error.message }] });
      return;
    }
    console.error('Login error:', error);
    res.status(500).json({ errors: [{ message: 'Login failed' }] });
  }
};

/**
 * @openapi
 * /logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout from the current session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const logout = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ errors: [{ message: 'Not authenticated' }] });
    return;
  }

  try {
    await authService.logout(req.user.id);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ errors: [{ message: 'Logout failed' }] });
  }
};
