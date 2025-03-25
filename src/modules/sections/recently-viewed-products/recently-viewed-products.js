// js/custom-element/section/product-recommendations/recently-viewed-products.js
const RecentlyViewedProducts = class extends HTMLElement {
  async connectedCallback() {
    if (this.searchQueryString === '') {
      return;
    }
    const response = await fetch(
      `${window.themeVariables.routes.searchUrl}?type=product&q=${this.searchQueryString}&section_id=${this.sectionId}`,
    );
    const div = document.createElement('div');
    div.innerHTML = await response.text();
    const recentlyViewedProductsElement = div.querySelector('recently-viewed-products');
    if (recentlyViewedProductsElement.hasChildNodes()) {
      this.innerHTML = recentlyViewedProductsElement.innerHTML;
    }
  }
  get searchQueryString() {
    const items = JSON.parse(localStorage.getItem('theme:recently-viewed-products') || '[]');
    if (
      this.hasAttribute('exclude-product-id') &&
      items.includes(parseInt(this.getAttribute('exclude-product-id')))
    ) {
      items.splice(items.indexOf(parseInt(this.getAttribute('exclude-product-id'))), 1);
    }
    return items
      .map((item) => 'id:' + item)
      .slice(0, this.productsCount)
      .join(' OR ');
  }
  get sectionId() {
    return this.getAttribute('section-id');
  }
  get productsCount() {
    return this.getAttribute('products-count') || 4;
  }
};
window.customElements.define('recently-viewed-products', RecentlyViewedProducts);

export default RecentlyViewedProducts;
