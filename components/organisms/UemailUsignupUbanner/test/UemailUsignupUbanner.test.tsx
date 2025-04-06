import { render, screen } from '@testing-library/react';
import { UemailUsignupUbanner } from '../UemailUsignupUbanner';

test('UemailUsignupUbanner renders', () => {
  render(<UemailUsignupUbanner />);
  expect(screen.getByText('UemailUsignupUbanner works!')).toBeInTheDocument();
});
