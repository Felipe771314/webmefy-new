import { render, screen } from '@testing-library/react';
import { UcustomUliquid } from '../UcustomUliquid';

test('UcustomUliquid renders', () => {
  render(<UcustomUliquid />);
  expect(screen.getByText('UcustomUliquid works!')).toBeInTheDocument();
});
