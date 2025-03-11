import React from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "components/dashboard/layout/SideNav";
import MemoCard from "components/dashboard/MemoCard";
import { Container, Box, Button } from "@mui/material";
import UtilityCard from "components/dashboard/UtilityCard";
import WelcomeMessage from "components/dashboard/Welcome";
import TheMainNavBar from "components/layout/MainNav";

const drawerWidth = 240; // Adjust based on your SideNav width

const DashBoard = () => {
  const navigate = useNavigate();
  
  const navigateToAdmin = () => {
    navigate('/admin');
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container sx={{ alignItems: "center" }}>
        {/* <WelcomeMessage /> */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={navigateToAdmin}
          sx={{ mt: 2 }}
        >
          Go to Admin page
        </Button>

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