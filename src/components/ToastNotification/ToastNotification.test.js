import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '../../customRender';
import ToastNotification from './ToastNotification';

const props = {
  autoHideDuration: 5000,
  variant: 'filled',
  text: 'This is a notification message',
  handleCloseAlert: jest.fn(),
};

test('Renders a success <ToastNotification /> component', () => {
  render(<ToastNotification severity="success" {...props} />);
  const element = screen.getByText(/This is a notification message/i);
  expect(element).toBeInTheDocument();
});

test('Renders an error <ToastNotification /> component', () => {
  render(<ToastNotification severity="error" {...props} />);
  const element = screen.getByText(/This is a notification message/i);
  expect(element).toBeInTheDocument();
});

test('Renders an info <ToastNotification /> component', () => {
  render(<ToastNotification severity="info" {...props} />);
  const element = screen.getByText(/This is a notification message/i);
  expect(element).toBeInTheDocument();
});

test('Closes the <ToastNotification />', async () => {
  render(<ToastNotification severity="info" {...props} />);
  const button = screen.getByRole('button');

  await act(async () => {
    fireEvent.click(button);
  });
  await waitFor(() => {
    expect(fireEvent.click(button)).toBeTruthy();
    expect(props.handleCloseAlert).toHaveBeenCalled();
  });
});
