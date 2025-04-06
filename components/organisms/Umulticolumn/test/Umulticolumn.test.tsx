import { render, screen } from '@testing-library/react';
import { Umulticolumn } from '../Umulticolumn';

test('Umulticolumn renders', () => {
  render(<Umulticolumn />);
  expect(screen.getByText('Umulticolumn works!')).toBeInTheDocument();
});
