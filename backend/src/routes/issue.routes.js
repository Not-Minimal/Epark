"use strict";
// Importa el modulo 'express' para crear las rutas
import express from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  deleteIssue,
} from "../controllers/issue.controller.js";

// Se importa Middleware de autenticación
import { isAdmin, isAdminOrUser } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = express.Router();

// Ruta para crear una incidencia
router.post("/createIssue/:id", isAdminOrUser, createIssue);

// Ruta para obtener los reclamos de un usuario específico
router.get("/getIssues/", isAdmin, getIssues);

// Ruta para obtener todas las incidencias
router.get("/getIssueById/:id", isAdmin, getIssueById);

// Ruta para eliminar un reclamo específico
router.delete("/deleteIssueById/:id", isAdmin, deleteIssue);

export default router;
