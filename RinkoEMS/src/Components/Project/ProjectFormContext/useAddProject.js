import React from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import moment from "moment"

const useAddProject = (defaultValue) => {
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
    const payload = id ? { url: `/projectsById/${id}`, method: 'PUT' } : {
      url: '/projects',
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
        company: formData.company?.label ?? formData.company
      }
    }).then(response => {
      navigate('/project');
    })
      .catch(error => {
        // Handle network errors or other exceptions
        console.error("Error in submitting Project form:", error);
        setError(true);
      });
  }


  return {
    form, handleSubmitForm
  }
}

export default useAddProject