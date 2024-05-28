import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,Container,} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alerts from '../Alert';
import { getCompanyName } from '../../api/companyApi';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import axiosInstance from '../../services/axiosInstance';

const defaultTheme = createTheme();
const mandatoryError = 'This field is mandatory';

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

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);

  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      company: null,
      isAdmin: false,
    },
  });
  const { register, formState: { errors }, control, watch, handleSubmit } = form;
  const isAdmin = watch('isAdmin');
  const [companyList,setCompnayList] = React.useState([])

  axiosInstance.defaults.withCredentials = true;

  const onSubmit = (formData, event) => {
    event.preventDefault();
    axiosInstance
      .post('/login', {
        username: formData.username,
        password: formData.password,
        company: formData.company?.name, // Access the company name
        isAdmin: formData.isAdmin,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.loginStatus) {
            localStorage.setItem('valid', true);
            navigate('/dashboard');
          } else {
            setError(true);
          }
        } else {
          console.error('Server error:', response.statusText);
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setError(true);
      });
  };

  React.useEffect(()=>{
    getCompanyName().then((response)=>{
     setCompnayList([...response])
    })
  },[])
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                {...register('username', { required: { value: true, message: mandatoryError } })}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register('password', { required: { value: true, message: mandatoryError } })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {!isAdmin && (
                <SelectAutoComplete control={control} fieldName={'company'} label={'Select company'} options={companyList}  />
              )}
              <FormControlLabel
                control={
                  <Controller
                    name="isAdmin"
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
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
