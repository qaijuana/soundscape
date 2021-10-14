import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const mainListItems = (
  <div>

        <ListItem button component={Link} to="/browse">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      <ListItem button component={Link} to="/catagories">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
      <ListItemText primary="Browse" />
      </ListItem>
      <ListItem button component={Link} to="/share">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Favourites</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Create New List" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Banging Drums" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Oompa-Loop-a" />
    </ListItem>
  </div>
);
