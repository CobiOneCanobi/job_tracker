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
 */

// This file only contains JSDoc comments for Swagger schema definitions
// No actual TypeScript code needed
export {};
