import { render, screen } from '@testing-library/react';
import { UcartUiconUbubble } from '../UcartUiconUbubble';

test('UcartUiconUbubble renders', () => {
  render(<UcartUiconUbubble />);
  expect(screen.getByText('UcartUiconUbubble works!')).toBeInTheDocument();
});
