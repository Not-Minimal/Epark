import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";


export async function createVehicle(req, res) {
    try {
        const userId = req.params.id;
        const { licensePlate, model, color, brand } = req.body;

        // Verificar que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que todos los campos del vehicle estén presentes
        if (!licensePlate) {
            return res.status(400).json({ message: "La patente (licensePlate) es requerida" });
        }
        if (!model) {
            return res.status(400).json({ message: "El modelo (model) es requerido" });
        }
        if (!color) {
            return res.status(400).json({ message: "El color (color) es requerido" });
        }
        if (!brand) {
            return res.status(400).json({ message: "La marca (brand) es requerida" });
        }

        // Verificar si el usuario ya posee un vehicle
        if (user.vehicle) {
            return res.status(400).json({ message: "El usuario ya posee un vehiculo" });
        }

        // Verificar si la patente ya existe
        const existingVehicle = await Vehicle.findOne({ licensePlate });
        if (existingVehicle) {
            return res.status(400).json({ message: "La patente (licensePlate) ya está en uso" });
        }

        // Crear el vehicle
        const newVehicle = new Vehicle({ user: userId, licensePlate, model, color, brand });
        const savedVehicle = await newVehicle.save();

        // Asociar el vehicle al usuario
        user.vehicle = savedVehicle._id;
        await user.save();

        // Mapeo del JSON de respuesta
        const vehicleMap = {
        vehiculo_id: newVehicle._id,
        patente: newVehicle.licensePlate,
        modelo: newVehicle.model,
        color: newVehicle.color,
        marca: newVehicle.brand,
        usuario: {
        usuario_id: user._id,
        nombre_usuario: user.username,},
        };

        res.status(201).json({
            message: "Vehiculo creado correctamente y asociado al usuario",
            data: vehicleMap,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getVehicles(req, res) {
    try {
        const vehicles = await Vehicle.find().populate("user", "username");
        const vehiclesMap = vehicles.map(vehicle => ({
            vehiculo_id: vehicle._id,
            patente: vehicle.licensePlate,
            modelo: vehicle.model,
            color: vehicle.color,
            marca: vehicle.brand,
            usuario: {
                usuario_id: vehicle.user._id,
                nombre_usuario: vehicle.user.username,
            },
        }));
        res.status(200).json({
            message: "Lista de vehiculos",
            data: vehiclesMap,
        });
    } catch (error) {
        console.log("Error en getVehicle ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getVehiclesByQuery(req, res) {
    try {
        const { brand, model, color, licensePlate } = req.query;

        // Construir el objeto de consulta dinámicamente
        let query = {};
        if (brand) query.brand = brand;
        if (model) query.model = model;
        if (color) query.color = color;
        if (licensePlate) query.licensePlate = licensePlate;

        // Busqueda de un vehiculo segun los datos variables del query
        const vehicles = await Vehicle.find(query).populate("user", "username");

        // Verificar que se encontro minimo 1 vehiculo
        if (vehicles.length === 0) {
            res.status(404).json({
                message: "Vehiculos no encontrados",
                data: null,
            });
            return;
        }

        // Mapeo del JSON de respuesta
        const vehiclesMap = vehicles.map(vehicle => ({
            vehiculo_id: vehicle._id,
            patente: vehicle.licensePlate,
            modelo: vehicle.model,
            color: vehicle.color,
            marca: vehicle.marca,
            usuario: {
                usuario_id: vehicle.user._id,
                nombre_usuario: vehicle.user.username,
            },
        }));

        res.status(200).json({
            message: "Vehiculos encontrados",
            data: vehiclesMap,
        });

    } catch (error) {
        console.log("Error en getVehiclesByQuery ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getVehicleByLicensePlate(req, res) {
    try {
        const { LicensePlate } = req.params;

        // Buscar el vehiculo por su patente (LicensePlate)
        const vehicle = await Vehicle.findOne({ licensePlate: LicensePlate }).populate("user", "username");

        // Verificar si se encontro el dato
        if (!vehicle) {
            res.status(404).json({
                message: "Vehiculo no encontrado",
                data: null,
            });
            return;
        }
        //Mapeo del Json de respuesta
        const vehicleMap = {
            vehiculo_id: vehicle._id,
            patente: vehicle.licensePlate,
            modelo: vehicle.model,
            color: vehicle.color,
            marca: vehicle.marca,
            usuario: {
                usuario_id: vehicle.user._id,
                nombre_usuario: vehicle.user.username,
            },
        };

        res.status(200).json({
            message: "Vehiculo encontrado",
            data:  vehicleMap,
        });

    } catch (error) {
        console.log("Error en getVehicleByPatente", error);
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

        // Buscar el vehiculo asociado al usuario
        const vehicle = await Vehicle.findOne({ user: userId }).populate("user", "username");
        
        if (!vehicle) {
            res.status(404).json({
                message: "El usuario no posee vehiculo",
                data: null,
            });
            return;
        }
        // Mapeamos el JSON de respuesta
        const vehicleMap = {
            vehiculo_id: vehicle._id,
            patente: vehicle.licensePlate,
            modelo: vehicle.model,
            color: vehicle.color,
            marca: vehicle.marca,
            usuario: {
                usuario_id: vehicle.user._id,
                nombre_usuario: vehicle.user.username,
            },
        };
        // Retornar el vehículo encontrado
        res.status(200).json({
            message: "Vehiculo encontrado",
            data: vehicleMap,
        });
    } catch (error) {
        console.log("Error en getVehicleByOwnerId", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateVehicleByOwnerId(req, res) {
    try {
        const userId = req.params.id;
        const { licensePlate, model, color, brand } = req.body;

        // Verificar que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                message: "Usuario no encontrado",
                data: null,
            });
            return;
        }

        // Buscar el vehiculo asociado al usuario
        const vehicle = await Vehicle.findOne({ user: userId });
        if (!vehicle) {
            res.status(404).json({
                message: "El usuario no posee vehiculo o vehiculo no encontrado",
                data: null,
            });
            return;
        }

        // Verificar si la nueva patente ya está en uso por otro vehículo
        if (licensePlate !== vehicle.licensePlate) {
            const existingVehicle = await Vehicle.findOne({ licensePlate });
            if (existingVehicle) {
                return res.status(400).json({ message: "La patente ya está en uso" });
            }
        }
        // Actualizar los campos del vehiculo
        if (licensePlate) vehicle.licensePlate = licensePlate;
        if (model) vehicle.model = model;
        if (color) vehicle.color = color;
        if (brand) vehicle.brand = brand;
        // Guardamos los cambios
        const updatedVehicle = await vehicle.save();

        // Mapeamos el JSON de respuesta
        const vehicleMap = {
            vehiculo_id: updatedVehicle._id,
            patente: updatedVehicle.licensePlate,
            modelo: updatedVehicle.model,
            color: updatedVehicle.color,
            marca: updatedVehicle.brand,
            usuario: {
            usuario_id: user._id,
            nombre_usuario: user.username,
            },
        };
        // retornar el dato
        res.status(200).json({
            message: "Vehiculo actualizado",
            data: vehicleMap,
        });
    } catch (error) {
        console.log("Error en updateVehicleByOwnerId", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateVehicleByLicensePlate(req, res) {
    try {
        const { LicensePlate } = req.params;
        const { licensePlate, model, color, brand } = req.body;

        // Buscar el vehículo por su matrícula (patente)
        const vehicle = await Vehicle.findOne({ licensePlate: LicensePlate }).populate("user", "username");

        if (!vehicle) {
            res.status(404).json({
                message: "Vehiculo no encontrado",
                data: null,
            });
            return;
        }

        // Verificar si la nueva patente ya está en uso
        if (licensePlate !== LicensePlate) {
            const existingVehicle = await Vehicle.findOne({ licensePlate });
            if (existingVehicle) {
                return res.status(400).json({ message: "La patente ya está en uso" });
            }
        }
        
        // Actualizar los campos del vehículo
        if (licensePlate) vehicle.licensePlate = licensePlate;
        if (model) vehicle.model = model;
        if (color) vehicle.color = color;
        if (brand) vehicle.brand = brand;

        const updatedVehicle = await vehicle.save();

        const user = vehicle.user;
        // Mapeamos el JSON de respuesta
        const vehicleMap = {
            vehiculo_id: updatedVehicle._id,
            patente: updatedVehicle.licensePlate,
            modelo: updatedVehicle.model,
            color: updatedVehicle.color,
            marca: updatedVehicle.brand,
            usuario: {
            usuario_id: user._id,
            nombre_usuario: user.username,
            },
        };
        // Retornar el vehículo actualizado con el nombre del dueño
        res.status(200).json({
            message: "Vehiculo actualizado",
            data: vehicleMap,
        });
    } catch (error) {
        console.log("Error en updateVehicleByPatente", error);
        res.status(500).json({ message: error.message });
    }
}
