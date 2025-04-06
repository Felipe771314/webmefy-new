import { render, screen } from '@testing-library/react';
import { UmainUarticle } from '../UmainUarticle';

test('UmainUarticle renders', () => {
  render(<UmainUarticle />);
  expect(screen.getByText('UmainUarticle works!')).toBeInTheDocument();
});
