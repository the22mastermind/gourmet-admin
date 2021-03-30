import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from '../context/AuthState';
import { AlertProvider } from '../context/AlertState';
import { DataProvider } from '../context/DataState';
import theme from '../context/theme';
import Routes from './Routes';

const Providers = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AlertProvider>
        <DataProvider>
          <Routes />
        </DataProvider>
      </AlertProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default Providers;
