import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Navbar() {
  const { user, logout } = useAuth();// Get user and logout function from auth context
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');// Check if device is mobile
  const [drawerOpen, setDrawerOpen] = useState(false);// State for mobile drawer

  const handleLogout = () => {
    logout();                   // Clear user session
    navigate('/login');         // Redirect to login after logout
  };

  // Navigation items depending on authentication status
  const navItems = user
    ? [
        { label: 'Home', path: '/' },
        { label: 'My Alerts', path: '/alerts' },
        { label: 'Alert State', path: '/currentState' },
        { label: 'Logout', action: handleLogout }
      ]
    : [
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' }
      ];

  
  // Toggle mobile drawer open/close
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather Guardian
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                  <List>
                    {navItems.map((item, index) => (
                      <ListItem
                        button
                        key={index}
                        component={item.path ? Link : 'button'}
                        to={item.path}
                        onClick={item.action}
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            navItems.map((item, index) =>
              item.path ? (
                <Button key={index} color="inherit" component={Link} to={item.path}>
                  {item.label}
                </Button>
              ) : (
                <Button key={index} color="inherit" onClick={item.action}>
                  {item.label}
                </Button>
              )
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
