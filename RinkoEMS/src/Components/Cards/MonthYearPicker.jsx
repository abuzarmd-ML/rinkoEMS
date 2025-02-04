import * as React from 'react';
import { useForm, Controller } from "react-hook-form";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function MonthYearPicker({ yearMonth, setYearMonth,control ,setValue}) {



  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs} >
    //   <DemoContainer components={['DatePicker']} sx={{ textAlign: "right" }}>
    //     <DatePicker label={' Select "month" and "year"'} defaultValue={dayjs(yearMonth)} views={['month', 'year']} onChange={(props) => {
    //     }}

    //       onYearChange={(year) => {
    //         setYearMonth(dayjs(year).format('YYYY-MM-DD'))
    //       }}

    //     />
    //   </DemoContainer>
    // </LocalizationProvider>
    <Controller
              name="yearMonth"
              control={control}
              rules={{ 
                required: 'Month and year selection is required',
                validate: value => value && dayjs(value).isValid() || 'Invalid date'
              }}
              defaultValue={dayjs()}
              render={({ field,fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']} sx={{ textAlign: "right" }}>
                    <DatePicker
                      {...field}
                      label={'Select "month" and "year"'}
                      views={['month', 'year']}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                        setValue("yearMonth", newValue);
                      }}
                      slotProps={{
                        textField: {
                          error: !!error,
                          helperText: error ? error.message : '',
                        }
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
  );
}


export default MonthYearPicker;
