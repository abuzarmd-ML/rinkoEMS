import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

 const UserMenuList = ({handleClickLogout}) => {
  const [projectOpen, setHandleProjectOpen] = useState(false);
  const [obraOpen, setObraOpen] = useState(false);
  const [obraEntradaOpen, setObraEntradaOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const navigate   = useNavigate()
  const handleProjectClick = () => {
    setHandleProjectOpen(!projectOpen);
  };
  const handleObraClick = () => {
    setObraOpen(!obraOpen);
  };
  const handleObraEntradaClick = () => {
    setObraEntradaOpen(!obraEntradaOpen);
  };
  const handleEmployeeClick = () => {
    setEmployeeOpen(!employeeOpen);
  };
  const handleClientClick = () => {
    setClientOpen(!clientOpen);
  };
  const handleCompanyClick = () => {
    setCompanyOpen(!companyOpen);
  };


  // const handleClickLogout =()=>{
  //   axiosInstance.post('/logout')
  //   .then((response)=>{
  //     console.log('success')
  //     navigate('/login')
  //   })
  // } 

  return (
    <React.Fragment>

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
          <SummarizeIcon />
        </ListItemIcon>
        <ListItemText primary="Nomina" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Factura" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton onClick={handleClickLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default UserMenuList
