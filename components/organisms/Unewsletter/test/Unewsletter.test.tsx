import { render, screen } from '@testing-library/react';
import { Unewsletter } from '../Unewsletter';

test('Unewsletter renders', () => {
  render(<Unewsletter />);
  expect(screen.getByText('Unewsletter works!')).toBeInTheDocument();
});
