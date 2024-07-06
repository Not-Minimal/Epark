// Importamos el módulo de moongose
import mongoose from 'mongoose';


//* Definimos el esquema para el cuadrante 
const QuadrantSchema = new mongoose.Schema({

    name :{
        type: String,
        require : true // el nombre del cuadrante debe ser obligatorio
    },

    spaces:{
        type : Number,
        require : true,
        default : 25 // cada cuadrante tendra 25 espacios
    },

    status :{
        type: String,
        enum: ['Libre','Ocupado'],
        default: 'Libre' 
    },

});







export default mongoose.model('Quadrant', QuadrantSchema);