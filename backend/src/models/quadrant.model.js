// Importamos el módulo de moongose
import mongoose from 'mongoose';


//* Definimos el esquema para el cuadrante 
const QuadrantSchema = new mongoose.Schema({

    name:{
        type: String,
        require : true, // el nombre del cuadrante debe ser obligatorio
        unique: true
    },

    spaces:[{
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: "Space"
    }],

    full:{
        type: Boolean,
        default: true
    },

});







export default mongoose.model('Quadrant', QuadrantSchema);