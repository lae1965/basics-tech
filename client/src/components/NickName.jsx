import React from 'react';
import { TextField } from '@mui/material';

export const NickName = ({ nickNameInput }) => {
  return (
    <TextField
      label='Имя (3-40 символов)*'
      type='text'
      {...nickNameInput.bind}
      error={nickNameInput.error}
    />
  );
};
