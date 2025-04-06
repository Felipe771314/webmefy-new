import { render, screen } from '@testing-library/react';
import { UannouncementUbar } from '../UannouncementUbar';

test('UannouncementUbar renders', () => {
  render(<UannouncementUbar />);
  expect(screen.getByText('UannouncementUbar works!')).toBeInTheDocument();
});
