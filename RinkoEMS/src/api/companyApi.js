import axiosInstance from "../services/axiosInstance";

export const getCompanyName = async () => {
  try {
    const response = await axiosInstance.get('/companies');
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};
