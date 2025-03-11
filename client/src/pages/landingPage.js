import React from 'react';
import { Container, Typography } from '@mui/material';
import {useTheme } from "@mui/material";
import TheMainNavBar from 'components/layout/MainNav';
import MainHero from 'components/Landing/MainHero';
import bgLight from 'assets/pexels-pixabay-259588.jpg'
import bgDark from 'assets/pexels-pierre-blache-651604-2901215.jpg'
const Landing = () => {
  const theme = useTheme();
  const bgImage = theme.palette.mode === 'light'? bgLight : bgDark;
    return (<>
        <TheMainNavBar />

 <Container sx={{minHeight: '100vh',         backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       backgroundRepeat: 'no-repeat',
                       opacity:0.8}}>
         <Container
                     sx={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       minHeight: '100vh',
                       backgroundImage: `url(${bgImage})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       backgroundRepeat: 'no-repeat',
                     }}
                   >
                    {/* Container for opacity */}

                        <MainHero/>
                        </Container>

        </Container>

        </>
    );
};

export default Landing;
