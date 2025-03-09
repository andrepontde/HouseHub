import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const TenantCard = () => {
  const [tenants, setTenants] = useState([]);
  const [house, setHouse] = useState(null);

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
        const tenantPromises = houseResponse.data.tenants.map(tenantID => axios.get(`/api/user/id/${tenantID}`));
        const tenantResponses = await Promise.all(tenantPromises);
        setTenants(tenantResponses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching house or tenants:', error);
      }
    };

    fetchHouse();
  }, []);

  const handleQuitHouse = async () => {
    try {
      await axios.put(`/api/house/removeTenant/${house.userID}`);
      setHouse(null);
      setTenants([]);
    } catch (error) {
      console.error('Error quitting house:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Tenants</Typography>
        <List>
          {tenants.map(tenant => (
            <ListItem key={tenant.userID}>
              <ListItemText primary={`${tenant.firstName} ${tenant.lastName}`} secondary={tenant.email} />
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
