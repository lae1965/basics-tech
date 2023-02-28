import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { unwrapResult } from '@reduxjs/toolkit';
import { Stack, Button, Typography, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { useInput } from '../hooks/useInput';
import { Email } from './Email';
import { Password } from './Password';
import { loginUser } from '../store/actionCreators';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notReadyToSubmit, setNotReadyToSubmit] = useState();

  const emailInput = useInput('email');
  const passwordInput = useInput('password');

  useEffect(() => {
    setNotReadyToSubmit(emailInput.error || passwordInput.error);
  }, [emailInput.error, passwordInput.error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        email: emailInput.bind.value,
        password: passwordInput.bind.value,
      })
    )
      .then(unwrapResult)
      .then(() => {
        navigate('/people');
      })
      .catch((e) => {
        alert(e.response.data.message);
        return;
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100vw', padding: '40px' }}>
      <Typography variant='h4' textAlign='center' mb={3}>
        Авторизация
      </Typography>
      <Stack
        direction={'row'}
        spacing={10}
        justifyContent='center'
        alignItems='center'
      >
        <Stack spacing={3} sx={{ width: '25%' }}>
          <Email emailInput={emailInput} />
          <Password
            label='Пароль (8-25 символов)*'
            input={passwordInput}
            error={passwordInput.error}
          />
          <Button
            type='submit'
            variant='contained'
            endIcon={<SendIcon />}
            disabled={notReadyToSubmit}
          >
            Авторизоваться
          </Button>
          <Link href='/' underline='none' color='inherit'>
            <Stack>
              <Typography
                variant='cuption'
                textAlign='center'
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                }}
              >
                Нет аккаунта?
              </Typography>
              <Button variant='contained'>На страницу регистрации</Button>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </form>
  );
};
