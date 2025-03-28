import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemoCard from "components/dashboard/MemoCard";
import { Container, Box, Stack, Button } from "@mui/material";
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
      navigate('/');
    }
  }, [token, navigate]);

  const navigateToAdmin = () => {
    navigate('/admin');
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <TheMainNavBar />

      <Container
        sx={{
          alignItems: "center",
          display: "flex",
          width: "100vw",
          justifyContent: "space-between",
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

      <Stack direction="row" spacing={2}>
        <MemoCard />
        <UtilityCard />
        <ToDoCard />
        <RecurringTasksCard />
      </Stack>
    </Box>
  );
};

export default DashBoard;