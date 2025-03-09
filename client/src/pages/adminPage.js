import React from "react";
import axios from 'axios';

import { Container, Box } from "@mui/material";


const drawerWidth = 240; // Adjust based on your SideNav width

//Needs to pass username to work!!!

const AdminPage = (username) => {
    const [role, setRole] = React.useState(''); 
    

    useEffect(() => {
        const fetchUserRole = async () => {
          try {
            const response = await axios.get(`http://localhost:5001/api/user/user/${username}`);
            setRole(response.data.role);
          } catch (error) {
            console.error('Error fetching user role:', error);
          }
        };
        fetchUserRole();
      }, [username]);


    return (
        <div>
  
            {role === 'tenant' ? (
                <TenantCard /> 
            ) : role === 'landlord' ? (
                <LandlordCard /> 
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default AdminPage;
