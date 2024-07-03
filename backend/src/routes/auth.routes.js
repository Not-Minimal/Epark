"use strict";

// Se importa el módulo de express
import express from "express";
// Se importa las funciones del controlador
import { login, register, profile, logout } from "../controllers/auth.controller.js";

import { createVehicle, getVehicles, getVehicleById , getVehicleByOwnerId, updateVehicleByOwnerId ,updateVehicleById} from "../controllers/vehicle.controller.js";
// Se realiza una instancia de express
const router = express.Router();

// Petición de tipo post para la ruta del login
router.post("/login", login);
// Petición de tipo post para la ruta del register
router.post("/register", register);
// Petición de tipo get para la ruta del profile
router.get("/profile", profile);
// Petición de tipo post para la ruta del logout
router.post("/logout", logout);

router.post("/createV", createVehicle);

router.get("/getVehicles", getVehicles);

router.get("/getVehicleById/:id",getVehicleById);

router.get("/getVehicleByOwnerId/:id",getVehicleByOwnerId);

router.put("/updateVehicleByOwnerId/:id",updateVehicleByOwnerId);

router.put("/updateVehicleById/:id",updateVehicleById);

export default router;
