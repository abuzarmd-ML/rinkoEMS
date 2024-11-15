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
      company_name:defaultValue?.company_name??''
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
        company_name: formData.company_name?.label ?? formData.company_name,
        venc_days: moment(formData.venc_days).format('YYYY-MM-DD'),
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