import { render, screen } from '@testing-library/react';
import { UmainUresetUpassword } from '../UmainUresetUpassword';

test('UmainUresetUpassword renders', () => {
  render(<UmainUresetUpassword />);
  expect(screen.getByText('UmainUresetUpassword works!')).toBeInTheDocument();
});
