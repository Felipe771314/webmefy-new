import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  test('renders Card component with title and content', () => {
    render(
      <Card 
        title="Card Title" 
        content="This is the card content." 
        initiallyExpanded={true} 
      />
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('This is the card content.')).toBeInTheDocument();
  });

  // Si en el componente ya no se implementa el toggling, eliminamos este test:
  // test('toggles content visibility on click when initiallyExpanded is false', () => {
  //   render(
  //     <Card 
  //       title="Card Title" 
  //       content="This is the card content." 
  //       initiallyExpanded={false} 
  //     />
  //   );
  //   // Como el contenido se renderiza estáticamente, se espera que esté siempre visible.
  //   expect(screen.getByText('This is the card content.')).toBeInTheDocument();
  // });

  test('renders image when imageUrl is provided', () => {
    render(
      <Card 
        title="Card Title" 
        content="This is the card content." 
        imageUrl="image.jpg"
        initiallyExpanded={true}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'image.jpg');
    expect(img).toHaveAttribute('alt', 'Card Title');
  });

  test('renders actions when provided', () => {
    render(
      <Card 
        title="Card Title" 
        content="This is the card content." 
        initiallyExpanded={true}
        primaryButtonLabel="Primary Action"
        secondaryButtonLabel="Secondary Action"
      />
    );
    // Se esperan ambos botones con sus textos correspondientes.
    expect(screen.getByText('Primary Action')).toBeInTheDocument();
    expect(screen.getByText('Secondary Action')).toBeInTheDocument();
  });

  test('calls onCardClick when card is clicked', () => {
    const handleClick = jest.fn();
    render(
      <Card 
        title="Card Title" 
        content="This is the card content." 
        initiallyExpanded={true}
        onCardClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Card Title'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
