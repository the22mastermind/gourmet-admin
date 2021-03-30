import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor, act, within } from 'customRender';
import CustomDrawer from './CustomDrawer';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const props = {
  auth: {
    authenticated: true,
    user: {
      token: 'averylongtoken',
      firstName: 'Test',
      lastName: 'Admin',
      phoneNumber: '+250741349700',
      address: 'Kigali, Rwanda',
      role: 'admin',
      status: true,
    },
  },
};
const mockedOrdersData = {
  data: [
    {
      id: 2,
      total: '8',
      status: 'pending',
      paymentId: '123456788',
      userId: 3,
      createdAt: new Date().toString(),
      Contents: [{
        itemId: 1,
        itemName: 'BBQ Pizza',
        cost: '8',
        quantity: 1,
      }],
      User: {
        id: 3,
        firstName: 'Jane',
        lastName: 'Doe',
        address: 'Kigali, Rwanda',
        phoneNumber: '+250734107888',
      },
    },
    {
      id: 1,
      total: '20',
      status: 'accepted',
      paymentId: '123456789',
      userId: 2,
      createdAt: new Date().toString(),
      Contents: [{
        itemId: 5,
        itemName: 'Chicken Pizza',
        cost: '20',
        quantity: 2,
      }],
      User: {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        address: 'Kigali, Rwanda',
        phoneNumber: '+250734107890',
      },
    },
  ],
};
const mockedUpdatedOrderData = {
  message: 'Order updated successfully',
  data: {
    id: 2,
    total: '8',
    status: 'pending',
    paymentId: '123456788',
    userId: 3,
  },
};

describe('<CustomDrawer />', () => {
  beforeEach(async () => {
    mockAxios.onGet(`${baseUrl}/api/admin/orders`).reply(404, { error: 'Data not found' });
    await act(async () => {
      render(<CustomDrawer {...props} />);
    });
  });
  test('Renders title, logged-in user names, and logout button', async () => {
    // Open Menu
    await act(async () => {
      userEvent.click(screen.getByTestId('header-menu-button'));
    });

    expect(screen.queryByText('Gourmet Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Test Admin')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();

    // Close Menu
    await act(async () => {
      userEvent.click(screen.getByTestId('header-menu-button'));
    });
  });

  test('Should open and close drawer', async () => {
    await act(async () => {
      window.sessionStorage.setItem('auth', JSON.stringify(props.auth));
    });

    // Open the drawer by clicking on the title
    await act(async () => {
      userEvent.click(screen.queryByText('Gourmet Dashboard'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('drawer-item-orders')).toBeInTheDocument();
    });

    // Close the drawer
    await act(async () => {
      userEvent.click(screen.getByTestId('drawer-item-orders'));
    });
  });

  test('Should display invalid token', async () => {
    await act(async () => {
      window.sessionStorage.setItem('auth', JSON.stringify(props.auth));
    });

    const mockedData = {
      error: 'Invalid token, please login and try again',
    };
    mockAxios.onGet(`${baseUrl}/api/auth/logout`).reply(401, mockedData);

    await act(async () => {
      userEvent.click(screen.getByTestId('logout-button'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Invalid token, please login and try again')).toBeInTheDocument();
    });
  });

  test('Should logout successfully', async () => {
    await act(async () => {
      window.sessionStorage.setItem('auth', JSON.stringify(props.auth));
    });

    const mockedData = {
      message: 'Logged out successfully',
    };
    mockAxios.onGet(`${baseUrl}/api/auth/logout`).reply(200, mockedData);

    await act(async () => {
      userEvent.click(screen.getByTestId('logout-button'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Logged out successfully')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(window.sessionStorage.getItem('auth')).toBeNull();
    }, { timeout: 5000 });
  });

  test('<CustomDrawer /> component should match snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});

describe('<OrdersListPage />', () => {
  jest.setTimeout(10000);
  beforeEach(async () => {
    mockAxios.onGet(`${baseUrl}/api/admin/orders`).reply(200, mockedOrdersData);
    await act(async () => {
      render(<CustomDrawer {...props} />);
    });
  });
  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });

  test('Should display error or success messages on order status update', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('row-details-button').length).toBe(2);
    });

    await act(async () => {
      userEvent.click(screen.getAllByTestId('row-details-button')[0]);
    });

    const panel = screen.getAllByTestId('row-details-panel')[0];

    await waitFor(() => {
      expect(within(panel).queryByText('Order #2 details')).toBeTruthy();
      expect(within(panel).queryByText('BBQ Pizza')).toBeTruthy();
      expect(within(panel).getByTestId('update-status-button')).toBeTruthy();
      expect(within(panel).getByTestId('user-info-button')).toBeTruthy();
    });

    // Open modal to update status
    await act(async () => {
      userEvent.click(within(panel).getByTestId('update-status-button'));
    });

    const updateModal = screen.getByTestId('select-modal');

    await waitFor(() => {
      expect(within(updateModal).queryByText('Order #2 status')).toBeTruthy();
    });

    // Mock error response
    mockAxios.onPatch(`${baseUrl}/api/admin/orders/2`).reply(404, { error: 'Order not found' });
    
    await act(async () => {
      userEvent.click(within(updateModal).getByTestId('confirm-button'));
    });

    let toastNotification = screen.getByTestId('alert-wrapper');
    
    await waitFor(() => {
      expect(within(toastNotification).queryByText('Order not found')).toBeTruthy();
    });

    // Close alert dialog to clear error
    await act(async () => {
      userEvent.click(within(toastNotification).getByRole('button', { hidden: true }));
    });

    // Mock success response
    mockAxios.onPatch(`${baseUrl}/api/admin/orders/2`).reply(200, mockedUpdatedOrderData);
    
    await act(async () => {
      userEvent.click(within(updateModal).getByTestId('confirm-button'));
    });

    toastNotification = screen.getByTestId('alert-wrapper');
    
    await waitFor(() => {
      expect(within(toastNotification).queryByText('Order updated successfully')).toBeTruthy();
    });
    
    // Update modal should not be visible
    await waitFor(() => {
      expect(updateModal).not.toBeInTheDocument();
    });
  });
});
