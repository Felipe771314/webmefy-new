import { render, screen } from '@testing-library/react';
import { Uslideshow } from '../Uslideshow';

test('Uslideshow renders', () => {
  render(<Uslideshow />);
  expect(screen.getByText('Uslideshow works!')).toBeInTheDocument();
});
