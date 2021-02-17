import React from 'react';
import { createBrowserHistory } from 'history';
import { render, screen, waitFor } from '../customRender';
import Routes from './Routes';

test('Initial app rendering', async () => {
  render(<Routes />);
  expect(screen.getByTestId('phoneNumber')).toBeInTheDocument();
  expect(screen.getByTestId('password')).toBeInTheDocument();
  expect(screen.getByTestId('login-button')).toBeInTheDocument();
});

test('Navigating to an invalid page', async () => {
  const history = createBrowserHistory();
  const route = '/abc';
  history.push(route);
  render(<Routes />);
  await waitFor(() => {
    expect(screen.queryByText('Page not found')).toBeInTheDocument();
  });
});
