import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const PrimaryButton = ({ onClickText, onClickContained, onClickOutlined }) => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text" onClick={onClickText}>
        Text
      </Button>
      <Button variant="contained" color="primary" onClick={onClickContained}>
        Contained
      </Button>
      <Button variant="outlined" onClick={onClickOutlined}>
        Outlined
      </Button>
    </Stack>
  );
};

export default PrimaryButton;
