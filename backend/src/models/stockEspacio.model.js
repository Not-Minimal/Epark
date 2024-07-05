"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

const StockEspacioSchema = new mongoose.Schema({
    numero: {
        type: Number,
        require: true
    },
    estaOcupado:{
        type: Boolean,
        default: false
    }
},  {
        versionKey: false,
    },
);
const Espacio = mongoose.model("Espacio", StockEspacioSchema);

export default Espacio;