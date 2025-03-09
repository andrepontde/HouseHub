import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const TenantCard = () => {
    const [tenants, setTenants] = useState([]);
    const [house, setHouse] = useState(null);

    const navigate = useNavigate();

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
                }else if (tenantIDs.length === 1) {
                    console.log('One tenant in house');
                    let tempTenant = await axios.get(`http://localhost:5001/api/user/user/id/${tenantIDs[0]}`);
                    tenantInfo.push(tempTenant.data);
                    console.log('Tenant Info:', tenantInfo);
                }else{    
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

    const handleRemoveTenant = async (tenantID) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5001/api/house/removeTenant/${tenantID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTenants(tenants.filter(tenant => tenant.userID !== tenantID));
        } catch (error) {
            console.error('Error removing tenant:', error);
        }
    };

    const handleRemoveHouse = async () => {
        try {
          const tk = localStorage.getItem('token');

          const userResponse = await axios.get(
            `http://localhost:5001/api/user/user`,
            {
                headers: {
                    Authorization: `Bearer ${tk}`,
                },
            }
        );

            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:5001/api/house/delete/${house.houseID}`,
                {
                    headers: {
                        Authorization: `Bearer ${tk}`,
                    },
                }
            );
            await axios.put(
              `http://localhost:5001/api/user/user/${userResponse.data.user.username}`,
              { houseID: null },
              {},
              {
                  headers: {
                      Authorization: `Bearer ${tk}`,
                  },
              }
          );
            localStorage.removeItem('token');
            setHouse(null);
            setTenants([]);
            navigate('/login');
        } catch (error) {
            console.error('Error removing house:', error);
        }
    };

    return (
        <Card>
            <CardContent>
                {house && (
                    <>
                        <Typography variant="h6">House ID: {house.houseID}</Typography>
                        <Typography variant="h6">House Key: {house.key}</Typography>
                    </>
                )}
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
                            <Button variant="contained" color="secondary" onClick={() => handleRemoveTenant(tenant.userID)}>
                                Remove Tenant
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" color="secondary" onClick={handleRemoveHouse}>
                    Remove House
                </Button>
            </CardContent>
        </Card>
    );
};

export default TenantCard;
