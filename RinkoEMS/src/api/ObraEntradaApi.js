// src/api/employeeApi.js
import axiosInstance from "../services/axiosInstance";

export async function fetchObraEntrada() {
    const response = await fetch('http://localhost:3000/obraentradas');
    if (!response.ok) {
        throw new Error('Failed to fetch Obra');
    }
    const data = await response.json();
    console.log("Dataaaaa: ",data)
    return data;
};

export const deleteObraEntrada = async (obraEntradaId) => {
  try {
    const response = await axiosInstance.delete(`/obraentradas/${obraEntradaId}`);
    console.log('Delete response:', response);
    return response.data;
  } catch (error) {
    console.error('Error deleting Obra:', error);
    throw error;
  }
};

  export const getObraEntradaId = async () => {
    try {
      const response = await axiosInstance.get('/obraentradas');
      return response.data;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
    
  };
  