import React from 'react'
import SideNavBar from 'components/dashboard/layout/SideNav';
import TheMainNavBar from 'components/layout/MainNav';
import MemoCard from 'components/dashboard/MemoCard'; // Import MemoCard component
import {Container,Box} from  '@mui/material'


const DashBoard = () => {
    return (
        <>
         <TheMainNavBar/>
         <SideNavBar />
          <Container
             sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               minHeight: '100vh',
             }}
           > <MemoCard/>
           </Container>
        </>
    )

}
export default DashBoard;