import React from 'react';
import { Container, Typography } from '@mui/material';
import TheMainNavBar from 'components/layout/MainNav';
const Landing = () => {
    return (<>
        <TheMainNavBar />
        <Container>        <div>
           <Typography variant="h2" sx={{fontFamily : "roboto"}}>This is the landing page</Typography>
        </div>
        </Container>

        </>
    );
};

export default Landing;
