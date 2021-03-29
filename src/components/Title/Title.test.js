import React from 'react';
import { render, screen } from '../../customRender';
import Title from './Title';

const props = {
  variant: 'h4',
  text: 'Login text',
  color: 'primary',
  align: 'left',
};

test('Renders <Title /> component', () => {
  render(<Title {...props} />);
  const text = screen.getByText(/Login text/i);
  expect(text).toBeInTheDocument();
});

test('<Title /> component should match snapshot', () => {
  render(<Title {...props} />);
  expect(screen).toMatchSnapshot();
});
