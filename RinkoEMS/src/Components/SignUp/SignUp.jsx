import React, { useState, useEffect  } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: ''
  });
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');
  const [progress, setProgress] = useState(0); // State to manage CircularProgress progress
 
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [signupSuccess, setSignupSuccess] = useState(false); 
 
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true); // Set loading state to true

      const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1)); // Increase progress by 10%
      }, 800); // Increase progress every 0.5 seconds (adjust as needed)

      const response = await axiosInstance({
        url: '/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: formData
      });

      clearInterval(interval); // Stop the progress interval

      setLoading(false); // Set loading state to false after successful signup
      if (response.status >= 200 && response.status < 300) {
        // Handle successful signup (e.g., show success message, redirect to login page)
        console.log('User created successfully');
        setSignupSuccessMessage('User created successfully');
        setSignupSuccess(true);

        setTimeout(() => {
          navigate('/login');
        }, 1500);
        // You may perform additional actions here, such as showing a success message or redirecting
      } else {
        // If the response status is not in the success range, throw an error
        throw new Error('Failed to create user');
      }
     } catch (error) {
      console.error('Error signing up:', error);
      
      // Handle signup error (e.g., display error message to user)
      setSignupErrorMessage('Failed to create user');
      setLoading(false); // Set loading state to false if signup fails
    }
  };

  useEffect(() => {
    if (loading) {
      setProgress(0); // Reset progress when loading starts
    }
  }, [loading]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {signupErrorMessage && <div style={{ color: 'red', fontWeight: 'bold' }}>Error: {signupErrorMessage}</div>}
          {signupSuccessMessage && <div style={{ color: 'green', fontWeight: 'bold' }}>Success: {signupSuccessMessage}</div>}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="role"
                  select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </TextField>
              </Grid>
            </Grid>
              {/* Conditional rendering for loading spinner/message */}
              {loading && (
                <CircularProgress color="secondary" />
            )}
           <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
            {signupSuccess ? 'Siging Up.....' : (
                    loading ? <CircularProgress value={progress} size={50} color="success"/> : 'Sign Up'
                  )}
            </Button>
          </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}