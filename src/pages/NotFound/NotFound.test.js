import React from 'react';
import { render, screen } from '../../customRender';
import NotFound from './NotFound';

test('Renders <NotFound /> component', () => {
  render(<NotFound />);
  const icon = screen.getByLabelText('error-icon');
  const title = screen.getByText(/Page not found/i);
  expect(icon).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});

test('<NotFound /> component should match snapshot', () => {
  render(<NotFound />);
  expect(screen).toMatchSnapshot();
});
