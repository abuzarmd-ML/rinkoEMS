import axiosInstance from "../services/axiosInstance";

export async function fetchEmployees() {
  try {
    const response = await axiosInstance.get('http://localhost:3000/employees');
    const data = await response.data;

    return data;
  } catch (e) {
    return []
  }

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
