// controllers/companyController.js
import { getProjectName,createProject,getAllProject } from '../models/project.js';
import { deleteProjectById,updateProject,getProjectById } from '../models/project.js';

async function createProjectController(req, res, next) {
    console.log("[Controller]:", req.body);
  
    const {
      comunidad_name, fact_email, company_name, obra_id, nie, obra_website, cudad_id, venc_days,company_address
    } = req.body;
  
    try {
      // Extract the label from the company object correctly
    //   const companyLabel = company && company.label ? company.label : null;
      console.log("Company Label:", company_name); // Check the extracted company label
  
      const projectId = await createProject(
        comunidad_name, fact_email, company_name, obra_id, nie, obra_website, cudad_id, venc_days, company_address
      );
  
      res.status(201).json({ message: 'Project created successfully', projectId });
    } catch (error) {
      console.error('Error creating project:', error);
      next(error); // Passes the error to the error-handling middleware
    }
  }
  

async function getProjectController(req, res) {
  try {
    const projects = await getProjectName();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getAllProjectController(req, res) {
  try {
    const projects = await getAllProject();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function getProjectControllerById(req, res, next) {
  const projectId = req.params.id;
  console.log("Fetching project with ID:", projectId)
  try {
    const project = await getProjectById(projectId);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'project not found' });
    }
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
}
async function updateProjectController(req, res, next) {
  const projectId = req.params.id;
  const projectData = req.body;
  try {
    const result = await updateProject(projectId, projectData);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'project not found' });
    } else {
      res.status(200).json({ message: 'project updated successfully' });
    }
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
}

async function deleteProjectController(req, res) {
  const { projectId} = req.params;
  console.log("..................",req.params)
  try {
    const success = await deleteProjectById(projectId);
    if (success) {
      res.status(200).json({ message: 'project deleted successfully' });
    } else {
      res.status(404).json({ message: 'project not found' });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export {createProjectController,getProjectController,getProjectControllerById,getAllProjectController,deleteProjectController,updateProjectController}