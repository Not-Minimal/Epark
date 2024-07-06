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
    }
},  {
        versionKey: false,
    },
);
const Space = mongoose.model("Space", parkingStockSchema);

export default Space;