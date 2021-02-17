import React from 'react';
import { render, screen } from '../../customRender';
import Dashboard from './index';

test('<Dashboard /> rendering', async () => {
  render(<Dashboard />);
  expect(screen).toMatchSnapshot();
});
