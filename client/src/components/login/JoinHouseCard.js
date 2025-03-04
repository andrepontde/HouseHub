import React, { useState } from 'react';


import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Box,
} from '@mui/material';
import axios from 'axios';

const JoinHouseCard = ({ username, password }) => {
  const [houseID, setHouseID] = useState('');

  const handleJoinHouse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/api/user/${username}`, {
        houseID,
      });

      console.log('House joined:', response.data);

      const loginToken = await axios.post('http://localhost:5001/api/login', {
        username,
        password,
      });

      if (loginToken) {
        localStorage.setItem("token", loginToken.data.token);
        window.location.href = '/dashboard'; //Jordan look at this line, it simply redirects to the dashboard page without the use of react-router-dom        
      }
    } catch (error) {
      console.error('Error joining house:', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ width: '20rem', boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Join House
          </Typography>
          <Box component="form" onSubmit={handleJoinHouse} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="houseID"
              label="House ID"
              name="houseID"
              autoComplete="houseID"
              autoFocus
              value={houseID}
              onChange={(e) => setHouseID(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join House
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default JoinHouseCard;