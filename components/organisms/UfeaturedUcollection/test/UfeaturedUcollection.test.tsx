import { render, screen } from '@testing-library/react';
import { UfeaturedUcollection } from '../UfeaturedUcollection';

test('UfeaturedUcollection renders', () => {
  render(<UfeaturedUcollection />);
  expect(screen.getByText('UfeaturedUcollection works!')).toBeInTheDocument();
});
