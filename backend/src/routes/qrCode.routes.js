import { Router } from 'express';
import {
	generateQRCodeById,
	getUserById
} from '../controllers/qrCode.controller.js';

const router = Router();

// Ruta para generar un código QR con la información del usuario por ID
router.get('/QrById/:userId', generateQRCodeById);

// Ruta para obtener los datos del usuario por ID
router.get('/getUserQrById/:userId', getUserById);

export default router;
