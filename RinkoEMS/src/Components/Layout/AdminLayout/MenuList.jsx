import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConstructionIcon from '@mui/icons-material/Construction';
import PeopleIcon from '@mui/icons-material/People';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export const MenuList = () => {
  const [obraOpen, setObraOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  const handleObraClick = () => {
    setObraOpen(!obraOpen);
  };

  const handleEmployeeClick = () => {
    setEmployeeOpen(!employeeOpen);
  };

  return (
    <React.Fragment>
      <ListItemButton component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/clients">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>

      <ListItemButton onClick={handleObraClick}>
        <ListItemIcon>
          <ConstructionIcon />
        </ListItemIcon>
        <ListItemText primary="Obra" />

        {obraOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={obraOpen} timeout="auto">
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} component={Link} to="/obra">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Obra List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} component={Link} to="/obra/add">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Obra" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleEmployeeClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Employee" />

        {employeeOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={employeeOpen} timeout="auto">
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} component={Link} to="/employee">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Employee list" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} component={Link} to="/employee/add">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Employee" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton component={Link} to="/attendance">
        <ListItemIcon>
          <PermContactCalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};
