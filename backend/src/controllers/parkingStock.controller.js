import Space from "../models/parkingStock.model.js" 
import Quadrant from "../models/quadrant.model.js"
import {updateQuadrantSpaces} from "../controllers/quadrant.controller.js"
//Crear espacios espesificados por el admin
export async function createSpecifiedSpaces(req,res){
    try {
        const {num} = req.body;
        const quadrantId = req.params.id;
        if(quadrantId){
            // Buscar el cuadrante por su id
            const quadrant = await Quadrant.findById(quadrantId);
            if (!quadrant) {
                return res.status(404).json({ message: 'Cuadrante no encontrado' });
            }else{
                if(num!= null && num!= undefined && num>0){
                    //Contar cantidad de espacio
                    const count = await Space.countDocuments({quadrant: quadrant.id});
                    //Constante para guardar ids de los spacios
                    const spacesIds= quadrant.spaces;
                    //Sumarle los espacios de num a los que ya existen
                    for ( let i= count+1 ; i <= num+count; i++){ 
                        const newSpace = new Space({ number: i ,quadrant: quadrant._id }); 
                        await newSpace.save();
                        spacesIds.push(newSpace.id);
                        quadrant.spaces = spacesIds;
                        await quadrant.save();
                    }
                    console.log("Se crearon los espacios correctamente");
                    res.status(201).json({ message: "Se crearon los espacios correctamente" });
                }
            }
        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }

    } catch (error) {
        console.log("Error en user.controller.js -> createSpecifiedSpace(): ", error);
        res.status(500).json({ message: error.message });
    }
};


// Crear espacios default
export async function initializeSpaces(req, res) {
    try {
        
        const quadrantId = req.params.id;
        if(quadrantId){
            // Buscar el cuadrante por su id
            const quadrant = await Quadrant.findById(quadrantId);
            if (!quadrant){
                return res.status(404).json({ message: 'Cuadrante no encontrado' });
            }else{
                //Constante para guardar ids de los spacios
                const spacesIds= quadrant.spaces;
                // Contar cuántos espacios hay creados para el cuadrante
                const count = await Space.countDocuments({ quadrant: quadrant._id });
                if (count === 0) {
                    for (let i = 1; i <= 100; i++) { // Crear 100 espacios
                        const newSpace = new Space({ number: i, quadrant: quadrant._id });
                        await newSpace.save();
                        spacesIds.push(newSpace.id);
                        quadrant.spaces = spacesIds;
                        await quadrant.save();
                    }
                    console.log("Se inicializaron los espacios correctamente");
                    res.status(201).json({ message: "Espacios creados correctamente" });
                } else {
                    console.log("Los espacios ya están inicializados");
                    res.status(400).send('Los espacios de estacionamiento ya han sido inicializados');
                }
            }
        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }


    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> initializeSpaces(): ", error);
        res.status(500).json({ message: error.message });
    }
};


// Crear un solo espacio
export async function createSpaceOnQuadrant(req, res) {
    try {
        const quadrantId = req.params.id;
        if(quadrantId){
            // Buscar el cuadrante por su id
            const quadrant = await Quadrant.findById(quadrantId);
            //Constante para guardar ids de los spacios
            const spacesIds= quadrant.spaces;
            if (!quadrant) {
                return res.status(404).json({ message: 'Cuadrante no encontrado' });
            }else{
                // Contar cuántos espacios hay creados para el cuadrante
                const count = await Space.countDocuments({ quadrant: quadrant._id });
                // Crear el nuevo espacio asociado al cuadrante
                const newSpace = new Space({ number: count + 1, quadrant: quadrant._id });
                await newSpace.save();
                spacesIds.push(newSpace.id);
                quadrant.spaces = spacesIds;
                await quadrant.save();

                console.log("Se creó el espacio correctamente");
                res.status(201).json({ message: "Espacio creado correctamente", data: newSpace });
            }          
        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }

    } catch (error) {
        console.log("Error en parkingStock.controller.js -> createSpace(): ", error);
        res.status(500).json({ message: error.message });
    }
};


//Obtener todos los espacios
export async function getAllSpaces(req,res){

    try {
        const AllSpaces = await Space.countDocuments();
        res.json(AllSpaces);
    } catch (error) {
        console.log("Error en parkingStock.controller.js -> getAllSpaces(): ", error);
        res.status(500).json({ message: error.message });
    }

};

//Obtener todos los espacios ocupados
export async function getOccupiedSpaces(req,res){

    try {
        const occupiedSpaces = await Space.countDocuments({ isOccupied: true });
        res.json(occupiedSpaces);
    } catch (error) {
        console.log("Error en parkingStock.controller.js -> getOccupiedSpaces(): ", error);
        res.status(500).json({ message: error.message });
    }

};

//Obtener todos los espacios disponibles
export async function getAvailableSpaces(req,res){

    try {
        const availableSpaces = await Space.countDocuments({ isOccupied: false });
        res.json(availableSpaces);
    } catch (error) {
        console.log("Error en parkingStock.controller.js -> getAvailableSpaces(): ", error);
        res.status(500).json({ message: error.message });
    }

};

// Ocupar un espacio
export async function occupiesSpaceOnQuadrant(req, res) {
    try {
        const quadrantId = req.params.id;
        if(quadrantId){
            // Buscar el cuadrante por su id
            const quadrant = await Quadrant.findById(quadrantId);

            if (!quadrant) {
                return res.status(404).json({ message: 'Cuadrante no encontrado' });
            }else{
                const space = await Space.findOne({ quadrant: quadrant._id, isOccupied: false });
                if (space) {
                    space.isOccupied = true;
                    await space.save();
                    //Actualizar el cuadrante
                    await updateQuadrantSpaces(quadrantId);
                    res.status(200).json({ message: `Acción realizada correctamente, espacio usado: ${space.number}` });

                } else {
                    res.status(400).send('No hay espacios disponibles para ocupar en este cuadrante');
                }
            }
        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }


    } catch (error) {
        console.log("Error en parkingStock.controller.js -> occupiesSpaceOnQuadrant(): ", error);
        res.status(500).json({ message: error.message });
    }
}

/*
        if(quadrantId){

        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }
*/

//Desocupar un espacio 
export async function vacateSpaceOnQuadrant(req,res){

    try {
        //Obtener el id del cuadrante de los parametros
        const quadrantId = req.params.id;
        if(quadrantId){
            // Buscar el cuadrante por su nombre
            const quadrant = await Quadrant.findById(quadrantId);
            if (!quadrant) {
                return res.status(404).json({ message: 'Cuadrante no encontrado' });
            }else{
                const space = await Space.findOne({ quadrant: quadrant._id , isOccupied: true });
                if (space) {
                    space.isOccupied = false;
                    await space.save();
                    //Actualizar el cuadrante
                    await updateQuadrantSpaces(quadrantId);
                    res.status(200).json({message: `Accion realizada correctamente, se libero un espacio`});
                    
                } else {
                  res.status(400).send('No hay espacios ocupados');
                }
            }
        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }

        
    } catch (error) {
        console.log("Error en parkingStock.controller.js -> vacateSpaceOnQuadrant(): ", error);
        res.status(500).json({ message: error.message });
    }

};

//Eliminar todos los espacios 
export async function deleteAllSpaces(req,res){
    try {
        // Eliminar todos los documentos en la colección Espacio
        const result = await Space.deleteMany({});
        // Actualizar todos los cuadrantes eliminando las referencias a los espacios
        await Quadrant.updateMany({}, { $set: { spaces: [] } });
        
        if (result.deletedCount > 0) {
            console.log("Todos los espacios fueron eliminados correctamente");
            res.status(200).json({ message: "Todos los espacios fueron eliminados correctamente" });
        } else {
            console.log("No se encontraron espacios para eliminar");
            res.status(404).json({ message: "No se encontraron espacios para eliminar" });
        }

    } catch (error) {
        console.log("Error en parkingStock.controller.js -> deleteAllSpace(): ", error);
        res.status(500).json({ message: error.message });
    }
};

//Eliminar solo un espacio
export async function deleteSpaceOnQuadrant(req, res) {
    try {
        const quadrantId = req.params.id;
        if(quadrantId){
            // Buscar el cuadrante por su nombre
            const quadrant = await Quadrant.findById(quadrantId);
            if (!quadrant) {
                return res.status(404).json({ message: 'Cuadrante no encontrado' });
            }else{
                // Verificar si hay espacios en la base de datos
                const count = await Space.countDocuments({quadrant: quadrant._id});
                if (count === 0) {
                    console.log("No hay espacios en la base de datos");
                    return res.status(404).json({ message: "No hay espacios en la base de datos" });
                }
                // Buscar un espacio desocupado
                const freeSpace = await Space.findOne({quadrant: quadrant._id, isOccupied: false });
                if (!freeSpace) {
                    console.log("No hay espacios desocupados para eliminar");
                    return res.status(404).json({ message: "No hay espacios desocupados para eliminar" });
                }else{
                    // Eliminar el espacio desocupado
                    await Space.deleteOne({ _id: freeSpace._id });

                    // Actualizar el cuadrante para eliminar la referencia al espacio eliminado
                    quadrant.spaces = quadrant.spaces.filter(spaceId => spaceId.toString() !== freeSpace._id.toString());
                    await quadrant.save();



                    console.log(`El espacio ${freeSpace.number} fue eliminado correctamente`);
                    res.status(200).json({ message: `El espacio ${freeSpace.number} fue eliminado correctamente` });
                }

            }
        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }



    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> deleteSpaceOnQuadrant(): ", error);
        res.status(500).json({ message: error.message });
    }
};

//Eliminar espacios espesificados por el admin
export async function deleteSpecifiedSpacesOnQuadrant(req, res) {
    try {
        // Obtener la cantidad de espacios a eliminar de la solicitud
        const { num } = req.body;
        
        //Obtener el id de los parametros
        const quadrantId = req.params.id;
        if(quadrantId){
            // Buscar el cuadrante por su nombre
            const quadrant = await Quadrant.findById(quadrantId);
            if (!quadrant) {
                return res.status(404).json({ message: 'Cuadrante no encontrado' });
            }else{

                if (!num || num <= 0) {
                    return res.status(400).json({ message: "Cantidad inválida" });
                }else{
                
                    // Verificar si hay suficientes espacios desocupados en la base de datos

                    const countFreeSpace = Space.countDocuments({quadrant: quadrant._id, isOccupied: false })
                
                    if (countFreeSpace < num) {
                        console.log(`No hay suficientes espacios desocupados para eliminar. Se encontraron ${countFreeSpace}`);
                        return res.status(404).json({ message: `No hay suficientes espacios desocupados para eliminar. Se encontraron ${countFreeSpace}` });
                    }else{
                        // Eliminar los espacios desocupados
                        for (let i = 0; i < num; i++) {
                            const freeSpace = await Space.findOne({ quadrant: quadrant._id, isOccupied: false });
                            if (freeSpace) {
                                await Space.deleteOne({ _id: freeSpace._id });
                                quadrant.spaces = quadrant.spaces.filter(space => space.toString() !== freeSpace._id.toString());
                            }
                        }
                        await quadrant.save();
                    
                        console.log(`Se eliminaron ${num} espacios desocupados correctamente`);
                        res.status(200).json({ message: `Se eliminaron ${num} espacios desocupados correctamente` });
                    }
                }
            
            }
        }else{
            res.status(404).json({ message: 'Cuadrante no encontrado' });
        }



    } catch (error) {
        console.log("Error en stockEspacio.controller.js -> deleteSpecifiedSpacesOnQuadrant(): ", error);
        res.status(500).json({ message: error.message });
    }
};

