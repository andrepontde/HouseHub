import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import TheMainNavBar from "../components/layout/MainNav";
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Auth & user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    
    axios.get("http://localhost:5001/api/user/user", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUser(res.data.user);
    }).catch(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

  // Socket setup
  useEffect(() => {
    if (!user) return;
    
    const newSocket = io('http://localhost:5001', {
      auth: { token: localStorage.getItem('token') }
    });
    
    newSocket.on('connect', () => setSocket(newSocket));
    
    return () => newSocket.disconnect();
  }, [user]);

  // Socket events
  useEffect(() => {
    if (!socket) return;
    
    socket.on('chatHistory', msgs => {
      setMessages(msgs);
      messagesEndRef.current?.scrollIntoView();
    });
    
    socket.on('newMessage', msg => {
      setMessages(prev => [...prev, msg]);
      messagesEndRef.current?.scrollIntoView();
    });
    
    socket.on('userTyping', ({ username }) => {
      setTypingUsers(prev => prev.includes(username) ? prev : [...prev, username]);
    });
    
    socket.on('userStopTyping', ({ username }) => {
      setTypingUsers(prev => prev.filter(u => u !== username));
    });
    
    ['userJoined', 'userLeft', 'userDisconnected'].forEach(event => {
      socket.on(event, ({ message }) => {
        setMessages(prev => [...prev, { username: 'System', message, timestamp: new Date(), isSystem: true }]);
        messagesEndRef.current?.scrollIntoView();
      });
    });
    
    return () => socket.off();
  }, [socket]);

  // Send message
  const sendMessage = e => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit('sendMessage', { message: message.trim() });
      socket.emit('stopTyping', user.houseID);
      setMessage('');
    }
  };

  // Handle typing
  const handleTyping = e => {
    setMessage(e.target.value);
    socket?.emit('typing');
    setTimeout(() => socket?.emit('stopTyping', user?.houseID), 2000);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <TheMainNavBar />
      <div style={{maxWidth: '800px', margin: '20px auto', border: '1px solid #ccc'}}>
        <div style={{backgroundColor: '#2196f3', color: 'white', padding: '10px'}}>
          <h3>House Chat</h3>
        </div>
        
        <div style={{height: '400px', overflowY: 'auto', padding: '10px', backgroundColor: '#f5f5f5'}}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              margin: '5px 0',
              padding: '8px',
              backgroundColor: msg.isSystem ? '#e0e0e0' : 
                              (msg.username === user.username ? '#2196f3' : 'white'),
              color: msg.username === user.username && !msg.isSystem ? 'white' : 'black',
              borderRadius: '4px',
              textAlign: msg.isSystem ? 'center' : 'left'
            }}>
              {/* Always show username for all messages except system messages */}
              {!msg.isSystem && 
                <div style={{
                  fontWeight: 'bold', 
                  marginBottom: '4px',
                  color: msg.username === user.username ? '#f0f0f0' : '#333'
                }}>
                  {msg.username} {msg.username === user.username && '(You)'}
                </div>
              }
              <div>{msg.message}</div>
              <small style={{fontSize: '11px', color: '#888', textAlign: 'right', display: 'block'}}>
                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
              </small>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {typingUsers.length > 0 && (
          <div style={{padding: '5px', fontSize: '12px', fontStyle: 'italic'}}>
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}
        
        <form onSubmit={sendMessage} style={{display: 'flex', padding: '10px', borderTop: '1px solid #ddd'}}>
          <input 
            style={{flex: 1, padding: '8px', marginRight: '10px'}}
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
          />
          <button type="submit" disabled={!message.trim()}>Send</button>
        </form>
      </div>
    </>
  );
};

export default ChatPage;
