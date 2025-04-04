import { render, screen, fireEvent } from '@testing-library/react';
import Caroussel from '../Caroussel';

describe('Caroussel component - extended coverage', () => {
  const items = ['Slide 1', 'Slide 2', 'Slide 3'];

  test('goes to next and previous slides when arrows clicked', () => {
    render(<Caroussel title="Nav Test" items={items} loop={true} />);
    expect(screen.getByText('Slide 1')).toHaveClass('active');

    fireEvent.click(screen.getByText('>'));
    expect(screen.getByText('Slide 2')).toHaveClass('active');

    fireEvent.click(screen.getByText('<'));
    expect(screen.getByText('Slide 1')).toHaveClass('active');
  });

  test('loops to first slide after last when loop is enabled', () => {
    render(<Caroussel title="Loop Test" items={items} loop={true} />);
    fireEvent.click(screen.getByText('>'));
    fireEvent.click(screen.getByText('>'));
    fireEvent.click(screen.getByText('>'));
    expect(screen.getByText('Slide 1')).toHaveClass('active');
  });

  test('does not go forward on last slide if loop is false', () => {
    render(<Caroussel title="No Loop" items={items} loop={false} />);
    fireEvent.click(screen.getByText('>'));
    fireEvent.click(screen.getByText('>'));
    fireEvent.click(screen.getByText('>'));
    expect(screen.getByText('Slide 3')).toHaveClass('active');
  });

  test('shows message when items array is empty', () => {
    render(<Caroussel title="Empty Test" items={[]} />);
    expect(screen.getByText('No items to display')).toBeInTheDocument();
  });

  test.each([['inside'], ['outside'], ['bottom']])(
    'applies correct testId for arrowsPosition="%s"',
    (position) => {
      render(
        <Caroussel
          title={`Arrows ${position}`}
          items={items}
          arrowsPosition={position as 'inside' | 'outside' | 'bottom'}
        />,
      );
      expect(screen.getByTestId(`arrows-${position}`)).toBeInTheDocument();
    },
  );
});
