import { render, screen } from '@testing-library/react';
import { Uapps } from '../Uapps';

test('Uapps renders', () => {
  render(<Uapps />);
  expect(screen.getByText('Uapps works!')).toBeInTheDocument();
});
