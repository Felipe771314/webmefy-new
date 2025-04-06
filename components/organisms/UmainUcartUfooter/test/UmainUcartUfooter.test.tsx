import { render, screen } from '@testing-library/react';
import { UmainUcartUfooter } from '../UmainUcartUfooter';

test('UmainUcartUfooter renders', () => {
  render(<UmainUcartUfooter />);
  expect(screen.getByText('UmainUcartUfooter works!')).toBeInTheDocument();
});
