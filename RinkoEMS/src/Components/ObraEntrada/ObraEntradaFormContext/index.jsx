import React from 'react'
import {  FormProvider } from "react-hook-form"
import useAddObra from "./useAddObraEntrada"
import axiosInstance from "../../../services/axiosInstance"
import { useParams } from "react-router-dom"
import useAddObraEntrada from './useAddObraEntrada'

const ObraEntradaFormContext = ({ children }) => {
     const[defaultValue,setDefaultValues] = React.useState({name:''})
     const [isLoading,setIsloading] = React.useState(true)
    const { id } = useParams()


    React.useEffect(() => {
        if (id) {
         axiosInstance.get(`/obraentradasById/${id}`).then((response) => {
            console.log('data',  response.data.company)
            setDefaultValues({...response.data})
            setIsloading(false)
          })
        }
    
      }, [id])

    const { form, handleSubmitForm } = useAddObraEntrada(defaultValue)
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

export default ObraEntradaFormContext