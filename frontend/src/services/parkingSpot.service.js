import axios from "./root.service.js";

//Ver espacios disponibles
export async function viewFreeSpaces(quadrantId){
    try {
        
        const response = await axios.get(`/parkingStock/getAvailableSpacesOnQuadrant/${quadrantId}`);
        return response.data;

    } catch (error) {
        throw error.response?.data || error.message;
    }
}
//Ver espacios ocupados
export async function viewOccupiedSpaces(quadrantId){
    try {
        
        const response = await axios.get(`/parkingStock/getOccupiedSpacesOnQuadrant/${quadrantId}`);
        return response.data;

    } catch (error) {
        throw error.response?.data || error.message;
    }
}


//Eliminar un espacio
export async function deleteOneSpace(quadrantId){
    try {
        
        const response = await axios.delete(`/parkingStock/deleteSpaceOnQuadrant/${quadrantId}`);
        console.log(`Delete one space id : ${quadrantId}`)
        return response;

    } catch (error) {
        throw error.response?.data || error.message;
    }
}
