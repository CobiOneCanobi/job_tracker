/**
 * @openapi
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - passwordConfirmation
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           example: password123
 *         passwordConfirmation:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           example: password123
 *
 *     SignUpResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Account created
 *         userId:
 *           type: number
 *           example: 1
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           example: password123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               example: 1
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               example: john.doe@example.com

 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: email
 *                 required: false
 *               message:
 *                 type: string
 *                 example: Invalid email
 *
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Anthropic
 *         website:
 *           type: string
 *           nullable: true
 *           example: https://anthropic.com
 *         notes:
 *           type: string
 *           nullable: true
 *           example: AI safety and research company
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-15T10:30:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-15T10:30:00.000Z
 *         userId:
 *           type: integer
 *           example: 1
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// This file only contains JSDoc comments for Swagger schema definitions
// No actual TypeScript code needed
export {};
