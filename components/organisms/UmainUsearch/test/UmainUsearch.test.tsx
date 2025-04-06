import { render, screen } from '@testing-library/react';
import { UmainUsearch } from '../UmainUsearch';

test('UmainUsearch renders', () => {
  render(<UmainUsearch />);
  expect(screen.getByText('UmainUsearch works!')).toBeInTheDocument();
});
