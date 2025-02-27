import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'styles/main-nav.css';
import NavLogo from 'assets/HouseHubNav.png';
export function TheMainNavBar() {
    return (
        <Navbar variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src={NavLogo} alt="HouseHub Logo" width="50px" />
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default TheMainNavBar;
