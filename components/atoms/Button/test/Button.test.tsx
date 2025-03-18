import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

test('renders Button with label', () => {
  render(<Button label="Click me" />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('triggers onClick handler when clicked', () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
