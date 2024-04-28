import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default function AttendanceInput() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  const daysInMonth = [];
  const currentDate = new Date(firstDayOfMonth);
  while (currentDate <= lastDayOfMonth) {
    daysInMonth.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h4" component="h3">
          Attendance
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Month"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} select fullWidth>
                    {months.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          {daysOfWeek.map((day, index) => (
            <Grid item xs key={index}>
              <Item>
                <Typography gutterBottom variant="h6" component="p">
                  {day}
                </Typography>
                {daysInMonth.map((date, idx) => {
                  if (date.getDay() === index) {
                    return (
                      <Item key={idx}>
                        <Typography variant="body1" component="p">
                          {date.getDate()}
                        </Typography>
                        <TextField
                          id={`hours-${idx}`}
                          label="Hours Worked"
                          variant="outlined"
                          fullWidth
                        />
                      </Item>
                    );
                  }
                  return null;
                })}
              </Item>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
