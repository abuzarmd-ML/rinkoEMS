import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import { getProjectId } from '../../api/projectApi'; // Adjust path as per your project structure

const ProjectDetails = () => {
  const { control, watch, setValue } = useFormContext();
  const [projectsList, setProjectList] = useState([]);
  const selectedProjectId = watch('project_id', '');

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectId();
        const formattedProjects = response.map(project => ({
          value: project.project_id,   // Project ID to submit
          label: project.comunidad_name, // Display project name in the dropdown
        })).filter(project => project.value !== undefined && project.value !== null);
        setProjectList(formattedProjects);
        console.log("Formatted Projects:", formattedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Handle project selection
  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    const selectedProject = projectsList.find(project => project.value === selectedProjectId);
    
    if (selectedProject) {
      setValue('project_id', selectedProject.value); // Set project ID for submission
      setValue('project_name', selectedProject.label); // Set project name for display
    } else {
      setValue('project_id', '');
      setValue('project_name', '');
    }
  };

  // Populate project name when project_id is selected
  useEffect(() => {
    if (selectedProjectId) {
      const selectedProject = projectsList.find(project => project.value === selectedProjectId);
      if (selectedProject) {
        setValue('project_name', selectedProject.label);
      }
    }
  }, [selectedProjectId, projectsList, setValue]);

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Project Details
          </Typography>
        </Grid>

        {/* Project Name Dropdown */}
        <Grid item xs={6}>
          <Controller
            name="project_id" // Bind to project_id for submission
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="outlined"
                label="Select Project"
                onChange={(event) => {
                  field.onChange(event); // Update the form state
                  handleProjectChange(event); // Handle the project change
                }}
                value={selectedProjectId || ''}
              >
                <MenuItem value="" disabled>Select Project</MenuItem>
                {projectsList.map(project => (
                  <MenuItem key={project.value} value={project.value}>
                    {project.label} {/* Show project name */}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Project ID (Read-Only) */}
        <Grid item xs={6}>
          <TextField
            required
            id="project_id"
            fullWidth
            name="project_id"
            label="Project ID"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('project_id') || ''}
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default ProjectDetails;
