import { render, screen } from '@testing-library/react';
import { UcartUdrawer } from '../UcartUdrawer';

test('UcartUdrawer renders', () => {
  render(<UcartUdrawer />);
  expect(screen.getByText('UcartUdrawer works!')).toBeInTheDocument();
});
