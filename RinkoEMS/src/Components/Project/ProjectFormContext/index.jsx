import React from 'react';
import { FormProvider } from 'react-hook-form';
import useAddProject from './useAddProject';
import axiosInstance from '../../../services/axiosInstance';
import { useParams } from 'react-router-dom';

const ProjectFormContext = ({ children }) => {
  const [defaultValue, setDefaultValues] = React.useState({
    comunidad_name: '',
    fact_email: '',
    obra_id: '',
    venc_days: null,
    nie: '',
    cudad_id: null,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/projectsById/${id}`);
          if (response.data) {
            setDefaultValues({
              ...response.data,
              venc_days: response.data.venc_days
                ? new Date(response.data.venc_days)
                : null,
            });
          }
        } catch (error) {
          console.error('Error fetching project by ID:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const { form, handleSubmitForm } = useAddProject(defaultValue);

  if (isLoading && id) {
    return <h2>Data loading</h2>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ProjectFormContext;
