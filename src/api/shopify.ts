import Shopify from 'shopify-api-node';

if (
  !process.env.SHOPIFY_SHOP_NAME ||
  !process.env.SHOPIFY_API_KEY ||
  !process.env.SHOPIFY_API_PASSWORD
) {
  throw new Error('❌ Missing Shopify environment variables. Check your .env.local file.');
}

// Configuración de Shopify API
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME!,
  apiKey: process.env.SHOPIFY_API_KEY!,
  password: process.env.SHOPIFY_API_PASSWORD!,
  apiVersion: '2023-04',
});

export async function getProducts() {
  try {
    const products = await shopify.product.list();
    return products;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await shopify.product.get(Number(id));
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
