// controllers/obraController.js
import { getObraName,createObra,getAllObra } from '../models/obra.js';
import { deleteObraById,updateObra,getObraById } from '../models/obra.js';

async function createObraController(req, res, next) {
  console.log("[Controller]:", req.body);

  const {
    obra_name, phone, email,address, nie, status,obra_website,F_Date,company_id
  } = req.body;

  try {
    console.log("Company id:", company_id);
    const obraId = await createObra(
      obra_name, phone, email,address, nie, status,obra_website,F_Date,company_id
    );

    res.status(201).json({ message: 'obra created successfully', obraId });
  } catch (error) {
    console.error('Error creating client:', error);
    next(error); // Passes the error to the error-handling middleware
  }
}

async function getObraController(req, res) {
  try {
    const obras = await getObraName();
    res.json(obras);
  } catch (error) {
    console.error('Error fetching obras:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getAllObraController(req, res) {
  try {
    const obras = await getAllObra();
    res.json(obras); // This should include company_name and company_address
  } catch (error) {
    console.error('Error fetching obras:', error); // Log the error to see more details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
async function getObraControllerById(req, res, next) {
  const obraId = req.params.id;
  console.log("Fetching obras with ID:", obraId)
  try {
    const obra = await getObraById(obraId);
    if (obra) {
      res.status(200).json(obra);
    } else {
      res.status(404).json({ message: 'obra not found' });
    }
  } catch (error) {
    console.error('Error fetching obra:', error);
    res.status(500).json({ message: 'Failed to fetch obra' });
  }
}

async function updateObraController(req, res, next) {
  const obraId = req.params.id;
  const obraData = req.body;
  console.log("...controller obraData",obraData)
  try {
    const result = await updateObra(obraId, obraData);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'obra not found' });
    } else {
      res.status(200).json({ message: 'obra updated successfully' });
    }
  } catch (error) {
    console.error('Error updating obra:', error);
    res.status(500).json({ message: 'Failed to update obra' });
  }
}

async function deleteObraController(req, res) {
  const { obraId} = req.params;
  console.log("..................",req.params)
  try {
    const success = await deleteObraById(obraId);
    if (success) {
      res.status(200).json({ message: 'obra deleted successfully' });
    } else {
      res.status(404).json({ message: 'obra not found' });
    }
  } catch (error) {
    console.error('Error deleting obra:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



export {createObraController,getObraController,getObraControllerById,getAllObraController,deleteObraController,updateObraController}