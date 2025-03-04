import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
import JoinHouseCard from './JoinHouseCard'; // Import JoinHouseCard component


const LoginCard = ({ onToggle }) => {
  // use Navigate custom hook for navigating to dashboard for when login is successful
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showJoinHouse, setShowJoinHouse] = useState(false); // State to toggle JoinHouseCard

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        username,
        password,
      });
      console.log('User logged in:', response.data);

      if (response.data.message === "RHP") {
        setShowJoinHouse(true); // Show JoinHouseCard if user needs to join a house
      } else {
        // if login successful and house exists we navigate
        setUsername('');
        setPassword('');
        navigate('/dashboard');

      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  if (showJoinHouse) {
    return <JoinHouseCard username={username} password={password}/>; // Render JoinHouseCard if needed
  }

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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={onToggle}
              sx={{ mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginCard;