import React, { useState } from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap';

const RegisterCard = ({ onToggle }) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tenant');
    const [houseID, setHouseID] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '20rem' }} className="shadow-lg">
                <Card.Body>
                    <h3 className="text-center mb-4">Register</h3>
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

                        <Form.Group controlId="formFirstName" className="mt-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastName" className="mt-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAge" className="mt-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
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

                        <Form.Group controlId="formRole" className="mt-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="landlord">Landlord</option>
                                <option value="tenant">Tenant</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4">
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