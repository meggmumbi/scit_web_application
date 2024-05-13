import * as React from 'react';
import {Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { getFromLocalStorage,removeItem } from '../../common/utils/LocalStorage';


const getUserRole = () => {
  const account = getFromLocalStorage("user");
  return account ? account.role : null;
};

const handleLogout = () => {
  // Remove user data from local storage
  removeItem("user");

 
};

export const mainListItems = (
  
  
  <React.Fragment>
    {getUserRole() === "staff" &&(
      <>
    <ListItemButton component={Link} to="/scit/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>   

    <ListItemButton component={Link} to="/scit/programmes">
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Programmes" />
    </ListItemButton>

    <ListItemButton component={Link} to="/scit/staff">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Staff" />
    </ListItemButton>
    <ListItemButton component={Link} to="/scit/activities">
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Activities" />
    </ListItemButton>
    <ListItemButton component={Link} to="/scit/department">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Departments" />
    </ListItemButton>
    <ListItemButton component={Link} to="/scit/applications">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Applications" />
    </ListItemButton>
    </>
  )}
  
  {getUserRole() === "student" &&(
    <ListItemButton component={Link} to="/scit/applications">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Applications" />
    </ListItemButton>
  )}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Logout
    </ListSubheader>
    <ListItemButton component={Link} to="/sign-in" onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
);
