import { render, screen } from '@testing-library/react';
import { UrichUtext } from '../UrichUtext';

test('UrichUtext renders', () => {
  render(<UrichUtext />);
  expect(screen.getByText('UrichUtext works!')).toBeInTheDocument();
});
