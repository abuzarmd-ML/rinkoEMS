import React from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import moment from "moment"

const useAddClient = (defaultValue) => {
  const form = useForm({
    mode: 'onBlur',
    values: { ...defaultValue,
      client:defaultValue?.client_id??''
     }
  })

  const { id } = useParams()
  console.log(form.error)
  const navigate = useNavigate()
  const handleSubmitForm = (formData, e) => {
    const payload = id ? { url: `/clientsById/${id}`, method: 'PUT' } : {
      url: '/clients',
      method: 'POST'
    }
    e.preventDefault()
    console.log('form-data.......', formData)

      // Filter out unwanted fields
    const { client, ...filteredData } = formData;
    axiosInstance({
      ...payload,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        ...filteredData,
        status:formData.status?.label??formData.status,
        country:formData.country?.label??formData.country,
        note: formData.note?.label??formData.note,
        company: formData.company?.label??formData.company
      }
    }).then(response => {
      navigate('/client');
    })
      .catch(error => {
        // Handle network errors or other exceptions
        console.error("Error in submitting client form:", error);
        setError(true);
      });
  }
  return {
    form, handleSubmitForm
  }
}

export default useAddClient

