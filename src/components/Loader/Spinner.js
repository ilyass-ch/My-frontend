import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Spinner = ({ size = 40, thickness = 4 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
        width: '100%',
      }}
    >
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  );
};

export default Spinner;
