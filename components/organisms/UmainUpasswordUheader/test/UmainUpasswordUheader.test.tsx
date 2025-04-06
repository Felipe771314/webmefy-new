import { render, screen } from '@testing-library/react';
import { UmainUpasswordUheader } from '../UmainUpasswordUheader';

test('UmainUpasswordUheader renders', () => {
  render(<UmainUpasswordUheader />);
  expect(screen.getByText('UmainUpasswordUheader works!')).toBeInTheDocument();
});
