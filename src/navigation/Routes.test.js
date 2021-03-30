import React from 'react';
import { render, screen } from 'customRender';
import Routes from './Routes';

describe('Navigation', () => {
  test('Initial app rendering', async () => {
    render(<Routes />);
    expect(screen.getByTestId('phoneNumber')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });
});
