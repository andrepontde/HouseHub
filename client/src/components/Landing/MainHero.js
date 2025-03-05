import { Container } from "@mui/material";
import imageLight from "assets/HouseHub-LogoPink.png";
import imageDark from "assets/HouseHub-logoBlue.png";
import getTheme from "theme/theme";

const MainHero = () => {
    const theme = getTheme();
    return (
        <Container>
            <img src={theme === "light" ? imageLight : imageDark} alt="HouseHub Logo" />
        </Container>
    );
};

export default MainHero;
