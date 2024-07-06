"use strict";

import { Router } from "express";

import {initializeSpaces,createSpecifiedSpaces,createSpace,occupiesSpace,vacateSpace,getAllSpaces,getAvailableSpaces,getOccupiedSpaces,deleteAllSpaces,deleteSpace,deleteSpecifiedSpaces} from "../controllers/parkingStock.controller.js"

const router = Router();

//Inicializar espacios (100 por default)
router.post("/initializeSpaces",initializeSpaces);
//Create cantidad especifica de espacios
router.post("/createSpecifiedSpaces",createSpecifiedSpaces);
//Crear un solo espacio
router.post("/createSpace",createSpace)
//Obtener todos los espacios
router.get("/getAllSpaces",getAllSpaces);
//Obtener espacios disponibles
router.get("/getAvailableSpaces",getAvailableSpaces);
//Obtener espacios ocupados
router.get("/getOccupiedSpaces/:id",getOccupiedSpaces);
//Ocupar un espacio
router.put("/occupiesSpace",occupiesSpace);
//Desocupar un espacio
router.put("/vacateSpace",vacateSpace);
//Eliminar todos los espacios
router.delete("/deleteAllSpaces",deleteAllSpaces);
//Eliminar un espacio
router.delete("/deleteSpace",deleteSpace);
//Eliminar cantidad de espacios espesificados
router.delete("/deleteSpecifiedSpaces",deleteSpecifiedSpaces);

export default router;
