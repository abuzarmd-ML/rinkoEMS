import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {Card,Button} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Divider } from '@mui/material';
import MonthYearPicker from "./MonthYearPicker";
import createCaleder from "./util/createCaleder";
import formatDate from "./util/formatDate";
import moment from "moment";

import axiosInstance from "../../services/axiosInstance";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default function AttendanceInput() {
  const [yearMonth, setYearMonth] = React.useState(new Date())
  const [calendar, setCalender] = React.useState([])

  const { handleSubmit, control,setValue, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Attendance Data:", data);
    const payload = {
        url: '/markAttendance',
        method: 'POST'
      }
    // id ? { url: `/clientsById/${id}`, method: 'PUT' } : {
    //   url: '/clients',
    //   method: 'POST'
    // }
    axiosInstance({
      ...payload,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }).then(response => {
      // navigate('/client');
      console.log('attendance updated')
    })
      .catch(error => {
        // Handle network errors or other exceptions
        console.error("Error in submitting client form:", error);
        setError(true);
      });
  };



  React.useEffect(() => {
    setCalender([...createCaleder(formatDate(yearMonth))])
    console.log('yearMonth', yearMonth)
  }, [yearMonth])

  const shouldDisbledMonth = (currentDate) => {
    const activeMonth = moment(yearMonth).format('MM')
    const currentMonth = moment(currentDate).format('MM')
    return activeMonth !== currentMonth
  }


  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={8}>
            <Typography gutterBottom variant="h4" component="h3">
              Create and update Attendance
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign={'right'}>

            <MonthYearPicker control={control} setValue={setValue} yearMonth={yearMonth} setYearMonth={setYearMonth} />

          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Divider sx={{ border: '0.5px solid', mt: "20px" }} />
        <Grid container spacing={2}>
          {daysOfWeek.map((days => {
            return (
              <Grid item xs={1.7} key={days}>
                <Item>
                  <Typography gutterBottom variant="h6" component="p">
                    {days}
                  </Typography>
                </Item>
              </Grid>
            )
          }))}
          {calendar.map((week, index) => {
            return (
              week.days.map((day) => {

                return (
                  <Grid item xs={1.7} key={day.date()}>
                    <Item>
                      {/* <TextField
                        id={`hours-${day.date()}`}
                        label={`${day.date()}`}
                        variant="outlined"
                        disabled={shouldDisbledMonth(day)}
                        fullWidth
                      /> */}
                      <Controller
                        name={`attendance.${day.date()}`}
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                          <TextField
                            {...field}

                            label={`${day.date()}`}
                            variant="outlined"
                            disabled={shouldDisbledMonth(day)}
                            fullWidth
                           
                          >

                          </TextField>
                        )}
                      />
                    </Item>
                  </Grid>
                )
              })

            )

          })}

        

        </Grid>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit Attendance
            </Button>
          </Box>
          </form>

      </CardContent>
    </Card>
  );
}
