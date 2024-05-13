import {  FormProvider } from "react-hook-form"
import useAddEmployee from "./useAddEmployee"

const EmployeeFormContext = ({ children }) => {
    const { form, handleSubmitForm } = useAddEmployee()
    return (
        <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(form)}>
                {children}
            </form>
        </FormProvider>
    )

}

export default EmployeeFormContext