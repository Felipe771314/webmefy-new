import { render, screen } from '@testing-library/react';
import { UimageUbanner } from '../UimageUbanner';

test('UimageUbanner renders', () => {
  render(<UimageUbanner />);
  expect(screen.getByText('UimageUbanner works!')).toBeInTheDocument();
});
