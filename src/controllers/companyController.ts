import { companyService } from '../services/companyService.js';
import type { Request, Response } from 'express';

/**
 * @openapi
 * /companies:
 *   get:
 *     tags:
 *       - Company
 *     summary: Retrieve all companies belonging to you
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved companies successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       401:
 *         description: Not authenticated
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
export const index = async (req: Request, res: Response) : Promise<void> => {
  try {
    const companies = await companyService.getAll(req.user!.id);

    res.status(200).json(companies);
  } catch (error) {
    console.error('Company#Index error', error);
    res.status(500).json({ errors: [{ message: 'Failed to retrieve companies' }] });
  }
};
