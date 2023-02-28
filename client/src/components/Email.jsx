import React from 'react';
import { TextField } from '@mui/material';

export const Email = ({ emailInput }) => {
  return (
    <TextField
      label='Email*'
      type='email'
      {...emailInput.bind}
      error={emailInput.error}
    />
  );
};
