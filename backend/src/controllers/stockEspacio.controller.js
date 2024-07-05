import Espacio from "../models/stockEspacio.model.js"


//Crear espacios espesificados por el admin

/*
export async function crearEspacios(req, res){
    try {

        const {numEspacios} = req.body;
        if(numEspacios!= null && numEspacios!= undefined && numEspacios>0){

            /////////seguir
        }

        const newEspacios = new Espacio
    } catch (error) {
        console.log("Error en user.controller.js -> inicializarEspacios(): ", error);
        res.status(500).json({ message: error.message });
    }
};
*/

//Crear espacios defaul
export async function inicializarEspacios(req,res){
    try {
        //Contar cuantos espacios hay creados
        const count = await Espacio.countDocuments();
        if (count === 0) {
          for (let i = 1; i <= 100; i++) {// Crear 100 espacios 
            const newEspacio = new Espacio({ numero: i });
            await newEspacio.save();
          }
          console.log("Se inicializaron los espacios correctamente");
          res.status(201).json({message: "Espacios creados correctamente"});
        }else{
            console.log("Los espacios ya estan inicializados");
            res.status(400).send('Los espacios de estacionamiento ya han sido inicializados');
        }

    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> inicializarEspacios(): ", error);
        res.status(500).json({ message: error.message });
    }
};

//Obtener todos los espacios
export async function getAllEspacios(req,res){

    try {
        const allEspacios = await Espacio.countDocuments({});
        res.json(allEspacios);
    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> getAllEspacios(): ", error);
        res.status(500).json({ message: error.message });
    }

}

//Obtener todos los espacios ocupados
export async function getEspaciosOcupados(req,res){

    try {
        const espaciosOcupados = await Espacio.countDocuments({ estaOcupado: true });
        res.json(espaciosOcupados);
    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> getEspaciosOcupados(): ", error);
        res.status(500).json({ message: error.message });
    }

}

//Obtener todos los espacios disponibles
export async function getEspaciosDisponibles(req,res){

    try {
        const espaciosDisponibles = await Espacio.countDocuments({ estaOcupado: false });
        res.json(espaciosDisponibles);
    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> getEspaciosDisponibles(): ", error);
        res.status(500).json({ message: error.message });
    }

}

//Ocupar un espacio 
export async function ocuparEspacio(req,res){

    try {

        const espacio = await Espacio.findOne({ estaOcupado: false });
        if (espacio) {
          espacio.estaOcupado = true;
          await espacio.save();
          res.json(espacio);
        } else {
          res.status(400).send('No hay espacios disponibles para ocupar');
        }
        
    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> ocuparEspacio(): ", error);
        res.status(500).json({ message: error.message });
    }

}

//Desocupar un espacio 
export async function desocuparEspacio(req,res){

    try {

        const espacio = await Espacio.findOne({ estaOcupado: true });
        if (espacio) {
          espacio.estaOcupado = false;
          await espacio.save();
          res.json(espacio);
        } else {
          res.status(400).send('No hay espacios ocupados');
        }
        
    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> desocuparEspacio(): ", error);
        res.status(500).json({ message: error.message });
    }

}

//Eliminar todos los espacios
export async function eliminarAllEspacios(req,res){
    try {
        // Eliminar todos los documentos en la colección Espacio
        const result = await Espacio.deleteMany({});
        
        if (result.deletedCount > 0) {
            
            console.log("Todos los espacios fueron eliminados correctamente");
            res.status(200).json({ message: "Todos los espacios fueron eliminados correctamente" });
        } else {
            console.log("No se encontraron espacios para eliminar");
            res.status(404).json({ message: "No se encontraron espacios para eliminar" });
        }

    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> eliminarEspacios(): ", error);
        res.status(500).json({ message: error.message });
    }
};
