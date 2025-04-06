import { render, screen } from '@testing-library/react';
import { UmainUaddresses } from '../UmainUaddresses';

test('UmainUaddresses renders', () => {
  render(<UmainUaddresses />);
  expect(screen.getByText('UmainUaddresses works!')).toBeInTheDocument();
});
