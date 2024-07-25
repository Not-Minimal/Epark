// src/services/issue.service.js
import axios from "./root.service.js";

// Obtener todos los reclamos de un usuario específico
export async function getIssues() {
  try {
    const response = await axios.get("/issues/getIssues");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

// Obtener una incidencia específica por su ID
export async function getIssueById(id) {
  try {
    const response = await axios.get(`/getIssueById/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

// Crear una nueva incidencia
export async function createIssue(id, data) {
  try {
    const response = await axios.post(`/createIssue/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

// Eliminar una incidencia por su ID
export async function deleteIssue(id) {
  try {
    const response = await axios.delete(`/deleteIssueById/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
