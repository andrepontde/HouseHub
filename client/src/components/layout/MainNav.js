import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // If using React Router

export function TheMainNavBar() {
    const navigate = useNavigate();

     const navigateToDash = () => {
       navigate('/dashboard');
     };

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <AppBar position="static" >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} maxWidth={false} >
                {/* Logo Section */}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>

                    <Typography variant="h6" sx={{ ml: 1, color: '#FAFAFA', fontWeight: 'bold', }}>
                        HouseHub
                    </Typography>
                </Box>

                {/* Navigation Links */}

                {token ? (
                    <Box>
                    <Button onClick={navigateToDash} sx={{ color: '#FAFAFA',fontWeight: "bold" }}>
                        DashBoard
                    </Button>
                    <Button onClick={handleLogout} sx={{ color: '#FAFAFA',fontWeight: "bold" }}>
                        Logout
                    </Button>

                </Box>
                ) : (
                    <Button component={Link} to="/login" sx={{ color: '#FAFAFA',  fontWeight: "bold" }}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TheMainNavBar;
