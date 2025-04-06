import { render, screen } from '@testing-library/react';
import { UmainUproduct } from '../UmainUproduct';

test('UmainUproduct renders', () => {
  render(<UmainUproduct />);
  expect(screen.getByText('UmainUproduct works!')).toBeInTheDocument();
});
