"use strict";

// Se importa el módulo de express
import express from "express";

// se importan funciones controller del vehicle
import { createVehicle, getVehicles, getVehicleByPatente , getVehicleByOwnerId, updateVehicleByOwnerId ,updateVehicleByPatente,getVehiclesByQuery} from "../controllers/vehicle.controller.js";

// Se realiza una instancia de express
const router = express.Router();

//peticion post para crear vehicle
router.post("/createVehicle/:id", createVehicle);
// peticion get para obtener todos los vehicles
router.get("/getVehicles", getVehicles);
// peticion getpara obtener vehicle por id 
router.get("/getVehicleByPatente/:patente",getVehicleByPatente);
// peticion get para obtener vehicle por el id del dueño
router.get("/getVehicleByOwnerId/:id",getVehicleByOwnerId);
// peticion put para editar vehicle por id del dueño
router.put("/updateVehicleByOwnerId/:id",updateVehicleByOwnerId);
// peticion put para editar vehicle por su id
router.put("/updateVehicleByPatente/:patente",updateVehicleByPatente);
// peticion get para obtener vehiculos segun los datos de la query
router.get("/getVehiclesByQuery",getVehiclesByQuery);

export default router;