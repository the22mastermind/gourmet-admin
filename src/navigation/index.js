import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from '../context/AuthState';
import theme from '../context/theme';
import Routes from './Routes';

const Providers = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </ThemeProvider>
);

export default Providers;
