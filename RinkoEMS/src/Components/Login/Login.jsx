import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { FormProvider, Controller } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alerts from '../Alert';
import AutoCompleteDropdown from '../AutoCompleteDropdown';
import axiosInstance from '../../services/axiosInstance';


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
const mandatoryError = 'This field is mandatory'

export default function Login() {
  const navigate = useNavigate()
  const [error,setError] = React.useState(false)
  axiosInstance.defaults.withCredentials = true;
  const onSubmit = (formData,event) => {
    event.preventDefault();
    axiosInstance.post('/login', {
      username: formData.username,
      password: formData.password,
      isAdmin: formData.isAdmin
    })
    .then(response => {
      if (response.status === 200) {
          // Assuming loginStatus is returned as true for successful login
          if (response.data.loginStatus) {
              localStorage.setItem("valid", true);
              console.log("Redirecting to dashboard...");
              navigate('/dashboard');
          } else {
              setError(true);
          }
      } else {
          // Handle server errors here
          console.error("Server error:", response.statusText);
          setError(true);
      }
    })
    .catch(error => {
      // Handle network errors or other exceptions
      console.error("Error logging in:", error);
      setError(true);
    });
  }
    
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      username: '',
      password: '',
      isAdmin: false
    }
  });
  const { register, formState: { errors }, control, watch, handleSubmit } = form;

  const isAdmin = watch('isAdmin');
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
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <Alerts error={error} type="error" message="Invalid username or password" />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  {...register('username', {
                    required: {
                      value: true,
                      message: mandatoryError
                    }
                  })}
                  error={errors['username']}
                  helperText={errors['username'] ? errors['username'].message : ""}
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  {...register('password', {
                    required: {
                      value: true,
                      message: mandatoryError
                    }
                  })}
                  error={errors['password']}
                  helperText={errors['password'] ? errors['password'].message : ""}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                
                {!isAdmin && (<AutoCompleteDropdown />)}

                <FormControlLabel
                  control={
                    <Controller
                      name={'isAdmin'}
                      control={control}
                      render={({ field: props }) => (
                        <Checkbox
                          {...props}
                          checked={props.value}
                          onChange={(e) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label="Login as Super Admin"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </FormProvider>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
