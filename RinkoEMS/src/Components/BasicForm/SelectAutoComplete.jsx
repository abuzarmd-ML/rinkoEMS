import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

export default function SelectAutoComplete(props) {
  const { control, fieldName, label, options, defaultValue} = props;
  const apiValue = defaultValue ? { label: defaultValue } : null
  console.log("#####", props)
  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={apiValue}
      rules={{
        required: {
          value: true,
          message: "This fields is required",
        },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            autoHighlight
            options={options}
            onChange={(_, data) => {
              console.log('data', data)
              field.onChange(data || null);
            }}
            filterOptions={createFilterOptions({ matchFrom: 'start' })}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label || fieldName || ""}
                error={error}
                helperText={error ? error.message : ""}
                variant="outlined"
              />
            )}
          />
        );
      }}
    />
  );
}