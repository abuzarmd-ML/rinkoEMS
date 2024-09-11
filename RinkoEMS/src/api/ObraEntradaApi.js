
import axiosInstance from "../services/axiosInstance";

export async function fetchObraEntrada() {
  try {
    const response = await axiosInstance.get('/obraentradas');
    console.log("Data:...... ", response.data);
    return response.data; // axios automatically parses the response to JSON
  } catch (error) {
    console.error("Failed to fetch ObraEntradas:", error);
    throw new Error('Failed to fetch ObraEntradas');
  }
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
  