"use strict";

import express from "express";

import {
  createBicycle,
  getBicycles,
  getBicycleByQuery,
  getBicycleByOwnerId,
  deleteBicycle,
} from "../controllers/bicycle.controller";

import { isAdmin, isUser, isAdminOrUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/createBicycle/:id", isUser, createBicycle);
router.get("/getBicycles", isAdmin, getBicycles);
router.get("/getBicycleByQuery", isAdmin, getBicycleByQuery);
router.get("/getBicycleByOwnerId/:id", isAdminOrUser, getBicycleByOwnerId);
router.delete("/deleteBicycle/:id", isAdmin, deleteBicycle);

export default router;
