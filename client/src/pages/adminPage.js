import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Container, Box } from "@mui/material";

// Import the card components
import TenantCard from "../components/adminPage/TenantCard";
import LandlordCard from "../components/adminPage/LandlordCard";

const drawerWidth = 240; // Adjust based on your SideNav width

const AdminPage = () => {
    const { username } = useParams();
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    
    


    useEffect(() => {
        const fetchUserRole = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
              "http://localhost:5001/api/user/user",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response.data.user.role);
            setRole(response.data.user.role);
          } catch (error) {
            console.error('Error fetching user role:', error);
          } finally {
            setLoading(false);
          }
        };
        
        if (localStorage.getItem('token')) {
            fetchUserRole();
        }
    }, [username]);

    if (loading) {
        return <Container><Box sx={{ mt: 4 }}>Loading...</Box></Container>;
    }

    return (
        <Container sx={{ ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)` }}>
            <Box sx={{ mt: 4 }}>
                {role === 'tenant' ? (
                    <TenantCard username={username} />
                ) : role === 'landlord' ? (
                    <LandlordCard username={username} />
                ) : (
                    <Box>No role assigned or invalid role.</Box>
                )}
            </Box>
        </Container>
    );
};

export default AdminPage;
