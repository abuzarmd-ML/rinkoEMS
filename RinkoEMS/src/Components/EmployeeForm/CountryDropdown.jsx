import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function CountryDropdown() {
  const [countries, setCountries] = useState([]);

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

    <Select
      options={countries}
      placeholder="Select a country"
      
    />
    </div>
  );    
}

export default CountryDropdown;
