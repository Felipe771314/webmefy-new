import { render, screen } from '@testing-library/react';
import { Uvideo } from '../Uvideo';

test('Uvideo renders', () => {
  render(<Uvideo />);
  expect(screen.getByText('Uvideo works!')).toBeInTheDocument();
});
