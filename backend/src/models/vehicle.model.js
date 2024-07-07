"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    licensePlate: {
    type: String,
    unique: true,
    required: true
    },
    model: String,
    color: String,
    brand:String,
},  {
        versionKey: false,
    },
);


// Modelo de datos de usuario
const Vehicle = mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;