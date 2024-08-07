"use strict";
//? Importar el modelo de dato quadrant y parkinStock
import Space from '../models/parkingStock.model.js';
import Quadrant from '../models/quadrant.model.js';


//*   Crear un nuevo cuadrante

export async function createQuadrant(req, res){

    try{

        //* Contar los cuadrantes existentes 
        const quadrantCount = await Quadrant.countDocuments();

        //* Verificar si ya existen 4 cuadrantes
        if(quadrantCount >= 4){
          return res.status(400).json({message: 'Solo se pueden crear hasta 4 cuadrantres'});
        }

        //* Extrae el nombre y los espacios
        const {name} = req.body;
        const newQuadrant = new Quadrant({name});

        //* Guardamos el nuevo cuadrante en la base de datos
        await newQuadrant.save();
        
        //? Enviamos respuesta del cuadrante creado
        res.status(201).json({message:  'Nuevo cuadrante creado.',data: newQuadrant,});
        
    }catch(error){

        //! Eviamos error si algo falla
        res.status(500).json({message:'Error interno del servidor'});
    }

};


//*   Obtener todos los cuadrantes
export async function getQuadrant(req,res){

    try{
        //* Buscar todos los cuadrantes 
        const quadrants = await Quadrant.find();

        //? Si no existen cuadrantes enviamos mensaje
        if(quadrants.length === 0){return res.status(404).json({message: 'No existen cuadrantes creados.'});}
        
        //? Enviamos respuesta con todos los cuadrantes
        res.status(200).json({message:'Cuadrantes exitentes', data: quadrants});
        
    }catch(error){
      
        //! Enviamos error si algo falla 
         res.status(500).json({message:'Error interno del servidor.'});
    }
};


//*   Obtener los cuadrantes por ID

export async function getQuadrantByID(req, res){
    try {
      //* Buscamos cuadrante por ID
      const quadrant = await Quadrant.findById(req.params.id);

      //? Si el ID no esta en la base de datos arroja mensaje
      if (!quadrant) return res.status(404).json({ message: 'No existe un cuadrante con este ID.' });

      //? Si existe enviamos respuesta con el cuadrante encontrado
      res.status(200).json({message:'Cuadrante solicitado.', data: quadrant});
    } catch (error) {

      //! Envia error si algo falla
      res.status(500).json({ message:'Error interno del servidor.' });
    }
};

//*   Actualizar un cuadrante por ID

export async function updateQuadrant(req, res){
    try {

      //* Extrae el nombre solicidato
      const { name } = req.body;
      

      //* Toma el cuadrante y lo devuelve actualizado 
      const updatedQuadrant = await Quadrant.findByIdAndUpdate(req.params.id,{ name },{ new: true });

      //? Si el ID no esta en la base de datos arroja mensaje
      if (!updatedQuadrant) return res.status(404).json({ message: 'Cuadrante no encontrado.' });

      //? Enviamos mensaje con el cuadrante actualizao
      res.status(200).json({message:'Cuadrante actualizado', data: updatedQuadrant});
    } catch (error) {

      //! Enviamos error si algo falla
      res.status(500).json({ message:'Error interno del servidor.'});
    }
}


//*   Eliminar un cuadrante por ID

export async function deleteQuadrant(req,res){

    try {

        //* Buscamos y eliminamos el cuadrante por ID
        const deletedQuadrant = await Quadrant.findByIdAndDelete(req.params.id);
    
        //? Si el ID no esta en la base de datos arroja mensaje
        if (!deletedQuadrant) return res.status(404).json({ message: 'Cuadrante no encontrado' });
    
        //? Enviamos mensaje con el cuadrante eliminado
        res.status(200).json({ message: 'Cuadrante eliminado.' });
    } catch (error) {

      //! Enviamos error si algo falla
    res.status(500).json({ message:'Error interno del servidor.'});
    }
}


//*  Verificar si el cuadrante esta completamente ocupado

export async function updateQuadrantSpaces(quadrantId) {
  try {
      
      //*Buscar el cuadrante segun id

      const quadrant = await Quadrant.findById(quadrantId);
      if(!quadrant){
         console.log("Cuadrante no encontrado")
      }else{

          //*Contar espacios ocupados del cuadrante
          const occupiedSpaces = await Space.countDocuments({quadrant:quadrantId, isOccupied: true });

          //* Contar espacios totales
          const totalSpaces = await Space.countDocuments({quadrant:quadrantId});

          //* Si los espacios ocupados son igual a los totales, esta completamente lleno
          if(occupiedSpaces || totalSpaces ){
              console.log(`Espacios totales: ${totalSpaces}, Espacios ocupados: ${occupiedSpaces}`);
            if(occupiedSpaces == totalSpaces){
              quadrant.full = true;  //?Completo
              await quadrant.save()
            }else{
              quadrant.full = false; //?Libre
              await quadrant.save()
            }
            console.log("El cuadrante se actualizo")
          }
          
      }

  } catch (error) {
      console.log("Error en quadrant.controller.js -> updateQuadrant(): ", error);
      res.status(500).json({message:'Error interno del servidor'})   
  }

}

