import { render, screen } from '@testing-library/react';
import { Ucollage } from '../Ucollage';

test('Ucollage renders', () => {
  render(<Ucollage />);
  expect(screen.getByText('Ucollage works!')).toBeInTheDocument();
});
