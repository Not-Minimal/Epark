

"use strict";

import express from 'express';
import { createQuadrant, getQuadrant, getQuadrantByID, updateQuadrant, deleteQuadrant, updateQuadrantSpaces } from '../controllers/quadrant.controller.js';

const router = express.Router();

// Crear un nuevo cuadrante
router.post('/CreateQuadrant', createQuadrant);

// Obtener todos los cuadrantes
router.get('/GetQuadrants', getQuadrant);

// Obtener un cuadrante por ID
router.get('/GetQuadrantID/:id', getQuadrantByID);

// Actualizar un cuadrante por ID
router.put('/UpdateQuadrantID/:id', updateQuadrant);

// Eliminar un cuadrante por ID
router.delete('/DeleteQuadrantID/:id', deleteQuadrant);

// Verificar espacio del cuadrante
router.put('/UpdateQuadrantSpaces/:id', updateQuadrantSpaces);

export default router;
                                                                    