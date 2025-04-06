import { render, screen } from '@testing-library/react';
import { UcollapsibleUcontent } from '../UcollapsibleUcontent';

test('UcollapsibleUcontent renders', () => {
  render(<UcollapsibleUcontent />);
  expect(screen.getByText('UcollapsibleUcontent works!')).toBeInTheDocument();
});
