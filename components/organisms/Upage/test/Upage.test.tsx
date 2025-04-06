import { render, screen } from '@testing-library/react';
import { Upage } from '../Upage';

test('Upage renders', () => {
  render(<Upage />);
  expect(screen.getByText('Upage works!')).toBeInTheDocument();
});
