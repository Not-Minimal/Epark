"use strict";

import { Router } from "express";

import {
  initializeSpaces,
  createSpecifiedSpaces,
  createSpaceOnQuadrant,
  occupiesSpaceOnQuadrant,
  vacateSpaceOnQuadrant,
  getAllSpaces,
  getAvailableSpaces,
  getAvailableSpacesOnQuadrant,
  getOccupiedSpacesOnQuadrant,
  getOccupiedSpaces,
  deleteAllSpaces,
  deleteSpaceOnQuadrant,
  deleteSpecifiedSpacesOnQuadrant,
} from "../controllers/parkingStock.controller.js";

// Se importa Middleware de autenticación
import { isAdmin, isAdminOrUser } from "../middlewares/auth.middleware.js";

const router = Router();

//Inicializar espacios (100 por default)
router.post("/initializeSpaces/:id", isAdmin, initializeSpaces);
//Create cantidad especifica de espacios
router.post("/createSpecifiedSpaces/:id", isAdmin, createSpecifiedSpaces);
//Crear un solo espacio
router.post("/createSpaceOnQuadrant/:id", isAdmin, createSpaceOnQuadrant);
//Obtener todos los espacios
router.get("/getAllSpaces", isAdminOrUser, getAllSpaces);
//Obtener espacios disponibles
router.get("/getAvailableSpaces", getAvailableSpaces);
//Obtener espacios disponibles en un cuadrante
router.get(
  "/getAvailableSpacesOnQuadrant/:id",
  isAdminOrUser,
  getAvailableSpacesOnQuadrant,
);
//Obtener espacios ocupados en un cuadrante
router.get(
  "/getOccupiedSpacesOnQuadrant/:id",
  isAdminOrUser,
  getOccupiedSpacesOnQuadrant,
);
//Obtener espacios ocupados
router.get("/getOccupiedSpaces", isAdminOrUser, getOccupiedSpaces);
//Ocupar un espacio
router.put(
  "/occupiesSpaceOnQuadrant/:id",
  isAdminOrUser,
  occupiesSpaceOnQuadrant,
);
//Desocupar un espacio
router.put("/vacateSpaceOnQuadrant/:id", isAdminOrUser, vacateSpaceOnQuadrant);
//Eliminar todos los espacios
router.delete("/deleteAllSpaces", isAdmin, deleteAllSpaces);
//Eliminar un espacio
router.delete("/deleteSpaceOnQuadrant/:id", isAdmin, deleteSpaceOnQuadrant);
//Eliminar cantidad de espacios espesificados
router.delete(
  "/deleteSpecifiedSpacesOnQuadrant/:id",
  isAdmin,
  deleteSpecifiedSpacesOnQuadrant,
);

export default router;
