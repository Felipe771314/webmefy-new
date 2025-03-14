import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders Button component', () => {
  render(<Button />);
  expect(screen.getByText('Button')).toBeInTheDocument();
});
