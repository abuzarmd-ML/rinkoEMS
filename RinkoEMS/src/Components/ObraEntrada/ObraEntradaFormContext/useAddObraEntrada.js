import React from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import moment from "moment"

const useAddObraEntrada = (defaultValue) => {
  const form = useForm({
    mode: 'onBlur',
    values: { ...defaultValue,
      obraentrada:defaultValue?.obraentrada_id??'',
      name:defaultValue?.obraentrada_name??'',
      work_date:defaultValue?.work_date??'',
     }
  })

  const { id } = useParams()

  console.log(form.error)
  const navigate = useNavigate()
  const handleSubmitForm = (formData, e) => {
    const payload = id ? { url: `/obraentradasById/${id}`, method: 'PUT' } : {
      url: '/obraentradas',
      method: 'POST'
    }
    e.preventDefault()
    
    console.log('obra all data: ', formData)

    // Filter out unwanted fields
    const { obraentrada,name, ...filteredData } = formData;
    axiosInstance({
      ...payload,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        ...filteredData,
        status:formData.status?.label??formData.status,
        company: formData.company?.label ?? formData.company,
        work_date: formData.work_date?.label ?? formData.work_date
      }
    }).then(response => {
      navigate('/obra_entrada');
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

export default useAddObraEntrada