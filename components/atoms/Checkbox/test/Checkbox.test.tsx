import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  test('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Check me" onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Check me'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });
});
