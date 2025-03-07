import React, { useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Card, CardContent, Typography, Container,CardHeader, Box } from '@mui/material';

import axios from 'axios';

 const MemoCard = () => {
  const [memos, setMemos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/house/memos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMemos(response.data);
      } catch (error) {
        console.error('Error fetching memos:', error);
      }
    };

    fetchMemos();
  }, []);

  return (
    <Container>
        <Card sx={{ marginBottom: 2, boxShadow: 3 }}>
        <CardHeader title={
            <Link to="/memos" style={{ textDecoration: 'none', color: 'inherit' }}>
              Memos
            </Link>
          }sx={{ textAlign: "center" }} />
          {/* Using the tenary operator we can check if the memos are empty and output info based on that */}
            {memos.length > 0 ?(
         memos.map((memo) => (
          <CardContent key={memo.memoID}>
            <Typography variant="h6" component="div">
              {memo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "roboto"}}>
              {memo.content}
            </Typography>
          </CardContent>))) : (
               <CardContent>
               <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", fontFamily:"roboto" }}>
                 No memos available.
               </Typography>
             </CardContent>
           )}
        </Card>
    </Container>

    )};
  
  export default MemoCard;



