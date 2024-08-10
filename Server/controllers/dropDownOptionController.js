import { getAllEmployeeOptions,createEmployeeOption,updateEmployeeOption,deleteEmployeeOption} from "../models/dropDownOptions.js"  
import { getAllEmployeeTypes,createEmployeeTypes,updateEmployeeTypes,deleteEmployeeTypes} from "../models/dropDownOptions.js"  
import { getAllStatusOptions,createStatusOption,updateStatusOption,deleteStatusOption} from "../models/dropDownOptions.js"  
import { getAllColorOptions,createColorOption,updateColorOption,deleteColorOption} from "../models/dropDownOptions.js"  


  async function getEmployeeOptionController(req, res) {
    try {
      const options = await getAllEmployeeOptions();
      res.json(options);
    } catch (err) {
      console.error('Error fetching options:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function createEmployeeOptionController(req, res) {
    try {
      console.log("In the Controller !!!!")
      const { name } = req.body;
      console.log("[In Controller]: ", name)
      const newOption = await createEmployeeOption(name);
      res.status(201).json(newOption);
    } catch (err) {
      console.error('Error creating option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function updateEmployeeOptionController(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const affectedRows = await updateEmployeeOption(id, name);
      if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
      res.json({ id, name });
    } catch (err) {
      console.error('Error updating option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function deleteEmployeeOptionController(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await deleteEmployeeOption(id);
      if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  



  // ...................**************Employee type ***********...............
 

  async function getEmployeeTypeController(req, res) {
    try {
      const options = await getAllEmployeeTypes();
      res.json(options);
    } catch (err) {
      console.error('Error fetching options:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function createEmployeeTypeController(req, res) {
    try {
      console.log("In the Controller !!!!")
      const { name } = req.body;
      console.log("[In Controller]: ", name)
      const newOption = await createEmployeeTypes(name);
      res.status(201).json(newOption);
    } catch (err) {
      console.error('Error creating option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function updateEmployeeTypeController(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const affectedRows = await updateEmployeeTypes(id, name);
      if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
      res.json({ id, name });
    } catch (err) {
      console.error('Error updating option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function deleteEmployeeTypeController(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await deleteEmployeeTypes(id);
      if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  
  
// ..................**********Status..................********



  async function getStatusOptionController(req, res) {
    try {
      const options = await getAllStatusOptions();
      res.json(options);
    } catch (err) {
      console.error('Error fetching options:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function createStatusOptionController(req, res) {
    try {
      console.log("In the Controller !!!!")
      const { name } = req.body;
      console.log("[In Controller]: ", name)
      const newOption = await createStatusOption(name);
      res.status(201).json(newOption);
    } catch (err) {
      console.error('Error creating option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function updateStatusOptionController(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const affectedRows = await updateStatusOption(id, name);
      if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
      res.json({ id, name });
    } catch (err) {
      console.error('Error updating option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function deleteStatusOptionController(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await deleteStatusOption(id);
      if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting option:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  

 
// ..................**********Company color..................********



async function getColorOptionController(req, res) {
  try {
    const options = await getAllColorOptions();
    res.json(options);
  } catch (err) {
    console.error('Error fetching options:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createColorOptionController(req, res) {
  try {
    console.log("In the Controller !!!!")
    const { name } = req.body;
    console.log("[In Controller]: ", name)
    const newOption = await createColorOption(name);
    res.status(201).json(newOption);
  } catch (err) {
    console.error('Error creating option:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateColorOptionController(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const affectedRows = await updateColorOption(id, name);
    if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
    res.json({ id, name });
  } catch (err) {
    console.error('Error updating option:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteColorOptionController(req, res) {
  const { id } = req.params;
  try {
    const affectedRows = await deleteColorOption(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Option not found' });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting option:', err);
    res.status(500).json({ message: 'Server error' });
  }
}



  export {getEmployeeOptionController,createEmployeeOptionController,updateEmployeeOptionController,deleteEmployeeOptionController};
  export {getEmployeeTypeController,createEmployeeTypeController,updateEmployeeTypeController,deleteEmployeeTypeController};
  export {getStatusOptionController,createStatusOptionController,updateStatusOptionController,deleteStatusOptionController};
  export {getColorOptionController, createColorOptionController, updateColorOptionController, deleteColorOptionController};    
