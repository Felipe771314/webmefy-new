import { render, screen } from '@testing-library/react';
import { UcontactUform } from '../UcontactUform';

test('UcontactUform renders', () => {
  render(<UcontactUform />);
  expect(screen.getByText('UcontactUform works!')).toBeInTheDocument();
});
