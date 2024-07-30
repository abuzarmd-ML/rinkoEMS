import axiosInstance from "../services/axiosInstance";


export async function fetchCompanyColors() {
    try {
        const response = await axiosInstance.get('/company_colors_options');
        const data = await response.data;
    
        return data;
      } catch (e) {
        return []
      }
    };
export async function fetchEmployeeStatus() {
try {
    const response = await axiosInstance.get('/employee_status_options');
    const data = await response.data;

    return data;
    } catch (e) {
    return []
    }
};

export async function fetchEmployeeTypes() {
    try {
        const response = await axiosInstance.get('/employee_type_options');
        const data = await response.data;
    
        return data;
        } catch (e) {
        return []
        }
};

export async function fetchStatusOptions() {
    try {
        const response = await axiosInstance.get('/status_options');
        const data = await response.data;
    
        return data;
        } catch (e) {
        return []
        }
};