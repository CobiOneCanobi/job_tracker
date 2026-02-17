import { companySchema } from '../schemas/companySchema.js';
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
 *                 $ref: '#/components/schemas/CompanyResponse'
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

/**
 * @openapi
 * /companies:
 *   post:
 *     tags:
 *       - Company
 *     summary: Create a company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyRequest'
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
export const create = async (req: Request, res: Response) : Promise<void> => {
  try {
    const result = companySchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
      return;
    }
    const company = await companyService.create({ ...result.data, userId: req.user!.id });

    res.status(201).json(company);
  } catch (error) {
    console.error('Company#Create error', error);
    res.status(500).json({ errors: [{ message: 'Failed to create company' }] });
  }
};
