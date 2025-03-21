import React from 'react';
import { render, screen } from '@testing-library/react';
import FormInputGroup from '../FormInputGroup';

describe('FormInputGroup', () => {
  test('renders label, input and help text', () => {
    render(
      <FormInputGroup
        id="test-input"
        label="Test Label"
        placeholder="Enter text"
        helpText="Help message"
      />,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByText('Help message')).toBeInTheDocument();
  });
});
