import { render, screen } from '@testing-library/react';
import { Ufooter } from '../Ufooter';

test('Ufooter renders', () => {
  render(<Ufooter />);
  expect(screen.getByText('Ufooter works!')).toBeInTheDocument();
});
