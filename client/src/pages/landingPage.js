import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import TheMainNavBar from "components/layout/MainNav";
import MainHero from "components/Landing/MainHero";
import DashboardButton from "components/Landing/goDashboardButton";
import bgLight from "assets/pexels-pixabay-259588.jpg";
import bgDark from "assets/pexels-pierre-blache-651604-2901215.jpg";
const Landing = () => {
  const theme = useTheme();
  const bgImage = theme.palette.mode === "light" ? bgLight : bgDark;
  return (

    <Container maxWidth={false} disableGutters>
      <TheMainNavBar />
      <Container
      maxWidth={false}
        sx={{
          p:0,
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
        }}
        disableGutters
      >
        <Container
        maxWidth={false}
          sx={{
            p:0,
            marginLeft:0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width:"100vw",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }} disableGutters
        >
          {/* Container for opacity */}
          <MainHero />
        </Container>
      </Container>
      </Container>

  );
};

export default Landing;
