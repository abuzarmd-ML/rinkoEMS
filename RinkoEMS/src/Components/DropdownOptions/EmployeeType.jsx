import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, IconButton, Divider, Modal, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../services/axiosInstance';

const EmployeeType = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editOption, setEditOption] = useState({ id: null, name: '' });

  useEffect(() => {
    // Fetch dropdown options from the backend
    axiosInstance.get('/employee_type_options')
      .then(response => {
        const options = Array.isArray(response.data) ? response.data : [];
        setDropdownOptions(options);
      })
      .catch(error => console.error('Error fetching options:', error));
  }, []);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleAddOption = () => {
    if (newOption.trim()) {
      axiosInstance.post('/employee_type_options', { name: newOption })
        .then(response => {
          setDropdownOptions([...dropdownOptions, response.data]);
          setNewOption('');
          handleClose();
        })
        .catch(error => console.error('Error adding option:', error));
    }
  };

  const handleEditOption = (option) => {
    setIsEditing(true);
    setEditOption(option);
    handleOpen();
  };

  const handleSaveEdit = () => {
    axiosInstance.put(`/employee_type_options/${editOption.id}`, { name: editOption.name })
      .then(response => {
        setDropdownOptions(dropdownOptions.map(opt => (opt.id === editOption.id ? response.data : opt)));
        setEditOption({ id: null, name: '' });
        setIsEditing(false);
        handleClose();
      })
      .catch(error => console.error('Error editing option:', error));
  };

  const handleDeleteOption = (id) => {
    axiosInstance.delete(`/employee_type_options/${id}`)
      .then(() => {
        setDropdownOptions(dropdownOptions.filter(opt => opt.id !== id));
      })
      .catch(error => console.error('Error deleting option:', error));
  };

  const handleCancelEdit = () => {
    setEditOption({ id: null, name: '' });
    setIsEditing(false);
    handleClose();
  };

  return (
    <Card style={{ maxHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: '1 1 auto' }}>
        <Typography variant="h5" gutterBottom>
          Employee Types
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Manage your dropdown options here.
        </Typography>
        <Box style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {dropdownOptions.map((option) => (
            <Box key={option.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body1">{option.name}</Typography>
              <Box>
                <IconButton color="primary" aria-label="edit" onClick={() => handleEditOption(option)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteOption(option.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
      <Divider />
      <Box style={{ padding: '16px', background: '#fff' }}>
        <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
          Add New Option
        </Button>
      </Box>

      <Modal open={isModalOpen} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box style={{ outline: 'none' }}>
          <Card style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {isEditing ? 'Edit Option' : 'Add New Option'}
              </Typography>
              <TextField
                label="Option Name"
                value={isEditing ? editOption.name : newOption}
                onChange={(e) => isEditing ? setEditOption({ ...editOption, name: e.target.value }) : setNewOption(e.target.value)}
                fullWidth
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" color="secondary" onClick={handleCancelEdit} startIcon={<CloseIcon />}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={isEditing ? handleSaveEdit : handleAddOption}
                  style={{ marginLeft: '10px' }}
                >
                  {isEditing ? 'Save' : 'Add'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Card>
  );
};

export default EmployeeType;
