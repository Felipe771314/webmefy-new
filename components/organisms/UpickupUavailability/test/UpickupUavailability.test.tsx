import { render, screen } from '@testing-library/react';
import { UpickupUavailability } from '../UpickupUavailability';

test('UpickupUavailability renders', () => {
  render(<UpickupUavailability />);
  expect(screen.getByText('UpickupUavailability works!')).toBeInTheDocument();
});
