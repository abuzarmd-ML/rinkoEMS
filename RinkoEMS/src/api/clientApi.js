// src/api/employeeApi.js
import axiosInstance from "../services/axiosInstance";

export async function fetchClient() {
    const response = await fetch('http://localhost:3000/clients');
    if (!response.ok) {
        throw new Error('Failed to fetch Clients');
    }
    const data = await response.json();
    console.log("Dataaaaa: ",data)
    return data;
};


export const deleteClient = async (clientId) => {
    try {
      const response = await axiosInstance.delete(`/clients/${clientId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Client:', error);
      throw error;
    }
  };