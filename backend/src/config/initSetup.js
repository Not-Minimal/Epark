"use strict";
// Importa el modelo de datos 'Role'
import Role from "../models/role.model.js";
// Importa el modelo de datos 'User'
import User from "../models/user.model.js";

import Vehicle from "../models/vehicle.model.js";
import Issue from "../models/issue.model.js";

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
export async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Role.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "usuario" }).save(),
      new Role({ name: "administrador" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.log("Error en initSetup.js -> createRoles(): ", error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
export async function createUsers() {
  try {
    // Busca todos los usuarios en la base de datos
    const count = await User.estimatedDocumentCount();
    // Si no hay usuarios en la base de datos los crea
    if (count > 0) return;

    const admin = await Role.findOne({ name: "administrador" });
    const user = await Role.findOne({ name: "usuario" });

    await Promise.all([
      new User({
        username: "E-Park User",
        email: "user@gmail.com",
        rut: "12345678-9",
        password: await User.encryptPassword("eparkuser123"),
        roles: user._id,
        tipoUsuario: "Estudiante",
      })
        .save()
        .then(async (user) => {
          // Crear vehículo asociado al usuario
          await createVehicles(user._id, {
            licensePlate: "XYZ789",
            model: "Corolla",
            color: "Blue",
            brand: "Toyota",
          });
          await createIssues(user._id, {
            title: "Problema de estacionamiento",
            description:
              "No hay espacio suficiente para estacionar en las mañanas.",
          });
        }),
      new User({
        username: "Mark 1",
        email: "mark@gmail.com",
        rut: "12345678-1",
        password: await User.encryptPassword("mark123"),
        roles: user._id,
        tipoUsuario: "Estudiante",
      }).save(),

      new User({
        username: "Administrador",
        email: "admin@epark.com",
        rut: "12345678-0",
        password: await User.encryptPassword("eparkadmin123"),
        roles: admin._id,
        tipoUsuario: "Funcionario",
      })
        .save()
        .then(async (user) => {
          // Crear vehículo asociado al usuario
          await createVehicles(user._id, {
            licensePlate: "ABC123",
            model: "Model S",
            color: "Red",
            brand: "Tesla",
          });
          await createIssues(user._id, {
            title: "Problema de Seguridad",
            description:
              "Se han reportado robos al interior del estacionamiento",
          });
        }),
    ]);

    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.log("Error en initSetup.js -> createUsers(): ", error);
  }
}

async function createVehicles(userId, vehicleData) {
  try {
    // Verificar que el usuario exista
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Crear el vehículo
    const newVehicle = new Vehicle({ user: userId, ...vehicleData });
    const savedVehicle = await newVehicle.save();

    // Asociar el vehículo al usuario
    user.vehicle = savedVehicle._id;
    await user.save();

    console.log(`Vehículo creado para el usuario ${user.username}`);
  } catch (error) {
    console.log(`Error creando vehículo para usuario (${userId}):`, error);
  }
}

// Función para crear issues asociados a un usuario
export async function createIssues(userId, issuesData) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Crear el Issue
    const newIssue = new Issue({ user: userId, ...issuesData });
    const savedIssue = await newIssue.save();

    // Asociar el Issue al usuario
    user.issue = savedIssue._id;
    await user.save();

    console.log(`Problemas creados para el usuario ${user.username}`);
  } catch (error) {
    console.log(`Error creando issues para usuario (${userId}):`, error);
  }
}
