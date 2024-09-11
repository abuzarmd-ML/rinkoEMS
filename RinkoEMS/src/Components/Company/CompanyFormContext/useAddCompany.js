import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";

const useAddCompany = (defaultValue) => {
  const form = useForm({
    mode: 'onBlur',
    defaultValues: defaultValue || {}, // Use defaultValues to initialize the form
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmitForm = (formData, e) => {
    e.preventDefault();
    console.log('form-data', formData);
    
    const payload = id 
      ? { url: `/companiesById/${id}`, method: 'PUT' }
      : { url: '/companies', method: 'POST' };
    
    // Filter out unwanted fields
    const { company, ...filteredData } = formData;
    
    axiosInstance({
      ...payload,
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...filteredData,
        status: formData.status?.label ?? formData.status, // Ensure status is a string
        country: formData.country?.label ?? formData.country, // Ensure country is a string
        caducidad: moment(formData.caducidad).format('YYYY-MM-DD'), // Ensure proper date format
        color: formData.color?.label ?? formData.color // Extract color label or pass as is
      }
    })
    .then(response => navigate('/company'))
    .catch(error => {
      console.error("Error in submitting company form:", error);
    });
  };

  return { form, handleSubmitForm };
};

export default useAddCompany;
