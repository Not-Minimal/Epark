"use strict";
// Importa el modulo 'express' para crear las rutas
import express from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  getIssuesByUser,
  deleteIssue,
} from "../controllers/issue.controller.js";

// Se importa Middleware de autenticación
import {
  isAdmin,
  isAdminOrUser,
  isUser,
} from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = express.Router();

// Ruta para crear una incidencia
router.post("/createIssue/:id", isAdminOrUser, createIssue);

// Ruta para obtener los reclamos de un usuario específico
router.get("/getIssues/", isAdmin, getIssues);

// Ruta para obtener todas las incidencias
router.get("/getIssueById/:id", isAdmin, getIssueById);

// Ruta para obtener todas las incidencias por id de usuario
router.get("/getIssueByUserId/:id", isUser, getIssuesByUser);

// Ruta para eliminar un reclamo específico
router.delete("/deleteIssueById/:id", isAdmin, deleteIssue);

export default router;
