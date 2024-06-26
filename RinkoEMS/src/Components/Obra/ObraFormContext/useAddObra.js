import React from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import moment from "moment"

const useAddObra = (defaultValue) => {
  const form = useForm({
    mode: 'onBlur',
    values: { ...defaultValue,
      obra:defaultValue?.obra_id??''
     }
  })

  const { id } = useParams()

  console.log(form.error)
  const navigate = useNavigate()
  const handleSubmitForm = (formData, e) => {
    const payload = id ? { url: `/obrasById/${id}`, method: 'PUT' } : {
      url: '/obras',
      method: 'POST'
    }
    e.preventDefault()
    
    console.log('obra all data: ', formData)

    // Filter out unwanted fields
    const { obra, ...filteredData } = formData;
    axiosInstance({
      ...payload,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        ...filteredData,
        status:formData.status?.label??formData.status,
        company: formData.company?.label ?? formData.company
      }
    }).then(response => {
      navigate('/obra');
    })
      .catch(error => {
        // Handle network errors or other exceptions
        console.error("Error in submitting obra form:", error);
        setError(true);
      });
  }


  return {
    form, handleSubmitForm
  }
}

export default useAddObra