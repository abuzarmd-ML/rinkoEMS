// controllers/companyController.js
import { getClientName,createClient,getAllClient } from '../models/client.js';
import { deleteClientById,updateClient,getClientById } from '../models/client.js';

async function createClientController(req, res, next) {
  console.log("[Controller]:", req.body);

  const {
    name, phone, email, company, dob, country, address, nie, status, note
  } = req.body;

  try {
    const clientId = await createClient(
      name, phone, email, company, dob, country, address, nie, status, note
    );

    res.status(201).json({ message: 'Client created successfully', clientId });
  } catch (error) {
    console.error('Error creating client:', error);
    next(error); // Passes the error to the error-handling middleware
  }
}


async function getClientController(req, res) {
  try {
    const clients = await getClientName();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getAllClientController(req, res) {
  try {
    const clients = await getAllClient();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function getClientsControllerById(req, res, next) {
  const clientId = req.params.id;
  console.log("Fetching client with ID:", clientId)
  try {
    const client = await getClientById(clientId);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'client not found' });
    }
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Failed to fetch client' });
  }
}
async function updateClientController(req, res, next) {
  const clientId = req.params.id;
  const clientData = req.body;
  try {
    const result = await updateClient(clientId, clientData);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'client not found' });
    } else {
      res.status(200).json({ message: 'client updated successfully' });
    }
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Failed to update client' });
  }
}

async function deleteClientController(req, res) {
  const { clientId} = req.params;
  console.log("..................",req.params)
  try {
    const success = await deleteClientById(clientId);
    if (success) {
      res.status(200).json({ message: 'client deleted successfully' });
    } else {
      res.status(404).json({ message: 'client not found' });
    }
  } catch (error) {
    console.error('Error deleting clinet:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export {createClientController,getClientController,getClientsControllerById,getAllClientController,deleteClientController,updateClientController}