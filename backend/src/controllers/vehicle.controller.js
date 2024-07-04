import User from "../models/user.model.js";
import Role  from "../models/role.model.js";
import Vehicle from "../models/vehicle.model.js";


export async function createVehicle(req, res)  {
    try {
        const { userId, licensePlate, model, color,marca } = req.body;

      // Verificar que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

      // Crear el vehículo
        const newVehicle = new Vehicle({ user: userId, licensePlate, model, color ,marca});
        const savedVehicle = await newVehicle.save();

      // Asociar el vehículo al usuario
        user.vehicle = savedVehicle._id;
        await user.save();

        await User.findByIdAndUpdate(userId, { vehicle: savedVehicle._id }); 
        res.status(201).json({
            message: "Vehiculo creado correctamente y asociado al usuario ",
            data: newVehicle,
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

export async function getVehicleById(req,res) {
    try {
        const id =req.params.id;
        const vehicle = await Vehicle.findById(id).populate("user", "username");

        if(!vehicle){
            res.status(400).json({
                message: "vehiculo no encontrado",
                data: null,
            })
        }

        res.status(200).json({
            message: "vehicle encontrado",
            data: vehicle,
        })
    } catch (error) {
        console.log("Error en getVehicleById(): ", error);
        return null;
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

export async function updateVehicleById(req, res) {
    try {
        const vehicleId = req.params.id;
        const { licensePlate, model, color } = req.body;

        // Buscar el vehículo por su ID
        const vehicle = await Vehicle.findById(vehicleId).populate("user", "username");
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
            },
        });
    } catch (error) {
        console.log("Error en updateVehicleById(): ", error);
        res.status(500).json({ message: error.message });
    }
}
