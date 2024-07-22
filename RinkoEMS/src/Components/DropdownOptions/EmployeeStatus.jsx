import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, IconButton, Divider, Modal, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const EmployeeStatus = () => {
  const [dropdownOptions, setDropdownOptions] = useState([
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]);

  const [newOption, setNewOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editOption, setEditOption] = useState({ id: null, name: '' });

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleAddOption = () => {
    if (newOption.trim()) {
      setDropdownOptions([...dropdownOptions, { id: dropdownOptions.length + 1, name: newOption }]);
      setNewOption('');
      handleClose();
    }
  };

  const handleEditOption = (option) => {
    setIsEditing(true);
    setEditOption(option);
    handleOpen();
  };

  const handleSaveEdit = () => {
    setDropdownOptions(dropdownOptions.map(opt => (opt.id === editOption.id ? editOption : opt)));
    setEditOption({ id: null, name: '' });
    setIsEditing(false);
    handleClose();
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
          Employee Status
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
                <IconButton color="secondary" aria-label="delete">
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

export default EmployeeStatus;
