import React, { useEffect, useState } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SERVER_URL } from '../util/constants';

export const ChoiceAvatar = ({ avatar, avatarFileName, handleAvatar }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(
      avatar
        ? URL.createObjectURL(avatar)
        : avatarFileName
        ? `${SERVER_URL}/avatar/${avatarFileName}`
        : null
    );
  }, [avatar, avatarFileName]);

  return (
    <div>
      <label htmlFor='avatar'>
        <Tooltip title='Выберите файл' arrow>
          {url ? (
            <Avatar alt='Avatar' src={url} sx={{ width: 120, height: 120 }} />
          ) : (
            <AccountCircleIcon color='disabled' sx={{ fontSize: 120 }} />
          )}
        </Tooltip>
      </label>
      <input
        type='file'
        id='avatar'
        hidden
        onChange={handleAvatar}
        name='avatar'
      />
    </div>
  );
};
