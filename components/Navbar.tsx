import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Navigation: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Shopify Store</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/cart">Cart</Nav.Link>
          <Nav.Link href="/checkout">Checkout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
