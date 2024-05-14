import {  FormProvider } from "react-hook-form"
import useAddEmployee from "./useAddEmployee"

const EmployeeFormContext = ({ children }) => {
    const { form, handleSubmitForm } = useAddEmployee()
    return (
        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                {children}
            </form>
        </FormProvider>
    )

}

export default EmployeeFormContext