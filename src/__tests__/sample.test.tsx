import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders a test component', () => {
  render(<div>Hello, Jest!</div>);
  expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
});
