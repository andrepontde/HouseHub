import React from 'react';
import { Container, Typography } from '@mui/material';
import TheMainNavBar from 'components/layout/MainNav';
const Landing = () => {
    return (<>
        <TheMainNavBar />
<<<<<<< Updated upstream
        <Container>        <div>
           <Typography variant="h2" sx={{fontFamily : "roboto"}}>This is the landing page</Typography>
        </div>
        </Container>

=======
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
>>>>>>> Stashed changes
        </>
    );
};

export default Landing;
