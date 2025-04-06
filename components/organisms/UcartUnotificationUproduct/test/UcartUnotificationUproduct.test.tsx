import { render, screen } from '@testing-library/react';
import { UcartUnotificationUproduct } from '../UcartUnotificationUproduct';

test('UcartUnotificationUproduct renders', () => {
  render(<UcartUnotificationUproduct />);
  expect(screen.getByText('UcartUnotificationUproduct works!')).toBeInTheDocument();
});
