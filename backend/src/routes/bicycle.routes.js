"use strict";

import express from "express";

import {
  createBicycle,
  getBicycles,
  getBicycleByQuery,
  getBicycleByOwnerId,
  updateBicycleByOwnerId,
  deleteBicycle,
} from "../controllers/bicycle.controller.js";

import {
  isAdmin,
  isUser,
  isAdminOrUser,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createBicycle/:id", isUser, createBicycle);
router.get("/getBicycles", isAdmin, getBicycles);
router.get("/getBicycleByQuery", isAdmin, getBicycleByQuery);
router.get("/getBicycleByOwnerId/:id", isAdminOrUser, getBicycleByOwnerId);
router.put("/updateBicycleByOwnerId/:id", isUser, updateBicycleByOwnerId);
router.delete("/deleteBicycle/:id", isAdmin, deleteBicycle);

export default router;
