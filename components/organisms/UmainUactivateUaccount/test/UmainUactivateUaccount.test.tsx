import { render, screen } from '@testing-library/react';
import { UmainUactivateUaccount } from '../UmainUactivateUaccount';

test('UmainUactivateUaccount renders', () => {
  render(<UmainUactivateUaccount />);
  expect(screen.getByText('UmainUactivateUaccount works!')).toBeInTheDocument();
});
