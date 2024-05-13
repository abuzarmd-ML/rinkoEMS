import { useForm } from "react-hook-form"


const useAddEmployee = ()=>{
  const form = useForm({
    mode:'onBlur',
    defaultValues:{
      firstName:''
    }
  })

  const handleSubmitForm = (data)=>{
   console.log('form-data',data)
  }


  return {
    form,handleSubmitForm
  }
}

export default useAddEmployee