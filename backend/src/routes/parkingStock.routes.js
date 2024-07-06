"use strict";

import { Router } from "express";

import {initializeSpaces,createSpecifiedSpaces,createSpaceOnQuadrant,occupiesSpaceOnQuadrant,vacateSpaceOnQuadrant,getAllSpaces,getAvailableSpaces,getOccupiedSpaces,deleteAllSpaces,deleteSpaceOnQuadrant,deleteSpecifiedSpacesOnQuadrant} from "../controllers/parkingStock.controller.js"

const router = Router();

//Inicializar espacios (100 por default)
router.post("/initializeSpaces",initializeSpaces);
//Create cantidad especifica de espacios
router.post("/createSpecifiedSpaces/:id",createSpecifiedSpaces);
//Crear un solo espacio
router.post("/createSpaceOnQuadrant/:id",createSpaceOnQuadrant)
//Obtener todos los espacios
router.get("/getAllSpaces",getAllSpaces);
//Obtener espacios disponibles
router.get("/getAvailableSpaces",getAvailableSpaces);
//Obtener espacios ocupados
router.get("/getOccupiedSpaces",getOccupiedSpaces);
//Ocupar un espacio
router.put("/occupiesSpaceOnQuadrant/:id",occupiesSpaceOnQuadrant);
//Desocupar un espacio
router.put("/vacateSpaceOnQuadrant/:id",vacateSpaceOnQuadrant);
//Eliminar todos los espacios
router.delete("/deleteAllSpaces",deleteAllSpaces);
//Eliminar un espacio
router.delete("/deleteSpaceOnQuadrant/:id",deleteSpaceOnQuadrant);
//Eliminar cantidad de espacios espesificados
router.delete("/deleteSpecifiedSpacesOnQuadrant/:id",deleteSpecifiedSpacesOnQuadrant);

export default router;