import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

export default function SelectAutoComplete(props) {
  const { control, options, fieldName, defaultValue, label, onChange } = props;
  const apiValue = defaultValue ? { label: defaultValue } : null;

  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={apiValue}
      rules={{
        required: {
          value: true,
          message: "This field is required",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          autoHighlight
          options={options}
          getOptionLabel={(option) => (option && option.label ? option.label.toString() : '')} // Ensure label is a string
          onChange={(_, data) => {
            field.onChange(data || null);
            if (onChange) {
              onChange(data); // Call the onChange handler passed as prop
            }
          }}
          filterOptions={createFilterOptions({ matchFrom: 'start' })}
          isOptionEqualToValue={(option, value) => option.value === value.value} // Custom equality check
          renderInput={(params) => (
            <TextField
              {...params}
              label={label || fieldName || ""}
              error={!!error}
              helperText={error ? error.message : ""}
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
}
