import axios from "./root.service.js";

// Obtener vehículo por patente
export async function getVehicleByLicensePlate(licensePlate) {
  try {
    const response = await axios.get(`vehicle/getVehicleByLicensePlate/${licensePlate}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}