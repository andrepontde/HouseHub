import React from "react";
import { useNavigate } from "react-router-dom";

import MemoCard from "components/dashboard/MemoCard";
import { Container, Box, Button } from "@mui/material";
import UtilityCard from "components/dashboard/UtilityCard";
import WelcomeMessage from "components/dashboard/Welcome";
import TheMainNavBar from "components/layout/MainNav";


const DashBoard = () => {

  return (

    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TheMainNavBar/>

      <Container sx={{ alignItems: "center", display:"flex" , width:'100vw', justifyContent:"space-between"}}>
        {/* <WelcomeMessage /> */}
        <WelcomeMessage/>


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