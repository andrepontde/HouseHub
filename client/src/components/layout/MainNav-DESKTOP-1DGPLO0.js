import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // If using React Router
import { useTheme } from '@mui/material/styles'; // Import useTheme
import NavLogo from 'assets/HouseHubNav.png';

export function TheMainNavBar() {
    // Access the theme colors using useTheme
    const theme = useTheme();

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo Section */}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img src={NavLogo} alt="HouseHub Logo" width="50px" />
                    <Typography variant="h6" sx={{ ml: 1, color: '#FAFAFA', fontWeight: 'bold' , fontFamily:"sniglet"}}>
                        HouseHub
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Button component={Link} to="/login" sx={{ color: '#FAFAFA' , fontFamily: "sniglet" , fontWeight:"bold"}}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default TheMainNavBar;
