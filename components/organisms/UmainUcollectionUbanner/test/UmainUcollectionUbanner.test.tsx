import { render, screen } from '@testing-library/react';
import { UmainUcollectionUbanner } from '../UmainUcollectionUbanner';

test('UmainUcollectionUbanner renders', () => {
  render(<UmainUcollectionUbanner />);
  expect(screen.getByText('UmainUcollectionUbanner works!')).toBeInTheDocument();
});
