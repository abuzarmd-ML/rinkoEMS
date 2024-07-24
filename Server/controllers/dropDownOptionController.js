import { getAllEmployeeOptions,createEmployeeOption,updateEmployeeOption,deleteEmployeeOption} from "../models/dropDownOptions.js"  


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
  
  export {getEmployeeOptionController,createEmployeeOptionController,updateEmployeeOptionController,deleteEmployeeOptionController};
  