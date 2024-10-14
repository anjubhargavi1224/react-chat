import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    currentUser: 'User1', // Mock user
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload.text,
        user: state.currentUser,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        id: Date.now() + Math.random(), // Unique ID for received message
        text: action.payload.text,
        user: 'User2', // Mock user for received messages
        timestamp: new Date().toLocaleTimeString(),
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;