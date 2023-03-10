import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { useInput } from '../hooks/useInput';
import { ChoiceAvatar } from './–°hoiceAvatar';
import { NickName } from './NickName';
import { Email } from './Email';
import { Password } from './Password';
import { getAvatar } from '../store/selectors';
import { setAvatar, setEmail } from '../store/slice';
import { createUser } from '../store/actionCreators';

export const Registration = () => {
  const navigate = useNavigate();

  const [notReadyToSubmit, setNotReadyToSubmit] = useState();

  const avatar = useSelector(getAvatar);
  const dispatch = useDispatch();

  const genderInput = useInput('gender');
  const nickNameInput = useInput('nickName');
  const emailInput = useInput('email');
  const passwordInput = useInput('password');
  const checkPasswordInput = useInput('checkPassword');
  const birthdayInput = useInput('birthday');

  const handleAvatar = (event) => {
    dispatch(setAvatar(event.target.files[0]));
  };

  useEffect(() => {
    setNotReadyToSubmit(
      nickNameInput.error ||
        emailInput.error ||
        passwordInput.error ||
        checkPasswordInput.error ||
        genderInput.error ||
        checkPasswordInput.bind.value !== passwordInput.bind.value
    );
  }, [
    checkPasswordInput.bind.value,
    checkPasswordInput.error,
    emailInput.error,
    genderInput.error,
    nickNameInput.error,
    passwordInput.bind.value,
    passwordInput.error,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.delete('checkPassword');
    dispatch(createUser(formData))
      .then(unwrapResult)
      .then(() => {
        navigate('/people');
      })
      .catch((e) => {
        alert(e.response.data.message);
        dispatch(setEmail(''));
        return;
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100vw', padding: '40px' }}>
      <Typography variant='h4' textAlign='center' mb={3}>
        –°–ĺ–∑–ī–į–Ĺ–ł–Ķ –į–ļ–ļ–į—É–Ĺ—ā–į
      </Typography>
      <Stack
        direction={'row'}
        spacing={10}
        justifyContent='center'
        alignItems='center'
      >
        <Stack spacing={10}>
          <ChoiceAvatar avatar={avatar} handleAvatar={handleAvatar} />
          <FormControl>
            <FormLabel
              id='gender'
              sx={genderInput.error ? { color: 'red' } : {}}
            >
              –ü–ĺ–Ľ*
            </FormLabel>
            <RadioGroup aria-labelledby='gender' {...genderInput.bind}>
              <FormControlLabel
                value='male'
                control={<Radio />}
                label='–ú—É–∂.'
                sx={genderInput.error ? { color: 'red' } : {}}
              />
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='–Ė–Ķ–Ĺ.'
                sx={genderInput.error ? { color: 'red' } : {}}
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack spacing={3} sx={{ width: '25%' }}>
          <NickName nickNameInput={nickNameInput} />
          <Email emailInput={emailInput} />
          <Password
            label='–ü–į—Ä–ĺ–Ľ—Ć (8-25 —Ā–ł–ľ–≤–ĺ–Ľ–ĺ–≤)*'
            input={passwordInput}
            error={passwordInput.error}
          />
          {!passwordInput.error && (
            <Password
              label='–ü–ĺ–≤—ā–ĺ—Ä–ł—ā–Ķ –Ņ–į—Ä–ĺ–Ľ—Ć (8-25 —Ā–ł–ľ–≤–ĺ–Ľ–ĺ–≤)*'
              input={checkPasswordInput}
              error={
                checkPasswordInput.error ||
                passwordInput.error ||
                checkPasswordInput.bind.value !== passwordInput.bind.value
              }
            />
          )}
          <TextField
            label='–Ē–į—ā–į —Ä–ĺ–∂–ī–Ķ–Ĺ–ł—Ź'
            type='date'
            InputLabelProps={{ shrink: true }}
            {...birthdayInput.bind}
          />
          <Button
            type='submit'
            variant='contained'
            endIcon={<SendIcon />}
            disabled={notReadyToSubmit}
          >
            –°–ĺ–∑–ī–į—ā—Ć –į–ļ–ļ–į—É–Ĺ—ā
          </Button>
          <Link href='login' underline='none' color='inherit'>
            <Stack>
              <Typography
                variant='cuption'
                textAlign='center'
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                }}
              >
                –£–∂–Ķ –ł–ľ–Ķ–Ķ—ā—Ā—Ź –į–ļ–ļ–į—É–Ĺ—ā?
              </Typography>
              <Button variant='contained'>–Ě–į —Ā—ā—Ä–į–Ĺ–ł—Ü—É –į–≤—ā–ĺ—Ä–ł–∑–į—Ü–ł–ł</Button>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </form>
  );
};
