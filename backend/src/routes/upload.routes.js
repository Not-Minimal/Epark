import { Router } from 'express';
import upload from '../middlewares/multer.middleware.js';
import { uploadFile, listFiles, getFile, deleteFile } from '../controllers/uploadPdf.controller.js';
import { isAdmin, isUser } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta para subir archivos
router.post('/uploadFile', isUser, uploadFile(upload));

// Ruta para listar archivos PDF
router.get('/getFile/:filename', isAdmin, listFiles);

// Ruta para servir un archivo PDF específico
router.get('/getFile/:filename', isAdmin, getFile);

// Ruta para eliminar un archivo PDF específico
router.delete('/deleteFile/:filename', isAdmin, deleteFile);

export default router;
