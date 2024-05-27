import React from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"
import { useNavigate } from 'react-router-dom'

const useAddEmployee = (defaultValue) => {
  const form = useForm({
    mode: 'onBlur',
    values: {...defaultValue}
  })


  console.log(form.error)
  const navigate = useNavigate()
  const handleSubmitForm = (formData, e) => {
    e.preventDefault()
    console.log('form-data', formData)
    axiosInstance({
      url: '/employees',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    }).then(response => {
      navigate('/employee');
    })
      .catch(error => {
        // Handle network errors or other exceptions
        console.error("Error in submitting employee form:", error);
        setError(true);
      });
  }


  return {
    form, handleSubmitForm
  }
}

export default useAddEmployee