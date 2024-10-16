import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Grid } from '@mui/material';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import Calendar from 'react-calendar'; // Install this library: npm install react-calendar
import 'react-calendar/dist/Calendar.css'; // Import calendar CSS
import AttendanceInput from '../Cards/AttendanceInput';
import { fetchFilterDataApi } from '../../api/AttendanceApi';

const MarkAttendance = () => {
  const { emp_id } = useParams(); // Extract employee ID from the URL
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const data = await fetchFilterDataApi(emp_id);
  
        // Filter the data to get the correct employee
        const filteredEmployee = data.obraEntradas.find(entry => entry.emp_id === parseInt(emp_id));
  
        if (filteredEmployee) {
          setEmployeeDetails(filteredEmployee);
        } else {
          console.error("No matching employee found with emp_id:", emp_id);
        }
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
      }
    };
    
    fetchEmployeeDetails();
  }, [emp_id]);

  
  useEffect(() => {
    console.log('Employee Details:', employeeDetails);
  }, [employeeDetails]);
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Here you can trigger the attendance marking API
    console.log("Selected date for attendance:", date);
  };

  return (
    <Box sx={{ mt: 1, ml: 3, mr: 3 }}>
      {employeeDetails ? (
        <Paper elevation={3} sx={{ p: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Avatar
                alt={employeeDetails.emp_name}
                src={employeeDetails.photo_url} // Assuming photo_url is available
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
          <Box sx={{  mt: 5, width: '50%', mx: 'auto' , ml:1 }}>
            <AttendanceInput />
            {/* You can add more attendance marking logic here */}
          </Box>
        </Paper>
      ) : (
        <Typography variant="h6">Loading employee details...</Typography>
      )}
    </Box>
  );
};

export default MarkAttendance;
