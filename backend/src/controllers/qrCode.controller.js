import QRCode from 'qrcode';
import User from '../models/user.model.js';

export const generateQRCodeById = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return handleError(
			res,
			'Se requiere el ID del usuario para generar el código QR.',
			400
		);
	}

	try {
		//* Obtener la información del usuario desde la base de datos
		const user = await User.findById(userId);

		if (!user) {
			return handleError(res, 'Usuario no encontrado.', 404);
		}

		//* Codificar la información del usuario en el código QR
		const userInfo =
			`Nombre: ${user.username}\n` +
			`RUT: ${user.rut}\n` +
			`Celular: ${user.celular || 'N/A'}\n` +
			`Tipo Usuario: ${user.tipoUsuario}\n` +
			`Email: ${user.email}\n` +
			`Roles: ${user.roles.map((role) => role.name).join(', ')}`;
		const qrCode = await QRCode.toDataURL(userInfo);
		const qrBuffer = Buffer.from(qrCode.split(',')[1], 'base64');

		//* Enviar el código QR como imagen PNG
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': qrBuffer.length
		});
		res.end(qrBuffer);
	} catch (err) {
		console.error(err);
		handleError(res, 'No se pudo generar el código QR.', 500);
	}
};

export const getUserById = async (req, res) => {
	const { userId } = req.params;
	if (!userId) {
		return handleError(res, 'Se requiere el ID del usuario.', 400);
	}

	try {
		const user = await User.findById(userId);
		const { _id, username, rut, celular, tipoUsuario, email } = user;
		if (!user) {
			return handleError(res, 'Usuario no encontrado.', 404);
		}
		res.status(200).json({
			message: 'Usuario encontrado!',
			data: { _id, username, rut, celular, tipoUsuario, email }
		});
	} catch (err) {
		console.error(err);
		handleError(res, 'No se pudo obtener el usuario.', 500);
	}
};
