import { render, screen } from '@testing-library/react';
import Caroussel from '../Caroussel';

describe('Caroussel component', () => {
  const baseItems = ['Slide 1', 'Slide 2', 'Slide 3'];

  test('renders with title', () => {
    render(<Caroussel title="Test Carousel" items={baseItems} />);
    expect(screen.getByText('Test Carousel')).toBeInTheDocument();
  });

  test('renders all items', () => {
    render(<Caroussel title="With Items" items={baseItems} />);
    baseItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('renders arrows by default', () => {
    render(<Caroussel title="With Arrows" items={baseItems} />);
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  test('does not render arrows when showArrows is false', () => {
    render(<Caroussel title="No Arrows" items={baseItems} showArrows={false} />);
    expect(screen.queryByText('<')).not.toBeInTheDocument();
    expect(screen.queryByText('>')).not.toBeInTheDocument();
  });

  test('renders with transition type fade', () => {
    render(<Caroussel title="Fade Mode" items={baseItems} transitionType="fade" />);
    const track = screen.getByTestId('carousel-track');
    expect(track).toHaveAttribute('data-transition', 'fade');
  });

  test('applies itemStyle and containerStyle', () => {
    const itemStyle = { backgroundColor: 'pink' };
    const containerStyle = { padding: '1rem' };
    render(
      <Caroussel
        title="Styled"
        items={['Styled Item']}
        itemStyle={itemStyle}
        containerStyle={containerStyle}
      />,
    );
    const item = screen.getByText('Styled Item');
    expect(item).toHaveStyle('background-color: pink');
    const container = screen.getByText('Styled').parentElement;
    expect(container).toHaveStyle('padding: 1rem');
  });
});
