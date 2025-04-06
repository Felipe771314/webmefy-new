import { render, screen } from '@testing-library/react';
import { UmainUblog } from '../UmainUblog';

test('UmainUblog renders', () => {
  render(<UmainUblog />);
  expect(screen.getByText('UmainUblog works!')).toBeInTheDocument();
});
