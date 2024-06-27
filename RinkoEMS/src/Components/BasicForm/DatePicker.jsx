import * as React from "react";
import moment from "moment";
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export default function BasicDatePicker(props) {
    const { control, fieldName, label, size = "large", minDate, ...rest } = props;

    return (
        <Controller
            control={control}
            name={fieldName}
            rules={rest.require || {
                required: {
                    value: true,
                    message: "This field is required",
                }
            }}
            render={({ field, fieldState: { error } }) => {
                const { value } = field;

                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    fullWidth: true,
                                    helperText: error ? error.message : '',
                                },
                            }}
                            label={label}
                            value={value ? dayjs(new Date(value)) : null} // Correctly handle null or undefined values
                            onChange={(newValue) => {
                                const dateString = newValue ? moment(new Date(newValue)).format('YYYY-MM-DD').toString() : null;
                                field.onChange(dateString);
                            }}
                        />
                    </LocalizationProvider>
                );
            }}
        />
    );
}
