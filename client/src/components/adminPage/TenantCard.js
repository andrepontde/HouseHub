import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Box,
  CircularProgress,
  Avatar,
  ListItemAvatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const TenantCard = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    userId: null,
    username: ''
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Get current house info
      const houseResponse = await axios.get(`/api/house/house`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (houseResponse.data && houseResponse.data.tenants) {
        // Fetch details for each tenant
        const tenantPromises = houseResponse.data.tenants.map(userId => 
          axios.get(`/api/user/user/id/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );
        
        const tenantResponses = await Promise.all(tenantPromises);
        const tenantData = tenantResponses.map(response => response.data);
        setTenants(tenantData);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tenants:', err);
      setError('Failed to load tenants');
      setLoading(false);
    }
  };

  const handleRemoveTenant = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      await axios.put(`/api/house/removeTenant/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh tenants list
      fetchTenants();
      setConfirmDialog({ ...confirmDialog, open: false });
    } catch (err) {
      console.error('Error removing tenant:', err);
      setError('Failed to remove tenant');
    }
  };

  const openConfirmDialog = (userId, username) => {
    setConfirmDialog({
      open: true,
      userId,
      username
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  if (loading) {
    return (
      <Card sx={{ minWidth: 275, maxWidth: 600, m: 2 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading tenants...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ minWidth: 275, maxWidth: 600, m: 2 }}>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ minWidth: 275, maxWidth: 600, m: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          House Tenants
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {tenants.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No tenants in this house.
          </Typography>
        ) : (
          <List>
            {tenants.map((tenant) => (
              <ListItem key={tenant.userID} divider>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${tenant.firstName} ${tenant.lastName}`}
                  secondary={`Username: ${tenant.username} | Email: ${tenant.email}`}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => openConfirmDialog(tenant.userID, tenant.username)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Tenant Removal"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {confirmDialog.username} from the house? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog}>Cancel</Button>
          <Button 
            onClick={() => handleRemoveTenant(confirmDialog.userId)} 
            color="error" 
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TenantCard;
