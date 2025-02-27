import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Card, Button, Form, Container } from 'react-bootstrap';
import 'styles/login-register.css';


const RegisterCard = ({ onToggle }) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tenant');
    const [houseID, setHouseID] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to create a new user
            const response = await axios.post('http://localhost:5001/api/registration', {
                username,
                firstName,
                lastName,
                email,
                age,
                password,
                role,
                houseID
            });
            console.log('User registered:', response.data);
            setUsername('');
            setFirstName('');
            setLastName('');
            setEmail('');
            setAge('');
            setPassword('');
            setRole('tenant');
            setHouseID('');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ }}>
            <Card style={{ width: '20rem'}} className="shadow-lg">
                <Card.Body>
                    <h3 className="text-center mb-3">Register</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group  controlId="formUsername">
                            <Form.Label column="sm">Username</Form.Label>
                            <Form.Control
                            size="sm"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formFirstName" className="mt-1">
                            <Form.Label column="sm">First Name</Form.Label>
                            <Form.Control
                            size="sm"
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastName" className="mt-1">
                            <Form.Label column="sm">Last Name</Form.Label>
                            <Form.Control
                            size="sm"
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                required
                                onChange={(e) => setLastName(e.target.value)}

                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mt-1">
                            <Form.Label column="sm">Email address</Form.Label>
                            <Form.Control
                            size="sm"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAge" className="mt-1">
                            <Form.Label column="sm">Age</Form.Label>
                            <Form.Control
                            size="sm"
                                type="text"
                                placeholder="Enter age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mt-1">
                            <Form.Label column="sm">Password</Form.Label>
                            <Form.Control
                            size="sm"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mt-1">
                            <Form.Label column="sm">Role</Form.Label>
                            <Form.Control
                                size="sm"
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="landlord">Landlord</option>
                                <option value="tenant">Tenant</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-2">
                            Register
                        </Button>
                        <Button variant="secondary" className="w-100 mt-2" onClick={onToggle}>
                            Back to Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegisterCard;