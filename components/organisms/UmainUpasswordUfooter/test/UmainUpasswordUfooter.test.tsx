import { render, screen } from '@testing-library/react';
import { UmainUpasswordUfooter } from '../UmainUpasswordUfooter';

test('UmainUpasswordUfooter renders', () => {
  render(<UmainUpasswordUfooter />);
  expect(screen.getByText('UmainUpasswordUfooter works!')).toBeInTheDocument();
});
