import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor, within } from 'customRender';
import OrdersListPage from './OrdersListPage';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const mockedOrdersData = {
  data: [
    {
      id: 6,
      total: '30',
      status: 'pending',
      paymentId: '1234567797',
      userId: 7,
      createdAt: new Date().toString(),
      Contents: [{
        itemId: 4,
        itemName: 'Pizza',
        cost: '30',
        quantity: 3,
      }],
      User: {
        id: 7,
        firstName: 'James',
        lastName: 'King',
        address: 'Kigali, Rwanda',
        phoneNumber: '+250734107000',
      },
    },
    {
      id: 5,
      total: '30',
      status: 'pending',
      paymentId: '1234567797',
      userId: 6,
      createdAt: new Date().toString(),
      Contents: [{
        itemId: 4,
        itemName: 'Vegetarian Pizza',
        cost: '30',
        quantity: 3,
      }],
      User: {
        id: 6,
        firstName: 'James',
        lastName: 'King',
        address: 'Kigali, Rwanda',
        phoneNumber: '+250734107000',
      },
    },
    {
      id: 4,
      total: '30',
      status: 'pending',
      paymentId: '1234567797',
      userId: 5,
      createdAt: new Date().toString(),
      Contents: [{
        itemId: 4,
        itemName: 'Vegetarian Pizza',
        cost: '30',
        quantity: 3,
      }],
      User: {
        id: 5,
        firstName: 'James',
        lastName: 'King',
        address: 'Kigali, Rwanda',
        phoneNumber: '+250734107000',
      },
    },
    {
      id: 3,
      total: '30',
      status: 'pending',
      paymentId: '1234567797',
      userId: 4,
      createdAt: new Date().toString(),
      Contents: [{
        itemId: 4,
        itemName: 'Vegetarian Pizza',
        cost: '30',
        quantity: 3,
      }],
      User: {
        id: 4,
        firstName: 'James',
        lastName: 'King',
        address: 'Kigali, Rwanda',
        phoneNumber: '+250734107000',
      },
    },
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

describe('<OrdersListPage />', () => {
  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });

  test('opens the details panel for a particular row', async () => {
    jest.setTimeout(10000);

    mockAxios.onGet(`${baseUrl}/api/admin/orders`).reply(200, mockedOrdersData);

    render(<OrdersListPage />);

    // Row content
    await waitFor(() => {
      expect(screen.queryByText('Orders list')).toBeTruthy();
      expect(screen.getAllByTestId('order-table-body-row').length).toBe(5);
      expect(screen.queryByText('Order #5')).toBeTruthy();
      expect(screen.queryByText('Order #4')).toBeTruthy();
      expect(screen.getAllByTestId('row-details-button').length).toBe(5);
      expect(screen.getByTestId('last-page-button')).toBeTruthy();
    });

    await act(async () => {
      userEvent.click(screen.getAllByTestId('row-details-button')[0]);
    });

    const panel = screen.getAllByTestId('row-details-panel')[0];

    // Details panel content
    await waitFor(() => {
      expect(within(panel).queryByText('Order #6 details')).toBeTruthy();
      expect(within(panel).queryByText('Pizza')).toBeTruthy();
      expect(within(panel).getByTestId('update-status-button')).toBeTruthy();
      expect(within(panel).getByTestId('user-info-button')).toBeTruthy();
      expect(within(panel).getByTestId('item-4-row')).toBeTruthy();
    });

    // Open modal to update status
    await act(async () => {
      userEvent.click(within(panel).getByTestId('update-status-button'));
    });

    const updateModal = screen.getByTestId('select-modal');

    await waitFor(() => {
      expect(within(updateModal).queryByText('Order #6 status')).toBeTruthy();
    });

    // Cancel update and close modal
    await act(async () => {
      userEvent.click(within(updateModal).getByTestId('cancel-button'));
    });
    
    // Update status modal should not be visible
    await waitFor(() => {
      expect(updateModal).not.toBeInTheDocument();
    });

    // Open modal to view user info
    await act(async () => {
      userEvent.click(within(panel).getByTestId('user-info-button'));
    });

    const userInfoModal = screen.getByTestId('dialog-wrapper');

    await waitFor(() => {
      expect(within(userInfoModal).queryByText('User information')).toBeTruthy();
      expect(within(userInfoModal).queryByText('#7')).toBeTruthy();
      expect(within(userInfoModal).queryByText('James King')).toBeTruthy();
    });

    // Close user info modal
    await act(async () => {
      userEvent.click(within(userInfoModal).getByTestId('close-dialog-button'));
    });
    
    // User info modal should not be visible
    await waitFor(() => {
      expect(userInfoModal).not.toBeInTheDocument();
    });

    // Go to last page
    await act(async () => {
      userEvent.click(screen.getByTestId('last-page-button'));
    });

    // Table should show only one row (Order #1)
    await waitFor(() => {
      expect(screen.getAllByTestId('order-table-body-row').length).toBe(1);
      expect(screen.queryByText('Order #1')).toBeTruthy();
      expect(screen.getAllByTestId('row-details-button').length).toBe(1);
    });

    // Go to back to first page
    await act(async () => {
      userEvent.click(screen.getByTestId('first-page-button'));
    });

    // Table should show 5 rows (on the first page)
    await waitFor(() => {
      expect(screen.getAllByTestId('order-table-body-row').length).toBe(5);
      expect(screen.getAllByTestId('row-details-button').length).toBe(5);
    });

    // Go to next page (second page)
    await act(async () => {
      userEvent.click(screen.getByTestId('next-page-button'));
    });

    // Table should show only 1 row (on the second page)
    await waitFor(() => {
      expect(screen.getAllByTestId('order-table-body-row').length).toBe(1);
      expect(screen.getAllByTestId('row-details-button').length).toBe(1);
    });

    // Go to previous page (first page)
    await act(async () => {
      userEvent.click(screen.getByTestId('previous-page-button'));
    });

    // Table should show 5 rows (on the first page)
    await waitFor(() => {
      expect(screen.getAllByTestId('order-table-body-row').length).toBe(5);
      expect(screen.getAllByTestId('row-details-button').length).toBe(5);
    });
  });
});
