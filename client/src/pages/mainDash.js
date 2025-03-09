import React from "react";
import SideNavBar from "components/dashboard/layout/SideNav";
import MemoCard from "components/dashboard/MemoCard";
import { Container, Box, Button } from "@mui/material";
import UtilityCard from "components/dashboard/UtilityCard";
import WelcomeMessage from "components/dashboard/Welcome";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240; // Adjust based on your SideNav width

const DashBoard = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavBar />
      <Container component="header" sx={{ justifyContent:"center", width:"100vh"}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <WelcomeMessage /> */}
          <Button 
            variant="contained" 
            startIcon={<AdminPanelSettingsIcon />}
            onClick={handleAdminClick}
            sx={{ 
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#388e3c',
              }
            }}
          >
            Admin
          </Button>
        </Box>
      </Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <MemoCard />
        <UtilityCard />
      </Box>
    </Box>
  );
};

export default DashBoard;
