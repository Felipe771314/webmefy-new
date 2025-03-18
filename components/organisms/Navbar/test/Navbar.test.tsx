import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

test('renders Navbar with brand name', () => {
  render(<Navbar />);
  expect(screen.getByText('MyBrand')).toBeInTheDocument();
});
