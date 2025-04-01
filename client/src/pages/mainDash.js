import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Stack, Button } from "@mui/material";
import MemoCard from "components/dashboard/MemoCard";
import UtilityCard from "components/dashboard/UtilityCard";
import WelcomeMessage from "components/dashboard/Welcome";
import TheMainNavBar from "components/layout/MainNav";
import ToDoCard from "components/dashboard/ToDoCard";
import RecurringTasksCard from "components/dashboard/RecurringTasksCard";

const DashBoard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <TheMainNavBar />

        {/* Welcome Message and Settings Button */}
        <Container
          sx={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <WelcomeMessage />
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToAdmin}
            sx={{ mt: 2 }}
          >
            Settings
          </Button>
        </Container>
      </Box>

      {/* Dashboard Layout */}
      <Container sx={{ marginTop: 4 , width:"100vw"}}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          {/* Left Column */}
          <Stack spacing={3} sx={{ flex: 1, minWidth: "500px" }}>
            <MemoCard />
            <ToDoCard />
            <RecurringTasksCard />
          </Stack>

          {/* Right Column */}
          <Box sx={{ flex: 2, minWidth: "300px" }}>
            <UtilityCard />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default DashBoard;