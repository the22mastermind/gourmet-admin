import React from 'react';
import { render, screen } from 'customRender';
import Loader from './Loader';

describe('<Loader />', () => {
  test('Renders <Loader /> component', () => {
    render(<Loader color="secondary" />);
    const component = screen.getByTestId('loader');
    expect(component).toBeInTheDocument();
  });
  
  test('<Loader /> component should match snapshot', () => {
    render(<Loader color="secondary" />);
    expect(screen).toMatchSnapshot();
  });
});
