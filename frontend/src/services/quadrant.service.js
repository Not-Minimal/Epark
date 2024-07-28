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