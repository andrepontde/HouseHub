import { Container } from "@mui/material";
import "assets/HouseHublightLogo.png";
import  "assets/HouseHubdarkLogo.png";

import getTheme from "theme/theme";

const MainHero = () => {
    const theme = getTheme();
    return (
        <Container>

            {/* <img src={theme === "light" ? imageLight : imageDark} alt="HouseHub Logo" />
            <img src={`assets/HouseHub${theme.palette.images.heroLogo}.png`} alt="HouseHub Logo"/> */}

        </Container>
    );
};

export default MainHero;
