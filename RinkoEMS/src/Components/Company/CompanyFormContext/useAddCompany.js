import React from "react"
import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import moment from "moment"

const useAddCompany = (defaultValue) => {
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
    const payload = id ? { url: `/companiesById/${id}`, method: 'PUT' } : {
      url: '/companies',
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
              status: formData.status?.label ?? formData.status,  
              country:formData.country?.label??formData.country,
              caducidad: moment(formData.caducidad).format('YYYY-MM-DD'),
 
      }
    }).then(response => {
      navigate('/company');
    })
      .catch(error => {
        // Handle network errors or other exceptions
        console.error("Error in submitting company form:", error);
        setError(true);
      });
  }
  return {
    form, handleSubmitForm
  }
}
export default useAddCompany



// const useAddCompany = (defaultValues) => {
//   console.log("Initializing form with default values:", defaultValues); // Debugging line
//   const form = useForm({
//     mode: 'onBlur',
//     defaultValues: defaultValues || {},
//     shouldUnregister: true,
//   });
  
//   const { id } = useParams();
//   const navigate = useNavigate();

//     const onSubmit = (formData) => {
//       const payload = id ? { url: `/companiesById/${id}`, method: 'PUT' } : {
//         url: '/companies',
//         method: 'POST'
//       };

//     const formattedData = {
//       ...formData,
//       status: formData.status?.label ?? formData.status,  
//       country:formData.country?.label??formData.country,
//       caducidad: moment(formData.caducidad).format('YYYY-MM-DD'),
//     };

//     console.log('Formatted data before submission:', formattedData);

//     axiosInstance({
//       ...payload,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: formattedData
//     }).then(response => {
//       navigate('/company');
//     }).catch(error => {
//       console.error("Error in submitting company form:", error);
//     });
//   };

//   return {
//     form,
//     handleSubmitForm: form.handleSubmit(onSubmit)
//   }
// }

// export default useAddCompany;
