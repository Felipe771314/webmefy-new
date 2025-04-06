import { render, screen } from '@testing-library/react';
import { UfeaturedUproduct } from '../UfeaturedUproduct';

test('UfeaturedUproduct renders', () => {
  render(<UfeaturedUproduct />);
  expect(screen.getByText('UfeaturedUproduct works!')).toBeInTheDocument();
});
