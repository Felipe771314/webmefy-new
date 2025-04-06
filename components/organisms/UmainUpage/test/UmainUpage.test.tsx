import { render, screen } from '@testing-library/react';
import { UmainUpage } from '../UmainUpage';

test('UmainUpage renders', () => {
  render(<UmainUpage />);
  expect(screen.getByText('UmainUpage works!')).toBeInTheDocument();
});
