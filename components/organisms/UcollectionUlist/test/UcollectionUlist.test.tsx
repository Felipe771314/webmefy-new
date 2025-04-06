import { render, screen } from '@testing-library/react';
import { UcollectionUlist } from '../UcollectionUlist';

test('UcollectionUlist renders', () => {
  render(<UcollectionUlist />);
  expect(screen.getByText('UcollectionUlist works!')).toBeInTheDocument();
});
