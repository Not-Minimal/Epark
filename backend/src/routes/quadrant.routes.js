

"use strict";

import express from 'express';
import { createQuadrant, getQuadrant, getQuadrantByID, updateQuadrant, deleteQuadrant } from '../controllers/quadrant.controller.js';

const router = express.Router();

// Crear un nuevo cuadrante
router.post('/Createquadrants', createQuadrant);

// Obtener todos los cuadrantes
router.get('/Getquadrants', getQuadrant);

// Obtener un cuadrante por ID
router.get('/Getquadrants/:id', getQuadrantByID);

// Actualizar un cuadrante por ID
router.put('/Updatequadrants/:id', updateQuadrant);

// Eliminar un cuadrante por ID
router.delete('/Deletequadrants/:id', deleteQuadrant);
 
export default router;
                                                                    