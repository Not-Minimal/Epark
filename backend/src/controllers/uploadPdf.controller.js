import path from 'path';
import fs from 'fs';

const uploadDir = './src/files/';

const normalizePath = (filePath) => filePath.replace(/\\/g, '/');

export const uploadFile = (upload) => (req, res) => {
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
		console.log('Directorio "files" creado');
	}

	upload.any()(req, res, function (err) {
		if (err) {
			return handleError(res, err.message, 400);
		}

		if (!req.files || req.files.length !== 1) {
			return handleError(res, 'Se debe subir un solo archivo.', 400);
		}

		const file = req.files[0];

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
};

export const listFiles = async (req, res) => {
	try {
		const files = await fs.promises.readdir(uploadDir);
		const pdfFiles = files.filter((file) => file.endsWith('.pdf'));
		res.status(200).json({ files: pdfFiles });
	} catch (err) {
		handleError(res, 'Error al listar los archivos.', 500);
	}
};

export const getFile = async (req, res) => {
	try {
		const filename = req.params.filename;
		const filepath = path.join(uploadDir, filename);
		await fs.promises.access(filepath, fs.constants.F_OK);
		res.sendFile(filepath, { root: '.' }, (err) => {
			if (err) {
				handleError(res, 'Error al enviar el archivo.', 500);
			}
		});
	} catch (err) {
		handleError(res, 'Archivo no encontrado.', 404);
	}
};

export const deleteFile = async (req, res) => {
	try {
		const filename = req.params.filename;
		const filepath = path.join(uploadDir, filename);
		await fs.promises.access(filepath, fs.constants.F_OK);
		await fs.promises.unlink(filepath);
		res.status(200).json({ message: 'Archivo eliminado exitosamente' });
	} catch (err) {
		handleError(res, 'Archivo no encontrado o no se pudo eliminar.', 404);
	}
};
