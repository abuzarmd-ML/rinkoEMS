import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import { getEmployeeId } from '../../api/employeeApi';

const EmployeeDetails = () => {
  const { control, watch, setValue } = useFormContext();
  const [employeesList, setEmployeeList] = useState([]);
  const selectedEmployeeId = watch('emp_id', '');

  // Fetch employee data from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployeeId();
        const formattedEmployees = response.map(employee => ({
          value: employee.employee_id,
          label: employee.name, // Show the employee name in the dropdown
          name: employee.name,
          social_security: employee.social_security,
          type: employee.type
        })).filter(employee => employee.value !== undefined && employee.value !== null);
        setEmployeeList(formattedEmployees);
      } catch (error) {
        console.error('Error fetching Employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle employee selection
  const handleEmployeeChange = (event) => {
    const selectedEmployeeId = event.target.value;
    const selectedEmployee = employeesList.find(employee => employee.value === selectedEmployeeId);
    
    if (selectedEmployee) {
      // Set form values based on selected employee
      setValue('emp_id', selectedEmployee.value);
      setValue('emp_name', selectedEmployee.name);
      setValue('emp_social_security', selectedEmployee.social_security);
      setValue('emp_type', selectedEmployee.type);
    } else {
      // Clear form values if no employee is selected
      setValue('emp_id', '');
      setValue('emp_name', '');
      setValue('emp_social_security', '');
      setValue('emp_type', '');
    }
  };

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Employee Details
          </Typography>
        </Grid>

        {/* Employee Name Dropdown */}
        <Grid item xs={6} sm={6}>
          <Controller
            name="emp_id" // Still binding to emp_id internally
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="outlined"
                label="Select Employee"
                onChange={(event) => {
                  field.onChange(event); // Update the form state
                  handleEmployeeChange(event); // Handle employee change
                }}
                value={selectedEmployeeId || ''}
              >
                <MenuItem value="" disabled>Select Employee Name</MenuItem>
                {employeesList.map(employee => (
                  <MenuItem key={employee.value} value={employee.value}>
                    {employee.label} {/* Show the employee name */}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Employee ID (Hidden or Read-Only) */}
        <Grid item xs={6} sm={6}>
          <TextField
            id="emp_id"
            fullWidth
            name="emp_id"
            label="Employee ID"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('emp_id') || ''}
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="emp_social_security"
            fullWidth
            name="emp_social_security"
            label="Employee Social Security"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('emp_social_security') || ''}
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="emp_type"
            fullWidth
            name="emp_type"
            label="Employee Type"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('emp_type') || ''}
          />
        </Grid>

        {/* Hidden Employee ID Field for Submission */}
        <input type="hidden" name="emp_id" value={selectedEmployeeId} />
      </Grid>
    </Cards>
  );
};

export default EmployeeDetails;
