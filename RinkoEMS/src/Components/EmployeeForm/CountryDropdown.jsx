import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

const mandatoryError = 'This field is mandatory'

function CountryDropdown() {
  const [countries, setCountries] = useState([]);
  const { control, formState: { errors }, getValues } = useFormContext()
  console.log('errors', errors, getValues())
  useEffect(() => {
    // Fetch the list of countries from an API
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // Extract country names from the response data
        const countryNames = data.map(country => ({
          value: country.name.common,
          label: country.name.common
        }));
        setCountries(countryNames);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      <Controller
        name='country'
        control={control}
        rules={{
          required: {
            value: true,
            message: mandatoryError
          }
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              options={countries}
              placeholder="Select a country"
              value={countries.find((c) => c.value === value)}
              onChange={(country) => onChange(country.value)}

            />
          )
        }}
      />

    </div>
  );
}

export default CountryDropdown;
