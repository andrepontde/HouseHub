import { Container,Card,CardContent,Link,Typography } from "@mui/material";
import {useTheme } from "@mui/material";
import mainLogo from 'assets/HouseHubFinal.png';
import DashboardButton from "./goDashboardButton";
import  "assets/HouseHubdarkLogo.png";
import { justifyContent} from "@mui/material/styles/cssUtils";


const MainHero = () => {
    const theme = useTheme();
    const token = localStorage.getItem("token");
    return (
        <Container sx={{display:"flex",flexDirection:"column", justifyContent:'flex-end', mt:5, p:0}}>
            {token ? (
            <DashboardButton sx={{mt:3,ml:'auto'}}/>
            ):(null)}

            <Container sx={{p:0}} disableGutters>
            <img src={mainLogo} alt="HouseHub Logo"/>
            </Container>
        </Container>
    );
};

export default MainHero;
