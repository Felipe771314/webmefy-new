import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

test('renders Spinner component', () => {
  render(<Spinner />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});
