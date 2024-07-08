"use strict";

import express from "express";
import {
  createQuadrant,
  getQuadrant,
  getQuadrantByID,
  updateQuadrant,
  deleteQuadrant,
  updateQuadrantSpaces,
} from "../controllers/quadrant.controller.js";

// Se importa Middleware de autenticación
import { isAdmin, isAdminOrUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Crear un nuevo cuadrante
router.post("/CreateQuadrant", isAdmin, createQuadrant);

// Obtener todos los cuadrantes
router.get("/GetQuadrants", isAdmin, getQuadrant);

// Obtener un cuadrante por ID
router.get("/GetQuadrantID/:id", isAdmin, getQuadrantByID);

// Actualizar un cuadrante por ID
router.put("/UpdateQuadrantID/:id", isAdmin, updateQuadrant);

// Eliminar un cuadrante por ID
router.delete("/DeleteQuadrantID/:id", isAdmin, deleteQuadrant);

// Verificar espacio del cuadrante
router.put("/UpdateQuadrantSpaces/:id", isAdmin, updateQuadrantSpaces);

export default router;
