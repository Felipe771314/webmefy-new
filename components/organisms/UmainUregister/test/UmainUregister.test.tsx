import { render, screen } from '@testing-library/react';
import { UmainUregister } from '../UmainUregister';

test('UmainUregister renders', () => {
  render(<UmainUregister />);
  expect(screen.getByText('UmainUregister works!')).toBeInTheDocument();
});
