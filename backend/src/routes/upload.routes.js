import { Router } from 'express';
import upload from '../middlewares/multer.middleware.js';
import { uploadFile, listFiles, getFile, deleteFile } from '../controllers/uploadPdf.controller.js';
import { isAdmin, isUser } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta para subir archivos
router.post('/', isUser, uploadFile(upload));

// Ruta para listar archivos PDF
router.get('/files', isAdmin, listFiles);

// Ruta para servir un archivo PDF específico
router.get('/files/:filename', isAdmin, getFile);

// Ruta para eliminar un archivo PDF específico
router.delete('/files/:filename', isAdmin, deleteFile);

export default router;
