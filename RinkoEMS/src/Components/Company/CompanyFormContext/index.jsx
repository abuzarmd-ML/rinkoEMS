import React from 'react';
import { FormProvider } from 'react-hook-form';
import axiosInstance from '../../../services/axiosInstance';
import { useParams } from 'react-router-dom';
import useAddCompany from './useAddCompany';

const CompanyFormContext = ({ children }) => {
  const [defaultValues, setDefaultValues] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      axiosInstance.get(`/companiesById/${id}`).then((response) => {
        console.log("Fetched company data:", response.data);
        setDefaultValues(response.data);
        setIsLoading(false);
      }).catch(error => {
        console.error("Error fetching company details:", error);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const { form, handleSubmitForm } = useAddCompany(defaultValues);

  React.useEffect(() => {
    if (!isLoading) {
      console.log("Default values:", defaultValues);
      form.reset(defaultValues); // Reset form values whenever defaultValues change
    }
  }, [defaultValues, isLoading, form]);

  if (isLoading) {
    return <h2>Data loading...</h2>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default CompanyFormContext;
