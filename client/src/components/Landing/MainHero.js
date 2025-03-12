import { Container,Card,CardContent,Link,Typography } from "@mui/material";
import {useTheme } from "@mui/material";
import mainLogo from 'assets/HouseHubFinal.png';
import  "assets/HouseHubdarkLogo.png";


const MainHero = () => {
    const theme = useTheme();

    return (
        <Container sx={{display:"flex", justifyContent:"center", mt:5, p:0}}>

            <Container sx={{p:0}} disableGutters>
            <img src={mainLogo} alt="HouseHub Logo"/>
            </Container>
        </Container>
    );
};

export default MainHero;
