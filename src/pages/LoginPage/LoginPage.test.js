import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent, waitFor, act } from '../../customRender';
import LoginPage from './LoginPage';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);

describe('<LoginPage />', () => {
  beforeEach(() => {
    render(<LoginPage />);
  });
  afterEach(() => {
    mockAxios.reset();
  });
  afterAll(() => {
    mockAxios.restore();
  });

  test('Should render input components and submit button', async () => {
    expect(screen.getByTestId('phoneNumber')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  test('Should display required validation errors', async () => {
    userEvent.click(screen.getByTestId('login-button'));

    expect(await screen.findAllByLabelText('error-helper-text')).toHaveLength(2);
    expect(screen.queryByText('Phone number is required')).toBeInTheDocument();
    expect(screen.queryByText('Password is required')).toBeInTheDocument();
  });

  test('Should display invalid phone number validation error', async () => {
    const input = screen.getByLabelText('phoneNumber');
    await act(async () => {
      fireEvent.change(input, { target: { value: '+250723047$fafa' } });
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    expect(screen.queryByText('Phone number must include country code eg. +250')).toBeInTheDocument();
  });

  test('Should display invalid password validation error', async () => {
    const input = screen.getByLabelText('password');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'hello' } });
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    expect(screen.queryByText('Password length must be between 6 and 20, with at least one number and a symbol')).toBeInTheDocument();
  });

  test('Should display invalid phone number and password validation errors', async () => {
    const phoneNumberInput = screen.getByLabelText('phoneNumber');
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: '+250723047$fafa' } });
    });

    const passwordInput = screen.getByLabelText('password');
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'hello' } });
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    expect(screen.queryByText('Phone number must include country code eg. +250')).toBeInTheDocument();
    expect(screen.queryByText('Password length must be between 6 and 20, with at least one number and a symbol')).toBeInTheDocument();
  });

  test('Should display network error', async () => {
    const phoneNumberInput = screen.getByLabelText('phoneNumber');
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: '+250721110037' } });
    });

    const passwordInput = screen.getByLabelText('password');
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'hello@1love' } });
    });

    mockAxios.onPost(`${baseUrl}/api/auth/login`).networkError();

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Network Error')).toBeInTheDocument();
      expect(window.sessionStorage.getItem('auth')).toBeNull();
    });
  });

  test('Should display unauthorized error', async () => {
    const phoneNumberInput = screen.getByLabelText('phoneNumber');
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: '+250721110037' } });
    });

    const passwordInput = screen.getByLabelText('password');
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'hello@1love' } });
    });

    const notAdminMockedData = {
      token: 'someverylongtoken',
      data: {
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'customer',
        status: true,
      },
    };
    mockAxios.onPost(`${baseUrl}/api/auth/login`).reply(200, notAdminMockedData);

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Access denied. You must be an admin to proceed')).toBeInTheDocument();
      expect(window.sessionStorage.getItem('auth')).toBeNull();
    });
  });

  test('Should display user not found error', async () => {
    const phoneNumberInput = screen.getByLabelText('phoneNumber');
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: '+250721110037' } });
    });

    const passwordInput = screen.getByLabelText('password');
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'hello@1love' } });
    });

    const notFoundMockedData = {
      error: 'User not found',
    };
    mockAxios.onPost(`${baseUrl}/api/auth/login`).reply(404, notFoundMockedData);

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    await waitFor(() => {
      expect(screen.queryByText('User not found')).toBeInTheDocument();
      expect(window.sessionStorage.getItem('auth')).toBeNull();
    });
  });

  test('Should login successfully', async () => {
    const phoneNumberInput = screen.getByLabelText('phoneNumber');
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: '+250721110037' } });
    });

    const passwordInput = screen.getByLabelText('password');
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'hello@1love' } });
    });

    const mockedData = {
      token: 'someverylongtoken',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        status: true,
      },
    };
    mockAxios.onPost(`${baseUrl}/api/auth/login`).reply(200, mockedData);

    await act(async () => {
      userEvent.click(screen.getByTestId('login-button'));
    });

    await waitFor(() => {
      const auth = JSON.parse(window.sessionStorage.getItem('auth'));
      expect(auth.authenticated).toBeTruthy();
      expect(auth.user.role).toEqual('admin');
    });
  });
});
