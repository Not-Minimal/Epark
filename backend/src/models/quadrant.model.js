// Importamos el módulo de moongose
import mongoose from 'mongoose';


//* Definimos el esquema para el cuadrante 
const QuadrantSchema = new mongoose.Schema({

    name:{
        type: String,
        require : true, // el nombre del cuadrante debe ser obligatorio
        unique: true
    },

    spaces:{
        type : Number,
        require : true,
        default : 25 // cada cuadrante tendra 25 espacios
    },

    full:{
        type: Boolean,
        default: false 
    },

});







export default mongoose.model('Quadrant', QuadrantSchema);