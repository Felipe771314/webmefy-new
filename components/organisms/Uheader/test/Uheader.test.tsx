import { render, screen } from '@testing-library/react';
import { Uheader } from '../Uheader';

test('Uheader renders', () => {
  render(<Uheader />);
  expect(screen.getByText('Uheader works!')).toBeInTheDocument();
});
