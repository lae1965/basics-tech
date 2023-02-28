import React from 'react';
import { TextField } from '@mui/material';

export const Password = ({ label, input, error }) => {
  return (
    <TextField label={label} type='password' {...input.bind} error={error} />
  );
};
