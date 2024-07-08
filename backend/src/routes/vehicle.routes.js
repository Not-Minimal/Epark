"use strict";

// Se importa el módulo de express
import express from "express";

// se importan funciones controller del vehicle
import {
  createVehicle,
  getVehicles,
  getVehicleByLicensePlate,
  getVehicleByOwnerId,
  updateVehicleByOwnerId,
  updateVehicleByLicensePlate,
  getVehiclesByQuery,
} from "../controllers/vehicle.controller.js";

// Se importa Middleware de autenticación
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";
// Se realiza una instancia de express
const router = express.Router();

//peticion post para crear vehicle
router.post("/createVehicle/:id", isUser, createVehicle);
// peticion get para obtener todos los vehicles
router.get("/getVehicles", isAdmin, getVehicles);
// peticion getpara obtener vehicle por id
router.get(
  "/getVehicleByLicensePlate/:LicensePlate",
  isAdmin,
  getVehicleByLicensePlate,
);
// peticion get para obtener vehicle por el id del dueño
router.get("/getVehicleByOwnerId/:id", isAdmin, getVehicleByOwnerId);
// peticion put para editar vehicle por id del dueño
router.put("/updateVehicleByOwnerId/:id", isAdmin, updateVehicleByOwnerId);
// peticion put para editar vehicle por su id
router.put(
  "/updateVehicleByLicensePlate/:LicensePlate",
  isAdmin,
  updateVehicleByLicensePlate,
);
// peticion get para obtener vehicles segun los datos de la query
router.get("/getVehiclesByQuery", isAdmin, getVehiclesByQuery);

export default router;
