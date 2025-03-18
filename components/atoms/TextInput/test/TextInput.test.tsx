import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInput', () => {
  test('renders with placeholder', () => {
    render(<TextInput placeholder="Test Placeholder" />);
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<TextInput placeholder="Disabled" disabled />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });
});
