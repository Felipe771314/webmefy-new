import { render, screen } from '@testing-library/react';
import { UpredictiveUsearch } from '../UpredictiveUsearch';

test('UpredictiveUsearch renders', () => {
  render(<UpredictiveUsearch />);
  expect(screen.getByText('UpredictiveUsearch works!')).toBeInTheDocument();
});
