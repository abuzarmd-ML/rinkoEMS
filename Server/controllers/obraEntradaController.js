import {
  createObraEntrada,
  getAllObraEntradas,
  getObraEntradaById,
  updateObraEntrada,
  deleteObraEntradaById,
  getObraEntradaName
} from '../models/obraEntrada.js';

async function createObraEntradaController(req, res)  {
  try {
    const {
      emp_id,
      company_id,
      project_id,
      obra_id,
      work_date
    } = req.body;

    // Ensure undefined values are set to null
    const data = {
      emp_id: emp_id ?? null,
      company_id: company_id ?? null,
      obra_id: obra_id ?? null,
      project_id: project_id ?? null,
      work_date: work_date ?? null,
    };

    const obraEntradaId = await createObraEntrada(data);
    res.status(201).json({ message: 'ObraEntrada created successfully', obraEntradaId });
  } catch (error) {
    console.error('Error creating ObraEntrada:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

async function getAllObraEntradasController(req, res) {
  try {
    const obraEntradas = await getAllObraEntradas();
    res.json(obraEntradas);
  } catch (error) {
    console.error('Error fetching ObraEntradas:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getObraEntradaControllerById(req, res, next) {
  const obraEntradaId = req.params.id;
  try {
    const obraEntrada = await getObraEntradaById(obraEntradaId);
    if (obraEntrada) {
      res.status(200).json(obraEntrada);
    } else {
      res.status(404).json({ message: 'ObraEntrada not found' });
    }
  } catch (error) {
    console.error('Error fetching ObraEntrada:', error);
    res.status(500).json({ message: 'Failed to fetch ObraEntrada' });
  }
}
async function getObraEntradaController(req, res) {
  try {
    const obraEntradas = await getObraEntradaName();
    res.json(obraEntradas);
  } catch (error) {
    console.error('Error fetching obras:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteObraEntradaController(req, res) {
  const { obraEntradaId} = req.params;
  console.log("..................",req.params)
  try {
    const success = await deleteObraEntradaById(obraEntradaId);
    if (success) {
      res.status(200).json({ message: 'obra entrada deleted successfully' });
    } else {
      res.status(404).json({ message: 'obra entrada not found' });
    }
  } catch (error) {
    console.error('Error deleting obra entrada:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function updateObraEntradaController(req, res, next) {
  const obraEntradaId = req.params.id;
  const obraEntradaData = req.body;
  
  try {
    const result = await updateObraEntrada(obraEntradaId, obraEntradaData);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'ObraEntrada not found' });
    } else {
      res.status(200).json({ message: 'ObraEntrada updated successfully' });
    }
  } catch (error) {
    console.error('Error updating ObraEntrada:', error);
    res.status(500).json({ message: 'Failed to update ObraEntrada' });
  }
}


export {
  createObraEntradaController,
  getAllObraEntradasController,
  getObraEntradaControllerById,
  updateObraEntradaController,
  deleteObraEntradaController,
  getObraEntradaController
};
