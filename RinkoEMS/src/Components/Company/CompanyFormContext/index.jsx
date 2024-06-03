import React from 'react'
import {  FormProvider } from "react-hook-form"
import useAddClient from './useAddCompany'
import axiosInstance from "../../../services/axiosInstance"
import { useParams } from "react-router-dom"
import useAddCompany from './useAddCompany'

const CompanyFormContext = ({ children }) => {
     const[defaultValue,setDefaultValues] = React.useState({name:''})
     const [isLoading,setIsloading] = React.useState(true)
    const { id } = useParams()


    React.useEffect(() => {
        if (id) {
         axiosInstance.get(`/companiesById/${id}`).then((response) => {
            console.log('data', response)
            setDefaultValues({...response.data})
            setIsloading(false)
          })
        }
    
      }, [id])

    const { form, handleSubmitForm } = useAddCompany(defaultValue)
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

export default CompanyFormContext