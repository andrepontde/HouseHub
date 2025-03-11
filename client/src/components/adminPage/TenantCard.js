import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// TenantCard component displays the house details and tenants for the tenant
const TenantCard = () => {
    const [tenants, setTenants] = useState([]); // State for tenants
    const [house, setHouse] = useState(null); // State for house details

    const navigate = useNavigate();

    // Fetch house and tenant details on component mount
    useEffect(() => {
        const fetchHouse = async () => {
            const token = localStorage.getItem('token');
            try {
                const houseResponse = await axios.get(
                    "http://localhost:5001/api/house/house",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHouse(houseResponse.data);
                console.log('House:', houseResponse.data);
                const tenantInfo = [];
                const tenantIDs = houseResponse.data.tenants;
                console.log('Tenant IDs:', tenantIDs);
                if (tenantIDs.length === 0) {
                    console.log('No tenants in house');
                    return "No tenants in house";   
                } else if (tenantIDs.length === 1) {
                    console.log('One tenant in house');
                    let tempTenant = await axios.get(`http://localhost:5001/api/user/user/id/${tenantIDs[0]}`);
                    tenantInfo.push(tempTenant.data);
                    console.log('Tenant Info:', tenantInfo);
                } else {    
                    for(let i = 0; i < tenantIDs.length; i++) {
                        let tempTenant = await axios.get(`http://localhost:5001/api/user/user/id/${tenantIDs[i]}`);
                        tenantInfo.push(tempTenant.data);
                    }
                }
                console.log('Tenant Info:', tenantInfo);
                setTenants(tenantInfo);
            } catch (error) {
                console.error('Error fetching house or tenants:', error);
            }
        };

        fetchHouse();
    }, []);

    // Handle quitting the house
    const handleQuitHouse = async () => {
        try {
            const token = localStorage.getItem('token');
            const userResponse = await axios.get(
                `http://localhost:5001/api/user/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userID = userResponse.data.user.userID;
            console.log('User ID:', userID);

            await axios.put(
                `http://localhost:5001/api/house/removeTenant/${userID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await axios.put(
                `http://localhost:5001/api/user/user/${userResponse.data.user.username}`,
                { houseID: null },
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Remove the token from localStorage
            localStorage.removeItem('token');

            setHouse(null);
            setTenants([]);
            navigate('/login');
            
        } catch (error) {
            console.error('Error quitting house:', error);
        }
    };

    // Render the tenant list and quit house button
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Tenants</Typography>
                <List>
                    {tenants.map(tenant => (
                        <ListItem key={tenant.userID}>
                            <ListItemText 
                                primary={`${tenant.firstName} ${tenant.lastName}`} 
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            Age: {tenant.age}
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            Email: {tenant.email}
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            Username: {tenant.username}
                                        </Typography>
                                    </>
                                } 
                            />
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" color="secondary" onClick={handleQuitHouse}>
                    Quit House
                </Button>
            </CardContent>
        </Card>
    );
};

export default TenantCard;
