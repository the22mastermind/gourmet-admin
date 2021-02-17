import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './context/theme';
import { AuthProvider } from './context/AuthState';

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </AuthProvider>
  </ThemeProvider>
);

const customRender = (ui, options) => {
  render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
