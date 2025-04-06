import { render, screen } from '@testing-library/react';
import { UfeaturedUblog } from '../UfeaturedUblog';

test('UfeaturedUblog renders', () => {
  render(<UfeaturedUblog />);
  expect(screen.getByText('UfeaturedUblog works!')).toBeInTheDocument();
});
