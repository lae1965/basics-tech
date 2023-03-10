import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Stack, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { useInput } from '../hooks/useInput';
import { ChoiceAvatar } from './–°hoiceAvatar';
import { NickName } from './NickName';
import { Password } from './Password';
import { getAvatar, getAvatarFileName, getId } from '../store/selectors';
import { setAvatar, setNickName, setPassword } from '../store/slice';
import { updateUser } from '../store/actionCreators';

export const Account = () => {
  const navigate = useNavigate();

  const id = useSelector(getId);
  const avatar = useSelector(getAvatar);
  const avatarFileName = useSelector(getAvatarFileName);
  const dispatch = useDispatch();

  const [notReadyToSubmit, setNotReadyToSubmit] = useState();

  const nickNameInput = useInput('nickName', true);
  const passwordInput = useInput('password', true);
  const checkPasswordInput = useInput('checkPassword');

  const oldNickName = useRef(nickNameInput.bind.value);

  const handleAvatar = (event) => {
    dispatch(setAvatar(event.target.files[0]));
  };

  useEffect(() => {
    setNotReadyToSubmit(
      nickNameInput.error ||
        passwordInput.error ||
        (checkPasswordInput.error && !!passwordInput.bind.value) ||
        checkPasswordInput.bind.value !== passwordInput.bind.value
    );
  }, [
    checkPasswordInput.bind.value,
    checkPasswordInput.error,
    nickNameInput.error,
    passwordInput.bind.value,
    passwordInput.error,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append('avatar', avatar);
    if (
      nickNameInput.bind.value.length &&
      nickNameInput.bind.value !== oldNickName.current
    )
      formData.append('nickName', nickNameInput.bind.value);
    if (passwordInput.bind.value.length)
      formData.append('password', passwordInput.bind.value);
    if (
      formData.has('avatar') ||
      formData.has('nickName') ||
      formData.has('password')
    ) {
      formData.append('_id', id);
      dispatch(updateUser(formData))
        .then(unwrapResult)
        .then(() => {
          navigate('/people');
        })
        .catch((e) => {
          alert(e.response.data.message);
          return;
        });
    }
    navigate('/people');
  };

  const handleNoChange = (event) => {
    event.preventDefault();
    dispatch(setNickName(oldNickName.current));
    dispatch(setPassword(''));
    dispatch(setAvatar(null));
    navigate('/people');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100vw', padding: '40px' }}>
      <Typography variant='h4' textAlign='center' mb={3}>
        –ź–ļ–ļ–į—É–Ĺ—ā
      </Typography>
      <Stack
        direction={'row'}
        spacing={10}
        justifyContent='center'
        alignItems='center'
      >
        <Stack spacing={10}>
          <ChoiceAvatar
            avatar={avatar}
            avatarFileName={avatarFileName}
            handleAvatar={handleAvatar}
          />
        </Stack>
        <Stack spacing={3} sx={{ width: '25%' }}>
          <NickName nickNameInput={nickNameInput} />
          <Password
            label='–ü–į—Ä–ĺ–Ľ—Ć (8-25 —Ā–ł–ľ–≤–ĺ–Ľ–ĺ–≤)*'
            input={passwordInput}
            error={passwordInput.error}
          />
          {!passwordInput.error && !!passwordInput.bind.value && (
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
          <Button
            type='submit'
            variant='contained'
            endIcon={<SendIcon />}
            disabled={notReadyToSubmit}
          >
            –°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć –ł–∑–ľ–Ķ–Ĺ–Ķ–Ĺ–ł—Ź
          </Button>
          <Button type='submit' variant='contained' onClick={handleNoChange}>
            –Ě–į –≥–Ľ–į–≤–Ĺ—É—é —Ā—ā—Ä–į–Ĺ–ł—Ü—É (–Ī–Ķ–∑ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ–ł—Ź)
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
