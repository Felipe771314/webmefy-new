import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

test('renders Badge component', () => {
  render(<Badge text="Badge" variant="primary" />);
  expect(screen.getByText('Badge')).toBeInTheDocument();
});
