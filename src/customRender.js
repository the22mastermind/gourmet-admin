import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './context/theme';
import { AuthProvider } from './context/AuthState';
import { AlertProvider } from './context/AlertState';
import { DataProvider } from './context/DataState';

const history = createMemoryHistory();

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AlertProvider>
        <DataProvider>
          <Router history={history}>
            {children}
          </Router>
        </DataProvider>
      </AlertProvider>
    </AuthProvider>
  </ThemeProvider>
);

const customRender = (ui, options) => {
  render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
