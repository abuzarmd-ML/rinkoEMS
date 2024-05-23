import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function MonthYearPicker({ yearMonth, setYearMonth }) {



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DatePicker']} sx={{ textAlign: "right" }}>
        <DatePicker label={' Select "month" and "year"'} defaultValue={dayjs(yearMonth)} views={['month', 'year']} onChange={(props) => {
        }}

          onYearChange={(year) => {
            setYearMonth(dayjs(year).format('YYYY-MM-DD'))
          }}

        />
      </DemoContainer>
    </LocalizationProvider>
  );
}


export default MonthYearPicker;
