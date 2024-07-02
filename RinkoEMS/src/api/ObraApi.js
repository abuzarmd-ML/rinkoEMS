// src/api/employeeApi.js
import axiosInstance from "../services/axiosInstance";

export async function fetchObra() {
    const response = await fetch('http://localhost:3000/obras');
    if (!response.ok) {
        throw new Error('Failed to fetch Obra');
    }
    const data = await response.json();
    console.log("Dataaaaa: ",data)
    return data;
};

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
  