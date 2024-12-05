import { useForm } from "react-hook-form";
import axiosInstance from "../../../services/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

const useAddEmployee = (defaultValue) => {
  const form = useForm({
    mode: 'onBlur',
    defaultValues: defaultValue,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Load employee data for updating
  const loadEmployeeData = async () => {
    try {
      const response = await axiosInstance.get(`/employeesById/${id}`);
      const employeeData = response.data;

      const formattedData = {
        ...employeeData,
        type: { label: employeeData.type, value: employeeData.type },
        status: { label: employeeData.status, value: employeeData.status },
        country: { label: employeeData.country, value: employeeData.country },
        dob: moment(employeeData.dob).toDate(),
        caducidad: moment(employeeData.caducidad).toDate(),
        company: { label: employeeData.company_name, value: employeeData.company_id },
        documents: {
          photo: employeeData.documents.find(doc => doc.type === 'photo')?.path || "",
          resume: employeeData.documents.find(doc => doc.type === 'resume')?.path || "",
          nie: employeeData.documents.find(doc => doc.type === 'nieDoc')?.path || "",
          license: employeeData.documents.find(doc => doc.type === 'license')?.path || "",
          contract: employeeData.documents.find(doc => doc.type === 'contract')?.path || ""
        }
      };

      form.reset(formattedData);
    } catch (error) {
      console.error("Error loading employee data:", error);
    }
  };

  useEffect(() => {
    console.log("Loading employee data...");
    if (id) {
      loadEmployeeData();
    }
  }, [id]);

  // const handleSubmitForm = async (formData) => {
  //   const payload = new FormData();

  //   const data = {
  //     ...formData,
  //     type: formData.type?.label ?? formData.type,
  //     status: formData.status?.label ?? formData.status,
  //     country: formData.country?.label ?? formData.country,
  //     dob: moment(formData.dob).format('YYYY-MM-DD'),
  //     caducidad: moment(formData.caducidad).format('YYYY-MM-DD'),
  //     company: formData.company?.value ?? formData.company,
  //   };

  //   Object.entries(data).forEach(([key, value]) => {
  //     if (key === 'country' || key === 'company' || key === 'type' || key === 'status') {
  //       if (value && typeof value === 'object' && value.id) {
  //         payload.append(key, value.id);
  //       } else {
  //         payload.append(key, value);
  //       }
  //     } else if (key !== 'documents') {
  //       payload.append(key, value);
  //     }
  //   });

  //   // Append only new files if they are selected
  //   if (formData.documents) {
  //     if (formData.documents.photo instanceof File) {
  //       payload.append('photo', formData.documents.photo);
  //     }
  //     if (formData.documents.resume instanceof File) {
  //       payload.append('resume', formData.documents.resume);
  //     }
  //     if (formData.documents.nie instanceof File) {
  //       payload.append('nieDoc', formData.documents.nie);
  //     }
  //     if (formData.documents.license instanceof File) {
  //       payload.append('license', formData.documents.license);
  //     }
  //     if (formData.documents.contract instanceof File) {
  //       payload.append('contract', formData.documents.contract);
  //     }
  //   }

  //   const apiPayload = id
  //     ? { url: `/employeesById/${id}`, method: 'PUT' }
  //     : { url: '/employees', method: 'POST' };

  //   try {
  //     await axiosInstance({
  //       ...apiPayload,
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       data: payload,
  //     });
  //     navigate('/employee');
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  // const handleSubmitForm = async (formData) => {
  //   const payload = new FormData();
  
  //   // Format the regular fields first
  //   const data = {
  //     ...formData,
  //     type: formData.type?.label ?? formData.type,
  //     status: formData.status?.label ?? formData.status,
  //     country: formData.country?.label ?? formData.country,
  //     dob: moment(formData.dob).format('YYYY-MM-DD'),
  //     caducidad: moment(formData.caducidad).format('YYYY-MM-DD'),
  //     company: formData.company?.value ?? formData.company,
  //   };
  
  //   // Append all the fields to FormData
  //   Object.entries(data).forEach(([key, value]) => {
  //     if (key === 'country' || key === 'company' || key === 'type' || key === 'status') {
  //       payload.append(key, value?.id || value); // Use the correct field type
  //     } else {
  //       payload.append(key, value);
  //     }
  //   });
  
  //   // Append files to FormData
  //   if (formData.documents) {
  //     if (formData.documents.photo instanceof File) {
  //       payload.append('photo', formData.documents.photo);
  //     }
  //     if (formData.documents.resume instanceof File) {
  //       payload.append('resume', formData.documents.resume);
  //     }
  //     if (formData.documents.nie instanceof File) {
  //       payload.append('nieDoc', formData.documents.nie);
  //     }
  //     if (formData.documents.license instanceof File) {
  //       payload.append('license', formData.documents.license);
  //     }
  //     if (formData.documents.contract instanceof File) {
  //       payload.append('contract', formData.documents.contract);
  //     }
  //   }
  
  //   const apiPayload = id
  //     ? { url: `/employeesById/${id}`, method: 'PUT' }
  //     : { url: '/employees', method: 'POST' };
  
  //   try {
  //     await axiosInstance({
  //       ...apiPayload,
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       data: payload,
  //     });
  //     navigate('/employee');
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleSubmitForm = async (formData) => {

 
    let getPayload = new FormData();
  
    const data = {
      ...formData,
      type: formData.type?.label ?? formData.type,
      status: formData.status?.label ?? formData.status,
      country: formData.country?.label ?? formData.country,
      dob: moment(formData.dob).toISOString(),
      caducidad: moment(formData.caducidad).toISOString(),
      company: formData.company?.value ?? formData.company,
    };
   
    
   getPayload =  Object.entries(data).map(([key, value])=>{
     if(['country','company','type','status'].includes(key)){
      return {
        [key]: typeof value === 'object' ? value?.id || value.label : value
      }
     }else{
      return {
        [key]:value
      }
     }
  })
   getPayload = getPayload.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});
  
    if (formData.documents) {
      if (formData.documents.photo instanceof File) {
        getPayload = {
          ...getPayload,
          photo:formData.documents.photo
        }
      };
      if (formData.documents.resume instanceof File) {
        getPayload = {
          ...getPayload,
          resume:formData.documents.resume
        }
      };
      if (formData.documents.nie instanceof File){ 
        getPayload = {
          ...getPayload,
          nieDoc:formData.documents.nie
        }
      };
      if (formData.documents.license instanceof File) {
        getPayload = {
          ...getPayload,
          license:formData.documents.license
        }
      };
      if (formData.documents.contract instanceof File) {
        payload.append('contract', formData.documents.contract)
        getPayload = {
          ...getPayload,
          contract:formData.documents.contract
        }
      };
    }
  
  
  
    const apiPayload = id
      ? { url: `/employeesById/${id}`, method: 'PUT' }
      : { url: '/employees', method: 'POST' };
  
    try {
      await axiosInstance({
        ...apiPayload,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: getPayload,
      });
      navigate('/employee');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  

  return { form, handleSubmitForm };
};

export default useAddEmployee;
