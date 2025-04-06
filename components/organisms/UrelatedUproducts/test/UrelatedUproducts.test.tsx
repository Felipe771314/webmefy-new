import { render, screen } from '@testing-library/react';
import { UrelatedUproducts } from '../UrelatedUproducts';

test('UrelatedUproducts renders', () => {
  render(<UrelatedUproducts />);
  expect(screen.getByText('UrelatedUproducts works!')).toBeInTheDocument();
});
