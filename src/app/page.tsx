import React, { useEffect, useState } from 'react';
import { getProducts } from '../../utils/shopify';
import ProductCard from '../../components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Shopify Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <ProductCard
              id={product.id}
              title={product.title}
              image={product.image?.src}
              price={product.variants?.[0]?.price || '0.00'}
              vendor={product.vendor}
              onAddToCart={() => console.log(`Added ${product.title} to cart`)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
