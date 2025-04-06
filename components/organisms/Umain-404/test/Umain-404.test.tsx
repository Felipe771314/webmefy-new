import { render, screen } from '@testing-library/react';
import { Umain-404 } from '../Umain-404';

test('Umain-404 renders', () => {
  render(<Umain-404 />);
  expect(screen.getByText('Umain-404 works!')).toBeInTheDocument();
});
