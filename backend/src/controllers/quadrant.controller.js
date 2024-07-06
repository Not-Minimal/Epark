"use strict";
// Importar el modelo de dato Quadrant
import Space from '../models/parkingStock.model.js';
import Quadrant from '../models/quadrant.model.js';


//*   Crear un nuevo cuadrante

export async function createQuadrant(req, res){

    try{
         //* Extrae el nombre y los espacios
        const {name} = req.body;
        const newQuadrant = new Quadrant({name});

        //* Guardamos el nuevo cuadrante en la base de datos
        await newQuadrant.save();
        
        //? Enviamos respuesta del cuadrante creado
        res.status(201).json({
            message: "Nuevo cuadrante creado",data: newQuadrant,});
        
    }catch(error){
        //! Eviamos respuesta de algun error
        res.status(401).json({message: error.message});
    }

};

//*   Obtener todos los cuadrantes
export async function getQuadrant(req,res){

    try{
        //* Buscar todos los cuadrantes 
        const quadrants = await Quadrant.find();
        
        //* Enviamos respuesta con todos los cuadrantes
        res.status(200).json(quadrants);
        
    }catch(error){

        //! Enviamos respuesta si algo falla 
        res.status(500).json({message: error.message});
    }
};





//*   Obtener los cuadrantes por ID

export const getQuadrantByID = async (req, res) => {
    try {
      const quadrant = await Quadrant.findById(req.params.id);
      if (!quadrant) return res.status(404).json({ message: 'Cuadrante no encontrado' });
      res.status(200).json(quadrant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//*   Actualizar un cuadrante por ID

export const updateQuadrant = async (req, res) => {
    try {
      const { name } = req.body;
      const updatedQuadrant = await Quadrant.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!updatedQuadrant) return res.status(404).json({ message: 'Cuadrante no encontrado' });
      res.status(200).json(updatedQuadrant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


//*   Eliminar un cuadrante por ID

export async function deleteQuadrant(req,res){

    try {
        // Buscamos y eliminamos el cuadrante por ID
        const deletedQuadrant = await Quadrant.findByIdAndDelete(req.params.id);
    
        // Si no se encuentra el cuadrante, enviamos una respuesta de error
        if (!deletedQuadrant) return res.status(404).json({ message: 'Cuadrante no encontrado' });
    
        // Enviamos una respuesta confirmando la eliminación
        res.status(200).json({ message: 'Cuadrante eliminado' });
    } catch (error) {
      // Enviamos una respuesta de error si algo falla
    res.status(500).json({ message: error.message });
    }
}



//*  Verificar si el cuadrante esta completamente ocupado


export async function updateQuadrantSpaces(req, res) {
  try {
      //*Buscar el id en los parametros

      const quadrantId = req.params.id;
      //*Buscar el cuadrante segun id

      const quadrant = Quadrant.findById(quadrantId);
      if(!quadrant){
          return res.status(404).json({ message: 'Cuadrante no encontrado' });
      }else{
          //*Contar espacios ocupados del cuadrante

          const occupiedSpaces = await Space.countDocuments({quadrant:quadrant._id, isOccupied: true });
          //* Contar espacios totales
          const totalSpaces = await Space.countDocuments({quadrant:quadrant._id});
          //* Si los espacios ocupados son igual a los totales, esta completamente lleno
          if(occupiedSpaces == totalSpaces){
              quadrant.full = true;//Completo
          }
      }

  } catch (error) {
      console.log("Error en quadrant.controller.js -> updateQuadrant(): ", error);
      res.status(500).json({ message: error.message });
  }

}

