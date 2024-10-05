import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_CURRENTUSER = 'http://54.177.165.67:8000/api/users/currentUser/';

const AUTH_TOKEN = localStorage.getItem('token');


const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userData, setUserData] = useState({
    firstName: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(API_CURRENTUSER, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });
        setUserData({
          firstName: response.data.first_name,
          profileImage: response.data.profileImage,
        });
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/login');
  };
  

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Badge color="secondary">
            {userData.profileImage ? (
              <Avatar src={userData.profileImage} />
            ) : (
              <Avatar style={{backgroundColor:'skyblue'}} >{userData.firstName.charAt(0) || 'U'}</Avatar>
            )}
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink to='/profile' style={{textDecoration:'none',color:'black'}}>

        <MenuItem >
        <Avatar /> Profile




          
        </MenuItem>
        </NavLink>


        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppHeaderDropdown;
