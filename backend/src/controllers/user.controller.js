// Importa el modelo de datos 'User'
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import Vehicle from "../models/vehicle.model.js";

export async function getUser(req, res) {
  try {
    const rutUser = req.query.rut;

    if (!rutUser) {
      res.status(400).json({
        message: "El parámetro 'rut' es requerido.",
        data: null,
      });
      return;
    }
    const user = await User.findOne({ rut: rutUser });

    if (!user) {
      res.status(404).json({
        message: "Usuario no encontrado",
        data: null,
      });
      return;
    }
    res.status(200).json({
      message: "Usuario encontrado!",
      data: user,
    });
  } catch (error) {
    console.log("Error en user.controller.js -> getUser(): ", error);
    res.status(500).json({ message: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find().populate("roles", "name");
    res.status(200).json({
      message: "Lista de usuarios",
      data: users,
    });
  } catch (error) {
    console.log("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const rutUser = req.query.rut;
    const updatedData = req.body;

    if (!rutUser) {
      res.status(400).json({
        message: "El parámetro 'rut' es requerido.",
        data: null,
      });
      return;
    }

    if (updatedData.roles) {
      const rolesNames = updatedData.roles;
      const roles = await Role.find({ name: { $in: rolesNames } });

      if (roles.length !== rolesNames.length) {
        res.status(400).json({
          message: "Uno o más roles no son válidos.",
          data: null,
        });
        return;
      }

      const rolesIds = roles.map((role) => role._id);
      updatedData.roles = rolesIds;
    }

    if (updatedData.password) {
      updatedData.password = await User.encryptPassword(updatedData.password);
    }

    const userMod = await User.findOneAndUpdate({ rut: rutUser }, updatedData, {
      new: true,
    });

    if (!userMod) {
      res.status(404).json({
        message: "Usuario no encontrado",
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: "Usuario actualizado correctamente!",
      data: userMod,
    });
  } catch (error) {
    console.log("Error en user.controller.js -> updateUser(): ", error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const rutUser = req.query.rut;
    if (!rutUser) {
      return res.status(400).json({
        message: "El parámetro 'rut' es requerido.",
        data: null,
      });
    }
    
    // Buscar el usuario
    const user = await User.findOne({ rut: rutUser });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
        data: null,
      });
    }
    
    // Buscar y eliminar el vehículo asociado al usuario, si existe
    const vehicle = await Vehicle.findOneAndDelete({ user: user._id });

    if (vehicle) {
      console.log(`Vehículo del usuario ${user._id} eliminado correctamente: ${vehicle}`);
    } else {
      console.log(`El usuario ${user._id} no tenía un vehículo asociado.`);
    }

    // Eliminar el usuario
    await User.findOneAndDelete({ rut: rutUser });

    res.status(200).json({
      message: "Usuario y vehículo (si existía) eliminados exitosamente!",
      userData: user,
      vehicleData: vehicle,
    });
  } catch (error) {
    console.error("Error en deleteUser(): ", error);
    res.status(500).json({ message: error.message });
  }
}