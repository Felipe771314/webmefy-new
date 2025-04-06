import { render, screen } from '@testing-library/react';
import { UmainUaccount } from '../UmainUaccount';

test('UmainUaccount renders', () => {
  render(<UmainUaccount />);
  expect(screen.getByText('UmainUaccount works!')).toBeInTheDocument();
});
