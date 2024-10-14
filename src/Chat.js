import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from './chatSlice';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)(({ theme, isUser }) => ({
  margin: theme.spacing(1, 0),
  borderRadius: '10px',
  padding: theme.spacing(1.5),
  background: isUser ? theme.palette.primary.main : theme.palette.secondary.main,
  color: isUser ? '#fff' : '#fff',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  maxWidth: '75%',
  wordWrap: 'break-word',
}));

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [message, setMessage] = useState('');

  const generateResponse = (userMessage) => {
    const responses = {
      "How are you?": "I'm doing great, thank you! How about you?",
      "What is your name?": "I'm User2, your chat companion!",
      "Tell me a joke": "Why did the chat application break up? It couldn't find a connection!",
    };
    return responses[userMessage] || "That's interesting!";
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    dispatch(sendMessage({ text: message }));
    setMessage('');

    setTimeout(() => {
      dispatch(receiveMessage({ text: generateResponse(message) }));
    }, 2000);
  };

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Chat Application</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Box id="chat-window" flexGrow={1} overflow="auto" p={2} bgcolor="#eceff1" borderRadius="8px" mt={2}>
          <List>
            {messages.map((msg) => (
              <StyledListItem key={msg.id} isUser={msg.user === 'User1'}>
                <Avatar sx={{ bgcolor: msg.user === 'User1' ? 'primary.main' : 'secondary.main' }}>
                  {msg.user.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={msg.text}
                  secondary={`${msg.user} - ${msg.timestamp}`}
                  primaryTypographyProps={{
                    style: {
                      fontWeight: 'bold',
                      color: '#fff',
                    },
                  }}
                />
              </StyledListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" p={2}>
          <TextField
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{ mr: 1 }}
            placeholder="Type your message..."
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} endIcon={<SendRoundedIcon />}>
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Chat;