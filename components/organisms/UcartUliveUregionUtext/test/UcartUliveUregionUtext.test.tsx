import { render, screen } from '@testing-library/react';
import { UcartUliveUregionUtext } from '../UcartUliveUregionUtext';

test('UcartUliveUregionUtext renders', () => {
  render(<UcartUliveUregionUtext />);
  expect(screen.getByText('UcartUliveUregionUtext works!')).toBeInTheDocument();
});
