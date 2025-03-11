import React from "react";
import SideNavBar from "components/dashboard/layout/SideNav";
import MemoCard from "components/dashboard/MemoCard";
import { Container, Box } from "@mui/material";
import UtilityCard from "components/dashboard/UtilityCard";
import WelcomeMessage from "components/dashboard/Welcome";
import TheMainNavBar from "components/layout/MainNav";

const drawerWidth = 240; // Adjust based on your SideNav width

const DashBoard = () => {
  return (

    <Box sx={{ display: "flex", flexDirection:"column"}}>
    <TheMainNavBar />
      <Container sx={{alignItems:"center"}}>
      {/* <WelcomeMessage /> */}
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