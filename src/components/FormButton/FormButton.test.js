import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from 'customRender';
import FormButton from './FormButton';

const props = {
  label: 'Log in',
  color: 'secondary',
  variant: 'contained',
  disableElevation: true,
};

test('Renders <FormButton /> component', () => {
  render(<FormButton data-testid="login-button" {...props} />);
  const button = screen.getByTestId('login-button');
  expect(button).toBeInTheDocument();
});

test('Button click calls onClick event', () => {
  const onClick = jest.fn();
  render(<FormButton data-testid="login-button" onClick={onClick} {...props} />);
  const button = screen.getByTestId('login-button');
  userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('<FormButton /> component should match snapshot', () => {
  render(<FormButton />);
  expect(screen).toMatchSnapshot();
});
