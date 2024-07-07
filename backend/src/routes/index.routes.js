"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de vehicle */
import vehicleRoutes from "./vehicle.routes.js";

//Enrutador de parkingStock
import parkingStockRoutes from "./parkingStock.routes.js";

//** Enrutador de cuadrantes */
import quadrantRoutes from "./quadrant.routes.js";

// Enrutador de Problemas
import issueRoutes from "./issue.routes.js";

// Enrutador de las rutas de subida de archivos PDF
import uploadRoutes from "./upload.routes.js";


// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user", userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los usuarios /api/vehicle
router.use("/vehicle", vehicleRoutes);
// Define las rutas para los espacios /api/stockEspacios
router.use("/parkingStock", parkingStockRoutes);
// Define las rutas para los cuadrantes /api/quadrant
router.use("/quadrant", quadrantRoutes);
// Define las rutas para los problemas
router.use("/issues", issueRoutes);
// Define las rutas de subida de archivos al servidor
router.use("/files", uploadRoutes);

export default router;
