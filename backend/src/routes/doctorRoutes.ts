import Router from "express";
import {
  getUsers,
  getDoctorDetails,
  uploadUserFile,
} from "../controllers/doctorController";
import { authAsDoctor, authenicateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenicateToken);
router.use(authAsDoctor);

/**
 * @swagger
 * /api/v1/doctor:
 *   get:
 *     summary: Get current doctor details
 *     tags: [Doctor]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Doctor details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
 *       401:
 *         description: Unauthorized - Not authenticated or not a doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getDoctorDetails);

/**
 * @swagger
 * /api/v1/doctor/users:
 *   get:
 *     summary: Get all patients assigned to the doctor
 *     tags: [Doctor]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Not authenticated or not a doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /api/v1/doctor/upload:
 *   post:
 *     summary: Upload a medical file for a user
 *     tags: [Doctor]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userEmail
 *               - file
 *             properties:
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 example: "patient@example.com"
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File uploaded successfully"
 *                 fileName:
 *                   type: string
 *                   example: "5f9d88b8b3b7a200179c6e9a-report.pdf"
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Not authenticated or not a doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/upload", uploadUserFile);

export default router;
