import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from 'customRender';
import UserInfo from './UserInfo';

const props = {
  user: {
    id: 1,
    firstName: 'Test',
    lastName: 'Admin',
    phoneNumber: '+250741349700',
    address: 'Kigali, Rwanda',
  },
  customerInfo: true,
  toggleShowCustomerInfo: jest.fn(),
};

describe('<UserInfo />', () => {
  test('<UserInfo /> rendering', async () => {
    render(<UserInfo {...props} />);

    expect(screen.getByTestId('dialog-wrapper')).toBeTruthy();
    expect(screen.queryByText('User information')).toBeInTheDocument();
    expect(screen.queryByText('Test Admin')).toBeInTheDocument();
    expect(screen.queryByText('+250741349700')).toBeInTheDocument();
    expect(screen.queryByText('Kigali, Rwanda')).toBeInTheDocument();
  });

  test('<UserInfo /> onClose event', async () => {
    render(<UserInfo {...props} />);

    expect(screen.getByTestId('dialog-wrapper')).toBeTruthy();
    expect(screen.getByTestId('close-dialog-button')).toBeTruthy();
    expect(screen.queryByText('User information')).toBeTruthy();

    await act(async () => {
      userEvent.click(screen.getByTestId('close-dialog-button'));
    });

    await waitFor(() => {
      expect(props.toggleShowCustomerInfo).toHaveBeenCalled();
    });
  });

  test('<UserInfo /> matches the snapshot', async () => {
    render(<UserInfo {...props} />);

    expect(screen).toMatchSnapshot();
  });
});
