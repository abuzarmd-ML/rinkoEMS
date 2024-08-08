// src/api/employeeApi.js
import axiosInstance from "../services/axiosInstance";

export async function fetchProjects() {
    const response = await fetch('http://localhost:3000/projects');
    if (!response.ok) {
        throw new Error('Failed to fetch Clients');
    }
    const data = await response.json();
    console.log("Dataaaaa: ",data)
    return data;
};

export const deleteProjects = async (projectId) => {
    try {
      const response = await axiosInstance.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  export const getProjectId = async () => {
    try {
      const response = await axiosInstance.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    
  };
  