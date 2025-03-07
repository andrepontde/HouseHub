import React from 'react';
import { Container, Typography } from '@mui/material';
import TheMainNavBar from 'components/layout/MainNav';
import MainHero from 'components/Landing/MainHero';
const Landing = () => {
    return (<>
        <TheMainNavBar />
        <MainHero/>
         <Container
                     sx={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       minHeight: '100vh',
                     }}
                   >
        <MainHero/>
        </Container>

        </>
    );
};

export default Landing;
