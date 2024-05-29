// src/api/employeeApi.js
import axiosInstance from "../services/axiosInstance";

export async function fetchEmployees() {
    const response = await fetch('http://localhost:3000/employees');
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    console.log("Dataaaaa: ",data)
    return data;
};

export const deleteEmployee = async (employeeId) => {
    try {
      const response = await axiosInstance.delete(`/employees/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };
