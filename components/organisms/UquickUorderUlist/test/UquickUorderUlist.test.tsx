import { render, screen } from '@testing-library/react';
import { UquickUorderUlist } from '../UquickUorderUlist';

test('UquickUorderUlist renders', () => {
  render(<UquickUorderUlist />);
  expect(screen.getByText('UquickUorderUlist works!')).toBeInTheDocument();
});
