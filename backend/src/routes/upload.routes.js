import { Router } from 'express';
import upload from '../config/configMulter.js';
import path from 'path';
import fs from 'fs';

const router = Router();
const uploadDir = 'uploads/';

const normalizePath = (filePath) => filePath.replace(/\\/g, '/');

const handleError = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({ error: message });
};

router.post('/upload', (req, res) => {
    upload.any()(req, res, function (err) {
        if (err) {
            return handleError(res, err.message, 400);
        }

        if (!req.files || req.files.length !== 1) {
            return handleError(res, 'Se debe subir un solo archivo.', 400);
        }

        const file = req.files[0]; // Obtén el primer (y único) archivo

        const normalizedPath = normalizePath(file.path);

        const responseFile = {
            ...file,
            path: normalizedPath
        };

        res.status(200).json({
            message: 'Archivo subido exitosamente',
            file: responseFile
        });
    });
});

router.get('/files', async (req, res) => {
    try {
        const files = await fs.promises.readdir(uploadDir);
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        res.status(200).json({ files: pdfFiles });
    } catch (err) {
        handleError(res, 'Error al listar los archivos.', 500);
    }
});

router.get('/files/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(uploadDir, filename);

    try {
        await fs.promises.access(filepath, fs.constants.F_OK);
        res.sendFile(filepath, { root: '.' }, (err) => {
            if (err) {
                handleError(res, 'Error al enviar el archivo.', 500);
            }
        });
    } catch (err) {
        handleError(res, 'Archivo no encontrado.', 404);
    }
});

export default router;
