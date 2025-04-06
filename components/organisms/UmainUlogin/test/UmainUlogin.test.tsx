import { render, screen } from '@testing-library/react';
import { UmainUlogin } from '../UmainUlogin';

test('UmainUlogin renders', () => {
  render(<UmainUlogin />);
  expect(screen.getByText('UmainUlogin works!')).toBeInTheDocument();
});
