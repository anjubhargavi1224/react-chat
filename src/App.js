// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import store from './store';
import Chat from './Chat';
import { CssBaseline } from '@mui/material';
import theme from './theme';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Chat />
      </ThemeProvider>
    </Provider>
  );
};

export default App;