import { render, screen } from '@testing-library/react';
import { UmainUorder } from '../UmainUorder';

test('UmainUorder renders', () => {
  render(<UmainUorder />);
  expect(screen.getByText('UmainUorder works!')).toBeInTheDocument();
});
