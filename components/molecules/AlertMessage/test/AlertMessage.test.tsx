import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertMessage from '../AlertMessage';

describe('AlertMessage', () => {
  test('renders alert message', () => {
    render(<AlertMessage message="Alert test" />);
    expect(screen.getByText('Alert test')).toBeInTheDocument();
  });

  test('dismisses alert when close button is clicked', () => {
    render(<AlertMessage message="Dismiss me" />);
    fireEvent.click(screen.getByText('X'));
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });
});
