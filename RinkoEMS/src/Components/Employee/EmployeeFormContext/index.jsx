// EmployeeFormContext.js
import React, { useEffect, useState } from 'react';
import { FormProvider } from "react-hook-form";
import useAddEmployee from "./useAddEmployee";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";

const EmployeeFormContext = ({ children }) => {
  const [defaultValue, setDefaultValues] = useState({ name: '', documents: {} });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  console.log("Employee ID:", id); // Log the id before making the request


  useEffect(() => {
    if (id) {
      axiosInstance.get(`/employeesById/${id}`).then((response) => {
        console.log("Employee data response:", response); // Log response data
        setDefaultValues({
          ...response.data,
          documents: response.data.documents || {}
        });
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const { form, handleSubmitForm } = useAddEmployee(defaultValue);

  if (isLoading && id) {
    return <h2>Data loading</h2>;
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        {children}
       {/*  */}
      </form>
    </FormProvider>
  );
};

export default EmployeeFormContext;
