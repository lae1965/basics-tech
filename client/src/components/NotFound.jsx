import React, { useEffect } from 'react';
import notFoundLogo from './img/404.webp';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  useEffect(() => {
    document.title = '404';
  }, []);

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '1150px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <img src={notFoundLogo} alt='404 Logo' style={{ width: '30rem' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ fontSize: '3.5rem', lineHeight: 1, fontWeight: 600, mb: 1.5 }}
          >
            Упс...
          </Typography>
          <Typography sx={{ fontWeight: 300, fontSize: '2rem', mb: 4 }}>
            Страница не найдена
          </Typography>
          <Link to='/people' style={{ 'text-decoration': 'none' }}>
            <Button variant='contained'>Вернуться на главную</Button>
          </Link>
        </Box>
      </Box>
    </Stack>
  );
};
