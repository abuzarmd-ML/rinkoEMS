import axiosInstance from "../services/axiosInstance";

export async function fetchCompanies() {
  const response = await fetch('http://localhost:3000/employees');
  if (!response.ok) {
      throw new Error('Failed to fetch Companies');
  }
  const data = await response.json();
  console.log("Dataaaaa: ",data)
  return data;
};

export const deleteCompany = async (employeeId) => {
  try {
    const response = await axiosInstance.delete(`/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Company:', error);
    throw error;
  }
};


export const getCompanyName = async () => {
  try {
    const response = await axiosInstance.get('/companies');
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const getAllCompany = async () => {
  try {
    const response = await axiosInstance.get('/all_company');
    return response.data;
  } catch (error) {
    console.error('Error fetching all companies:', error);
    throw error;
  }
};
