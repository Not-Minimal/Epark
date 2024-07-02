import User from "../models/user.model.js";
import Role  from "../models/role.model.js";
import Vehicle from "../models/vehicle.model.js";


export async function createVehicle(req, res)  {
    try {
        const { userId, licensePlate, model, color } = req.body;

      // Verificar que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

      // Crear el vehículo
        const newVehicle = new Vehicle({ user: userId, licensePlate, model, color });
        const savedVehicle = await newVehicle.save();

      // Asociar el vehículo al usuario
        user.vehicle = savedVehicle._id;
        await user.save();

        res.status(201).json({
            message: "Vehiculo creado correctamente",
            data: newVehicle,
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};