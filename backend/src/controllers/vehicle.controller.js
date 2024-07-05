import User from "../models/user.model.js";
import Role  from "../models/role.model.js";
import Vehicle from "../models/vehicle.model.js";

import bcrypt from 'bcryptjs';

export async function createVehicle(req, res) {
    try {
        const userId = req.params.id;
        const { licensePlate, model, color, marca } = req.body;

        // Verificar que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que todos los campos del vehículo estén presentes
        if (!licensePlate) {
            return res.status(400).json({ message: "La matrícula (licensePlate) es requerida" });
        }
        if (!model) {
            return res.status(400).json({ message: "El modelo (model) es requerido" });
        }
        if (!color) {
            return res.status(400).json({ message: "El color (color) es requerido" });
        }
        if (!marca) {
            return res.status(400).json({ message: "La marca (marca) es requerida" });
        }

        // Crear el vehículo
        const newVehicle = new Vehicle({ user: userId, licensePlate, model, color, marca });
        const savedVehicle = await newVehicle.save();

        // Asociar el vehículo al usuario
        user.vehicle = savedVehicle._id;
        await user.save();

        res.status(201).json({
            message: "Vehículo creado correctamente y asociado al usuario",
            data: newVehicle,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getVehicles(req, res) {
    try {
        const vehicles = await Vehicle.find().populate("user", "username");
        res.status(200).json({
            message: "Lista de vehículos",
            data: vehicles,
        });
    } catch (error) {
        console.log("Error en vehicle.controller.js -> getVehicle(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getVehicleByPatente(req, res) {
    try {
        const { patente } = req.params;

        // Buscar el vehículo por su matrícula (patente)
        const vehicle = await Vehicle.findOne({ licensePlate: patente }).populate("user", "username");

        if (!vehicle) {
            res.status(404).json({
                message: "Vehículo no encontrado",
                data: null,
            });
            return;
        }

        res.status(200).json({
            message: "Vehículo encontrado",
            data: vehicle,
        });
    } catch (error) {
        console.log("Error en getVehicleByPatente(): ", error);
        res.status(500).json({ message: error.message });
    }
}


export async function getVehicleByOwnerId(req, res) {
    try {
        const userId = req.params.id;
        
        // Verificar que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                message: "Usuario no encontrado",
                data: null,
            });
            return;
        }

        // Buscar el vehículo asociado al usuario
        const vehicle = await Vehicle.findOne({ user: userId }).populate("user", "username");
        if (!vehicle) {
            res.status(404).json({
                message: "El usuario no posee vehículo",
                data: null,
            });
            return;
        }

        // Retornar el vehículo encontrado
        res.status(200).json({
            message: "Vehículo encontrado",
            data: vehicle,
        });
    } catch (error) {
        console.log("Error en getVehicleByOwnerId(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateVehicleByOwnerId(req, res) {
    try {
        const userId = req.params.id;
        const { licensePlate, model, color,marca } = req.body;

        // Verificar que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                message: "Usuario no encontrado",
                data: null,
            });
            return;
        }

        // Buscar el vehículo asociado al usuario
        const vehicle = await Vehicle.findOne({ user: userId });
        if (!vehicle) {
            res.status(404).json({
                message: "El usuario no posee vehículo",
                data: null,
            });
            return;
        }

        // Actualizar los campos del vehículo
        if (licensePlate) vehicle.licensePlate = licensePlate;
        if (model) vehicle.model = model;
        if (color) vehicle.color = color;
        if (marca) vehicle.marca = marca;

        const updatedVehicle = await vehicle.save();
        // retornar el dato
        res.status(200).json({
            message: "Vehículo actualizado",
            data: {
                vehicle: updatedVehicle,
                owner: user.username,
            },
        });
    } catch (error) {
        console.log("Error en updateVehicleByOwnerId(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateVehicleByPatente(req, res) {
    try {
        const { patente } = req.params;
        const { licensePlate, model, color, marca } = req.body;

        // Buscar el vehículo por su matrícula (patente)
        const vehicle = await Vehicle.findOne({ licensePlate: patente }).populate("user", "username");
        if (!vehicle) {
            res.status(404).json({
                message: "Vehículo no encontrado",
                data: null,
            });
            return;
        }

        // Actualizar los campos del vehículo
        if (licensePlate) vehicle.licensePlate = licensePlate;
        if (model) vehicle.model = model;
        if (color) vehicle.color = color;
        if (marca) vehicle.marca = marca;
        const updatedVehicle = await vehicle.save();

        // Retornar el vehículo actualizado con el nombre del dueño
        res.status(200).json({
            message: "Vehículo actualizado",
            data: {
                vehicle: updatedVehicle,
                owner: vehicle.user.username,
            },
        });
    } catch (error) {
        console.log("Error en updateVehicleByPatente(): ", error);
        res.status(500).json({ message: error.message });
    }
}

// ! funcion de prueba rapida

// Función para generar un número aleatorio de 1 a max
function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Función para generar un string aleatorio de longitud length
function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

//! Función para crear usuarios con valores aleatorios y sin vehículo

export async function createRandomUser(req,res) {
    try {
        // Obtener roles existentes desde la base de datos
        const roles = await Role.find();
        if (roles.length === 0) {
            console.log("No se encontraron roles en la base de datos.");
            return null;
        }

        // Generar datos aleatorios
        const username = `User_${getRandomNumber(1000)}`;
        const rut = `${getRandomNumber(99999999)}-${getRandomNumber(9)}`;
        const celular = `+56 9 ${getRandomNumber(99999999)}`;
        const randomRole = roles[getRandomNumber(roles.length) - 1]; // Elegir un rol aleatorio
        const tipoUsuario = randomRole.name === "administrador" ? "Funcionario" : "Estudiante"; // Asignar tipo de usuario según el rol
        const password = await bcrypt.hash(generateRandomString(10), 10); // Generar contraseña aleatoria
        const email = `user${getRandomNumber(1000)}@example.com`;

        // Verificar si el rut y el email ya existen en la base de datos
        const existingUser = await User.findOne({ $or: [{ rut }, { email }] });
        if (existingUser) {
            console.log(`Usuario con rut '${rut}' o email '${email}' ya existe en la base de datos.`);
            return null;
        }

        // Crear el usuario
        const newUser = new User({
            username,
            rut,
            celular,
            tipoUsuario,
            password,
            email,
            roles: [randomRole._id], // Asignar el rol aleatorio al usuario
        });

        await newUser.save();
        console.log(`Usuario creado: ${username} - ${email}`);
        res.status(200).json({
            message: "Usuario random creado",
            data: newUser,
        });
    } catch (error) {
        console.error("Error creando usuario:", error);
        return null;
    }
}