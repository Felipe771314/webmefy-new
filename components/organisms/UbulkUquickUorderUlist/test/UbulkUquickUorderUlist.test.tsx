import { render, screen } from '@testing-library/react';
import { UbulkUquickUorderUlist } from '../UbulkUquickUorderUlist';

test('UbulkUquickUorderUlist renders', () => {
  render(<UbulkUquickUorderUlist />);
  expect(screen.getByText('UbulkUquickUorderUlist works!')).toBeInTheDocument();
});
