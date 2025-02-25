import React, { useState } from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap';
import 'styles/login-register.css';
import axios from 'axios'; // Make sure axios is imported

const LoginCard = ({ onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        username,
        password
      });
      console.log('User logged in:', response.data);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '20rem' }} className="shadow-lg">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
            <Button variant="secondary" className="w-100 mt-2" onClick={onToggle}>
              Register
            </Button>
            {/* The onToggle prop is used to switch between login and registration */}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginCard;
