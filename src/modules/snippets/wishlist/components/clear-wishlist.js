import { resetWishlistItems, subscribeWishlistItems } from '@/js/store/wishlist';

class ClearWishlist extends HTMLButtonElement {
  connectedCallback() {
    this.addEventListener('click', this.clearList);
    this._unsubscribeWishlistItems = subscribeWishlistItems(this.handleVisibility.bind(this), true);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.clearList);
    this._unsubscribeWishlistItems();
  }

  clearList(event) {
    resetWishlistItems();
  }

  handleVisibility(items) {
    this.style.visibility = items.length ? 'visible' : 'hidden';
  }
}

customElements.define('clear-wishlist', ClearWishlist, { extends: 'button' });
export default ClearWishlist;
