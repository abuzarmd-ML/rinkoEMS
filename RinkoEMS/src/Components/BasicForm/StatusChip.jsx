import React from 'react';
import { Chip } from '@mui/material';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'error';
    default:
      return 'default';
  }
};

const StatusChip = ({ status }) => {
  const color = getStatusColor(status);
  return <Chip label={status} color={color} />;
};

export default StatusChip;