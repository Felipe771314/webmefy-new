import { subscribeCartContent } from '@/js/store/cart';

class NostoCartUpdater extends HTMLElement {
  constructor() {
    super();
    this.price_currency_code = this.getAttribute('price-currency-code');
    this.shop_secure_url = this.getAttribute('shop-secure-url');
  }

  connectedCallback() {
    this.unsubscribeCartContent = subscribeCartContent(this.updateCart.bind(this), true);
  }

  disconnectedCallback() {
    this.unsubscribeCartContent();
  }

  updateCart(cart) {
    if (!window.nostojs) return;

    nostojs((api) => {
      const cartItems = cart.items.map((item) => this.lineItemToHtml(item)).join('\r');

      const restoreUrl = cart.items.map((item) => `${item.variant_id}:${item.quantity}`).join(',');

      this.innerHTML = `
      ${cartItems} 
      ${
        cart.items.length
          ? `<span class="restore_link">${this.shop_secure_url}/cart/${restoreUrl}</span>`
          : ``
      }`;

      api.resendCartTagging();
    });
  }

  lineItemToHtml(item) {
    return `
    <div class="line_item">
      <span class="product_id">${item.product_id}</span>
      <span class="sku_id">${item.variant_id}</span>
      <span class="quantity">${item.quantity}</span>
      <span class="name">${item.title}</span>
      <span class="unit_price">${(parseInt(item.price) / 100).toFixed(2).replace(/\./, ',')}</span>
      <span class="price_currency_code">${this.price_currency_code}</span>
    </div>
  `;
  }
}

customElements.define('nosto-cart-updater', NostoCartUpdater);
export default NostoCartUpdater;
