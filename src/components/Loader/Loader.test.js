import React from 'react';
import { render, screen } from '../../customRender';
import Loader from './Loader';

test('Renders <Loader /> component', () => {
  render(<Loader color="primary" data-testid="loader" />);
  const component = screen.getByTestId('loader');
  expect(component).toBeInTheDocument();
});

test('<Loader /> component should match snapshot', () => {
  render(<Loader />);
  expect(screen).toMatchSnapshot();
});
