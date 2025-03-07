---
to: components/<%= name %>/<%= name %>.test.tsx
---
import { render, screen } from '@testing-library/react';
import <%= name %> from './<%= name %>';

test('renders component', () => {
  render(<<%= name %> title="Test Component" />);
  expect(screen.getByText('Test Component')).toBeInTheDocument();
});
