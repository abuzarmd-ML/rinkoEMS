import axiosInstance from "../services/axiosInstance";

// Fetch filter data (company, obra, project, employee)
export const fetchFilterDataApi = async () => {
  try {
    const response = await axiosInstance.get('/filteredData');
    return response.data;
  } catch (error) {
    console.error('Error fetching filter data:', error);
    throw error;
  }
};

// Fetch attendance data based on selected filters
export const fetchAttendanceDataApi = async (filters) => {
  try {
    const response = await axiosInstance.get('/attendanceData', {
      params: filters, // Send filters as query parameters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    throw error;
  }
};

export const markAttendanceApi = async (attendanceData) => {
  try {
    const response = await axiosInstance.post('/markAttendance', attendanceData);
    return response.data;  // Return the response from the API
  } catch (error) {
    console.error('Error marking attendance:', error);
    throw error;  // Propagate the error for further handling
  }
};