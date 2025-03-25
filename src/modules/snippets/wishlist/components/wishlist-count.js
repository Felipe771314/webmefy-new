import customHtmlElement from '../../../../js/custom-element/common/custom-html-element';

import { subscribeWishlistItemsCount } from '@/js/store/wishlist';

class WishlistCount extends customHtmlElement {
  connectedCallback() {
    try {
      this.countWording = JSON.parse(
        (this.getAttribute('count-messages') || '{}').replaceAll('=>', ':'),
      );
    } catch (e) {
      this.countWording = {};
    }
    this._unscrubscribeWishlistItems = subscribeWishlistItemsCount(
      this._handleWishlistItemsChange.bind(this),
      true,
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._unscrubscribeWishlistItems();
  }

  _handleWishlistItemsChange(wishlistItemsCount) {
    this.render(wishlistItemsCount);
  }
  render(count) {
    if (!count) {
      this.classList.add('hidden');
      return;
    }
    this.classList.remove('hidden');
    let newValue = '';
    if (count === 1) {
      newValue = this.countWording.one.replace(/\{\{\s*?count\s*?\}\}/, `${count}`);
    } else {
      newValue = this.countWording.other.replace(/\{\{\s*?count\s*?\}\}/, `${count}`);
    }
    this.innerHTML = newValue;
  }
}

customElements.define('wishlist-count', WishlistCount);
export default WishlistCount;
