import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // If using React Router

export function TheMainNavBar() {
    // Access the theme colors using useTheme


    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo Section */}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>

                    <Typography variant="h6" sx={{ ml: 1, color: '#FAFAFA', fontWeight: 'bold', }}>
                        HouseHub
                    </Typography>
                </Box>

                {/* Navigation Links */}
                {token ? (
                    <Button onClick={handleLogout} sx={{ color: '#FAFAFA',fontWeight: "bold" }}>
                        Logout
                    </Button>
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
