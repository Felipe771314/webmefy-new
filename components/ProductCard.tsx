import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface ProductProps {
  id: string;
  title: string;
  image: string;
  price: string;
  vendor: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ id, title, image, price, vendor, onAddToCart }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image || '/placeholder.jpg'} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Vendor: {vendor}</Card.Text>
        <Card.Text>Price: €{price}</Card.Text>
        <Button variant="primary" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
