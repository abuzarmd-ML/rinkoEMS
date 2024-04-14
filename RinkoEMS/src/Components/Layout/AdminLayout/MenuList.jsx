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
import StarBorder from '@mui/icons-material/StarBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const MenuList =()=>{
  const [open, setOpen] = React.useState(false);

   return(
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText  primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/clients">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItemButton>
    <ListItemButton component={Link} to="/obra">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Obra" />
    </ListItemButton>
    <ListItemButton onClick={()=>setOpen(!open)} component={Link} to="/employee">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Employee" />
      
      {open ? <ExpandLess /> : <ExpandMore />}
     
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Employee list" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Add New Employee" />
          </ListItemButton>
         
        </List>
      </Collapse>
    <ListItemButton component={Link} to="/attendance">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Attendance" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
)
};