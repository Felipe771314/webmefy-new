import { render, screen } from '@testing-library/react';
import { UimageUwithUtext } from '../UimageUwithUtext';

test('UimageUwithUtext renders', () => {
  render(<UimageUwithUtext />);
  expect(screen.getByText('UimageUwithUtext works!')).toBeInTheDocument();
});
