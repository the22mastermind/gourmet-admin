import React from 'react';
import { render, screen, fireEvent } from '../../customRender';
import FormInput from './FormInput';

const props = {
  label: 'Phone number',
  name: 'phoneNumber',
  variant: 'outlined',
  type: 'text',
  required: true,
};

const passwordProps = {
  label: 'Password',
  name: 'password',
  variant: 'outlined',
  type: 'password',
  required: true,
};

test('Renders <FormInput /> component', () => {
  render(<FormInput data-testid="form-input" {...props} />);
  const input = screen.getByTestId('form-input');
  expect(input).toBeInTheDocument();
});

test('<FormInput /> component text change', () => {
  render(<FormInput {...props} inputProps={{ 'aria-label': 'phoneNumber' }} />);
  const input = screen.getByLabelText('phoneNumber');
  fireEvent.change(input, { target: { value: '+250723047800' } });
  expect(input.value).toBe('+250723047800');
});

test('<FormInput /> component for password', () => {
  render(<FormInput {...passwordProps} inputProps={{ 'aria-label': 'password' }} />);
  const input = screen.getByLabelText('password');
  fireEvent.change(input, { target: { value: 'helloworld' } });
  expect(input.value).toBe('helloworld');
  expect(input.getAttribute('type')).toBe('password');
});

test('<FormInput /> component should match snapshot', () => {
  render(<FormInput />);
  expect(screen).toMatchSnapshot();
});
