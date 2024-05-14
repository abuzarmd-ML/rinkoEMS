import { useForm } from "react-hook-form"
import axiosInstance from "../../../services/axiosInstance"


const useAddEmployee = ()=>{
  const form = useForm({
    mode:'onBlur',
    defaultValues:{
      name:''
    }
  })

  const handleSubmitForm = (formData,e)=>{
   e.preventDefault()
   console.log('form-data',formData)
   axiosInstance({
    url: '/employees',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: formData
  }).then(response => {
            navigate('/dashboard');
  })
  .catch(error => {
    // Handle network errors or other exceptions
    console.error("Error in submitting employee form:", error);
    setError(true);
  });
  }


  return {
    form,handleSubmitForm
  }
}

export default useAddEmployee