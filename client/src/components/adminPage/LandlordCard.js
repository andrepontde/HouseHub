import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const LandlordCard = () => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 600, m: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Landlord Admin Panel
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          Welcome to the landlord administration panel. This area is under development.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LandlordCard;
