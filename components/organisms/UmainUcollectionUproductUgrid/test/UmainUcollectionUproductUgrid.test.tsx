import { render, screen } from '@testing-library/react';
import { UmainUcollectionUproductUgrid } from '../UmainUcollectionUproductUgrid';

test('UmainUcollectionUproductUgrid renders', () => {
  render(<UmainUcollectionUproductUgrid />);
  expect(screen.getByText('UmainUcollectionUproductUgrid works!')).toBeInTheDocument();
});
