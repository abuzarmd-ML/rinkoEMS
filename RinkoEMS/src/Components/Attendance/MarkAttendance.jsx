import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Grid } from '@mui/material';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import AttendanceInput from '../Cards/AttendanceInput';
import { fetchFilterDataApi } from '../../api/AttendanceApi';
import AdminLayout from '../Layout/AdminLayout';
import { fetchEmployees } from '../../api/employeeApi';

const MarkAttendance = () => {
  const { emp_id } = useParams(); // Extract employee ID from the URL
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employeeImage, setEmployeeImage] = useState(null); // To store the employee photo URL


  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const data = await fetchFilterDataApi(emp_id);
  
        // Filter the data to get the correct employee
        const filteredEmployee = data.obraEntradas.find(entry => entry.emp_id === parseInt(emp_id));
        console.log(".......", filteredEmployee)
  
        if (filteredEmployee) {
          setEmployeeDetails(filteredEmployee);
          fetchEmployeeImage(filteredEmployee.emp_id); // Fetch employee image using emp_id
        } else {
          console.error("No matching employee found with emp_id:", emp_id);
        }
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
      }
    };
    
    fetchEmployeeDetails();
  }, [emp_id]);
  
  
  // Fetch employee image URL based on emp_id
  const fetchEmployeeImage = async (employeeId) => {
    try {
      const data = await fetchEmployees(employeeId); // Fetch employee data
      if (data && data.file_path) {
        setEmployeeImage(data.file_path); // Set the photo_url to state
      } else {
        console.error("No photo URL found for employee");
      }
    } catch (error) {
      console.error('Failed to fetch employee image:', error);
    }
  };

  

  useEffect(() => {
    console.log('Employee Details:', employeeDetails);
    console.log('Employee Image:', employeeImage);
  }, [employeeDetails, employeeImage]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Here you can trigger the attendance marking API
    console.log("Selected date for attendance:", date);
  };

  return (
    <AdminLayout title="Attendance System">
      <Box sx={{ mt: 7, ml: 3, mr: 3 }}>
        {employeeDetails ? (
          <Paper elevation={3} sx={{ p: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Avatar
                  alt={employeeDetails.emp_name}
                  src={employeeImage || '/path/to/default-image.jpg'} // Fallback to default image if no image URL
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs={9}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {employeeDetails.emp_name}
                </Typography>
                <Typography variant="subtitle1"><strong>Employee ID:</strong> {employeeDetails.emp_id}</Typography>
                <Typography variant="subtitle1"><strong>Company Name:</strong> {employeeDetails.company_name}</Typography>
                <Typography variant="subtitle1"><strong>Company Status:</strong> {employeeDetails.company_status}</Typography>
                <Typography variant="subtitle1"><strong>Project Name:</strong> {employeeDetails.project_name}</Typography>
                <Typography variant="subtitle1"><strong>Obra Name:</strong> {employeeDetails.obra_name}</Typography>
              </Grid>
            </Grid>
            <Box sx={{  mt: 5, width: '70%', mx: 'auto' , ml:1 }}>
              <AttendanceInput />
              {/* You can add more attendance marking logic here */}
            </Box>
          </Paper>
        ) : (
          <Typography variant="h6">Loading employee details...</Typography>
        )}
      </Box>
    </AdminLayout>
  );
};

export default MarkAttendance;
