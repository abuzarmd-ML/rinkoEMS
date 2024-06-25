import React from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import moment from "moment"

const useAddEmployee = (defaultValue) => {
  const form = useForm({
    mode: 'onBlur',
    values: { ...defaultValue,
      company:defaultValue?.company_id??''
     }
  })

  const { id } = useParams()

  console.log(form.error)
  const navigate = useNavigate()
  const handleSubmitForm = (formData, e) => {
    const payload = id ? { url: `/employeesById/${id}`, method: 'PUT' } : {
      url: '/employees',
      method: 'POST'
    }
    e.preventDefault()
    console.log('form-data', formData)
    axiosInstance({
      ...payload,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        ...formData,
        type:formData.type?.label??formData.type,
        status:formData.status?.label??formData.status,
        country:formData.country?.label??formData.country,
        dob: moment(formData.dob).format('YYYY-MM-DD'),
        caducidad: moment(formData.caducidad).format('YYYY-MM-DD'),
        company: formData.company?.value??formData.company
      }
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