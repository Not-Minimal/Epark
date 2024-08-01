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

export async function updatedVehicleByLicensePlate(licensePlate,data) {
  try {
    const response = await axios.put(`vehicle/updateVehicleByLicensePlate/${licensePlate}`,data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}