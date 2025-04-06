import { render, screen } from '@testing-library/react';
import { UmainUlistUcollections } from '../UmainUlistUcollections';

test('UmainUlistUcollections renders', () => {
  render(<UmainUlistUcollections />);
  expect(screen.getByText('UmainUlistUcollections works!')).toBeInTheDocument();
});
