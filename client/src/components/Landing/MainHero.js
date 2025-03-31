import { Container } from "@mui/material";
import mainLogo from 'assets/HouseHubFinal.png';
import DashboardButton from "./goDashboardButton";
import  "assets/HouseHubdarkLogo.png";



const MainHero = () => {
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
