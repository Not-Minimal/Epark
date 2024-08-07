import axios from "./root.service.js";

//* Crear un nuevo cuadrante

export async function createQuadrant(data) {
    try {
      const response = await axios.post(`/quadrant/CreateQuadrant`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
}

//* Actualizar cuadrante por ID

export async function updateQuadrant(id,data){
  try{
    const response = await axios.put(`/quadrant/UpdateQuadrantID/${id}`, data);
    return response.data;
  }catch(error){
    throw error.response?.data || error.message;
  }
}

//* Obtener todos los cuadrantes 

export async function getQuadrant(){
  try{
    const response = await axios.get(`/quadrant/GetQuadrants`);
    return response.data;
  }catch(error){
    throw error.response?.data || error.message;
  }
}
