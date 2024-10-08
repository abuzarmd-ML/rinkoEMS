// src/api/employeeApi.js
import axiosInstance from "../services/axiosInstance";

export async function fetchObra() {
    try {
        const response = await axiosInstance.get('/all_obra'); // Ensure you're calling the correct endpoint
        return response.data; // This should include company_name and company_address
    } catch (error) {
        console.error('Error fetching obras:', error);
        throw error;
    }
}

export const deleteObra = async (obraId) => {
    try {
      const response = await axiosInstance.delete(`/obras/${obraId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Obra:', error);
      throw error;
    }
};

export const getObraId = async () => {
    try {
      const response = await axiosInstance.get('/obras');
      return response.data;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
};
