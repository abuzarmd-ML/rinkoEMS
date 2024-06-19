import React from 'react'
import {  FormProvider } from "react-hook-form"
import useAddObra from "./useAddObra"
import axiosInstance from "../../../services/axiosInstance"
import { useParams } from "react-router-dom"

const ObraFormContext = ({ children }) => {
     const[defaultValue,setDefaultValues] = React.useState({name:''})
     const [isLoading,setIsloading] = React.useState(true)
    const { id } = useParams()


    React.useEffect(() => {
        if (id) {
         axiosInstance.get(`/obrasById/${id}`).then((response) => {
            console.log('data', response)
            setDefaultValues({...response.data})
            setIsloading(false)
          })
        }
    
      }, [id])

    const { form, handleSubmitForm } = useAddObra(defaultValue)
    if(isLoading && id){
        return <h2>Data loading</h2>
    }
    return (
        <FormProvider {...form} >

            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                {children}
            </form>
        </FormProvider>
    )

}

export default ObraFormContext