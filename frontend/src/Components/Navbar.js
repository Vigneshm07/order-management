import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the Home page
  };

  const handleReportClick = () => {
    navigate('/report'); // Navigate to the Report page
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Order Management System
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleHomeClick}>
            Home
          </Button>
          <Button color="inherit" onClick={handleReportClick}>
            Report
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
