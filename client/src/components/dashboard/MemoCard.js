import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const MemoCard = () => {
  const [memos, setMemos] = useState([]);

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
      {memos.map((memo) => (
        <Card key={memo.memoID} sx={{ marginBottom: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {memo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {memo.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default MemoCard;
