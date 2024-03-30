import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Button, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import userInfoForm from './userInfoForm';


const mandatoryError = 'This field is mandatory'

const UserForm = React.forwardRef(({ userAddress }, ref) => {
    const form = userInfoForm(userAddress)
    const { register, formState: { errors }, control, handleSubmit } = form

    React.useImperativeHandle(ref, () => ({
        handleFormSubmit() {
            return handleSubmit
        }
    }))


    return (
        <React.Fragment>
            {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
            <FormProvider {...form}>
                <form >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="userName"
                                name="userName"
                                label="User Name"
                                {...register('userName', {
                                    required: {
                                        value: true,
                                        message: mandatoryError
                                    }
                                })}
                                error={errors['userName']}
                                helperText={errors['userName'] ? errors['userName'].message : ""}
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                type='password'
                                label="Password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: mandatoryError
                                    }
                                })}
                                error={errors['password']}
                                helperText={errors['password'] ? errors['password'].message : ""}
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <InputLabel id="level-label">Level</InputLabel>
                            {/* <Controller
                                name="level"
                                id="level"
                                // defaultValue={level}
                                control={control}
                                render={({ field }) => (
                                    <Select labelId="level-label" {...field}>
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                    </Select>
                                )}
                            /> */}
                            <FormHelperText error={true}>{errors.level?.message}</FormHelperText>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {'Submit'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>

        </React.Fragment>
    );
})

UserForm.displayName = 'MuiBookingForms';


export default UserForm

// required: true,
// fieldName: COUNTRY_LIST,
// control,
// options: CountryList,
// isError: !!genderError,
// errorMessage: genderError,