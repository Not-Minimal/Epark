"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

const parkingStockSchema = new mongoose.Schema({
    number: {
        type: Number,
        require: true
    },
    isOccupied:{
        type: Boolean,
        default: false
    },
    quadrant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadrant',
        require: true
    }
},  {
        versionKey: false,
    },
);
const Space = mongoose.model("Space", parkingStockSchema);

export default Space;