import { Typography,Avatar,Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultLogo from 'assets/blank-profile-picture-973460_640.png'


const WelcomeMessage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        const response = await axios.get("http://localhost:5001/api/user/user/welcome", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data.user);
        console.log(response.data.user)
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <>
      <Container sx={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center", mt:2}}>
      <Typography variant="h3" sx={{paddingRight:2}}>Hello {username}</Typography>
      <Avatar alt="Remy Sharp" src={defaultLogo} sx={{height:80,width:80}} />
      </Container>
    </>
  );
};

export default WelcomeMessage;
