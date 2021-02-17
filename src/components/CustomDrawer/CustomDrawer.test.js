import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, act } from '../../customRender';
import CustomDrawer from './CustomDrawer';
import MockAdapter from 'axios-mock-adapter';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);

const props = {
  auth: {
    authenticated: true,
    user: {
      token: 'averylongtoken',
      firstName: 'Test',
      lastName: 'Admin',
    },
  },
};

describe('<CustomDrawer />', () => {
  beforeEach(() => {
    render(<CustomDrawer {...props} />);
  });
  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
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
