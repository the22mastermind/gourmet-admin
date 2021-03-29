import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from 'customRender';
import SelectModal from './SelectModal';

const props = {
  openStatus: true,
  toggleOpenStatus: jest.fn(),
  orderStatus: 'pending',
  orderId: 1,
};

describe('<SelectModal />', () => {
  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
  test('<SelectModal /> rendering', async () => {
    render(<SelectModal {...props} />);
    
    expect(screen.queryByText('Order #1 status')).toBeInTheDocument();
    expect(screen.getByTestId('select-input')).toBeTruthy();
    expect(screen.getByTestId('cancel-button')).toBeTruthy();
    expect(screen.getByTestId('confirm-button')).toBeTruthy();
  });
  
  test('<SelectModal /> cancel button press', async () => {
    render(<SelectModal {...props} />);
    
    await act(async () => {
      userEvent.click(screen.getByTestId('cancel-button'));
    });
    
    await waitFor(() => {
      expect(props.toggleOpenStatus).toHaveBeenCalled();
    });
  });
  
  test('<SelectModal /> matches the snapshot', async () => {
    render(<SelectModal {...props} />);

    expect(screen).toMatchSnapshot();
  });
});
