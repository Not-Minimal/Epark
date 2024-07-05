"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de vehicle */
import vehicleRoutes from "./vehicle.routes.js";

//Enrutador de stockEspacios
import stockEspaciosRoutes from "./stockEspacio.routes.js"

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user",  userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los usuarios /api/vehicle
router.use("/vehicle",vehicleRoutes);
// Define las rutas para los espacios /api/stockEspacios
router.use("/stockEspacios",stockEspaciosRoutes);

export default router;