import React from 'react';
import { render, screen } from 'customRender';
import SimpleList from './SimpleList';

const props = {
  data: {
    id: 1,
    firstName: 'Test',
    lastName: 'Admin',
    phoneNumber: '+250741349700',
    address: 'Kigali, Rwanda',
  },
};

describe('<SimpleList />', () => {
  test('<SimpleList /> rendering', async () => {
    render(<SimpleList {...props} />);

    expect(screen.queryByText('#1')).toBeInTheDocument();
    expect(screen.queryByText('Test Admin')).toBeInTheDocument();
    expect(screen.queryByText('+250741349700')).toBeInTheDocument();
    expect(screen.queryByText('Kigali, Rwanda')).toBeInTheDocument();
  });

  test('<SimpleList /> matches the snapshot', async () => {
    render(<SimpleList {...props} />);

    expect(screen).toMatchSnapshot();
  });
});
