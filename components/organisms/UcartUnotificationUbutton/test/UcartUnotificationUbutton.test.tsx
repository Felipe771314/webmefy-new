import { render, screen } from '@testing-library/react';
import { UcartUnotificationUbutton } from '../UcartUnotificationUbutton';

test('UcartUnotificationUbutton renders', () => {
  render(<UcartUnotificationUbutton />);
  expect(screen.getByText('UcartUnotificationUbutton works!')).toBeInTheDocument();
});
