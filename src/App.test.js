import React from 'react';
import { render, screen } from './customRender';
import App from './App';

test('<App /> rendering', async () => {
  render(<App />);
  expect(screen).toMatchSnapshot();
});
