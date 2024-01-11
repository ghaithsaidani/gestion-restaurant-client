import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import NotFoundImage from '../../../assets/images/not_found.jpg';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              La Page que vous cherchez n'existe pas !.
            </Typography>
            <Button variant="contained" sx={{
              mt:20
            }}
            onClick={()=>{navigate("")}}
            
            >Retour</Button>
          </Grid>
          <Grid xs={6}>
            <img
              src={NotFoundImage}
              alt="not found"
              width={600} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}