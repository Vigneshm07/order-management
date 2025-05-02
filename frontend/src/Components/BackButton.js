// components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackButton;
