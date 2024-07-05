"use strict";

import { Router } from "express";

import {inicializarEspacios,getAllEspacios,getEspaciosDisponibles,getEspaciosOcupados,ocuparEspacio,desocuparEspacio,eliminarAllEspacios} from "../controllers/stockEspacio.controller.js"

const router = Router();

//Inicializar espacios (100 por default)
router.post("/inicializarEspacios",inicializarEspacios);
//Obtener todos los espacios
router.get("/getAllEspacios",getAllEspacios);
//Obtener espacios disponibles
router.get("/getEspaciosDisponibles",getEspaciosDisponibles);
//Obtener espacios ocupados
router.get("/getEspaciosOcupados",getEspaciosOcupados);
//Ocupar un espacio
router.put("/ocuparEspacio",ocuparEspacio);
//Desocupar un espacio
router.put("/desocuparEspacio",desocuparEspacio);
//Eliminar todos los espacios
router.delete("/eliminarAllEspacios",eliminarAllEspacios);

export default router;
