import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import { getProjectId } from '../../api/projectApi';

const ProjectDetails = () => {
  const { control, watch, setValue } = useFormContext();
  const [projectsList, setProjectList] = useState([]);
  const selectedProjectId = watch('project_id', '');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectId();
        const formattedProjects = response.map(project => ({
          value: project.project_id,
          label: String(project.project_id), // Ensure label is a string
          project_name:project.comunidad_name,
        })).filter(project => project.value !== undefined && project.value !== null);
        setProjectList(formattedProjects);
        console.log("......project..",formattedProjects)
      } catch (error) {
        console.error('Error fetching obras:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    const selectedProject = projectsList.find(project => project.value === selectedProjectId);
    if (selectedProject) {
      setValue('project_id', selectedProject.value);
      setValue('project_name', selectedProject.project_name);
    } else {
      setValue('project_id', '');
      setValue('project_name', '');
    }
  };

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Project Details
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="project_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="outlined"
                label="Select Project ID"
                onChange={(event) => {
                  field.onChange(event); // Update the form state
                  handleProjectChange(event); // Handle the obra change
                }}
                value={selectedProjectId || ''}
              >
                <MenuItem value="" disabled>Select Project ID</MenuItem>
                {projectsList.map(project => (
                  <MenuItem key={project.value} value={project.value}>{project.label}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6} >
          <TextField
            required
            id="project_name"
            fullWidth
            name="project_name"
            label="Project Name"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('project_name') || ''}
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default ProjectDetails;

