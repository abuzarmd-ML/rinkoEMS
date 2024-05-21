import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

export default function Checkbox(props) {
    const { name, label, value, onChange } = props;

    // Define conversion function to handle event parameter
    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    });

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MuiCheckbox
                        name={name}
                        color="primary"
                        checked={value}
                        onChange={(e) => onChange(convertToDefEventPara(name, e.target.checked))}
                    />
                }
                label={label}
            />
        </FormControl>
    );
}
