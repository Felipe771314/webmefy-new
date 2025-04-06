import { render, screen } from '@testing-library/react';
import { UmainUcartUitems } from '../UmainUcartUitems';

test('UmainUcartUitems renders', () => {
  render(<UmainUcartUitems />);
  expect(screen.getByText('UmainUcartUitems works!')).toBeInTheDocument();
});
