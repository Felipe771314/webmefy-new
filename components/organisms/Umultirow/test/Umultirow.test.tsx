import { render, screen } from '@testing-library/react';
import { Umultirow } from '../Umultirow';

test('Umultirow renders', () => {
  render(<Umultirow />);
  expect(screen.getByText('Umultirow works!')).toBeInTheDocument();
});
