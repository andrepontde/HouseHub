import React from "react";
import SideNavBar from "components/dashboard/layout/SideNav";
import MemoCard from "components/dashboard/MemoCard";
import { Container, Box } from "@mui/material";
import UtilityCard from "components/dashboard/UtilityCard";
import WelcomeMessage from "components/dashboard/Welcome";

const drawerWidth = 240; // Adjust based on your SideNav width

const DashBoard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNavBar />
      <Container component="header" sx={{ justifyContent:"center", width:"100vh"}}>
      <WelcomeMessage />
      </Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >

        <MemoCard />
        <UtilityCard />
      </Box>
    </Box>
  );
};

export default DashBoard;
