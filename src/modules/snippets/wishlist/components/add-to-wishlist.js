import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import { subscribePreferedVariantsId } from '@/js/store/products';
import {
  addWishlistItem,
  isOnWishlist,
  removeWishlistItem,
  subscribeWishlistItems,
} from '@/js/store/wishlist';

class AddToWishlist extends CustomHTMLElement {
  constructor() {
    super();

    this.template = document.querySelector('template#wishlist');
    const tempDivElement = document.createElement('div');
    tempDivElement.appendChild(this.template.content.cloneNode(true));

    const pictoLove = tempDivElement.querySelector('.icon--picto-love');
    const pictoLoveFilled = tempDivElement.querySelector('.icon--picto-love-filled');
    this.iconEmpty = (pictoLove && pictoLove.outerHTML) || '';
    this.iconFull = (pictoLoveFilled && pictoLoveFilled.outerHTML) || '';
  }

  getTranslation(text) {
    return this.template.getAttribute(`translation-${text}`);
  }

  connectedCallback() {
    this.setHeart(false);
    this.addEventListener('click', this.onClick);
    this._unsubscriveWishlistItem = subscribeWishlistItems(this.checkHeart.bind(this), true);
    this._unsubscribeSelectedVariant = subscribePreferedVariantsId(
      this.productHandle,
      this.onVariantChanged.bind(this),
    );
  }
  /* get productId() {
    let ancestor;
    return (
      this.getAttribute("product-id") ||
      this.dataset?.productId ||
      ((ancestor = this.closest("[data-product-id]"))
        ? ancestor.dataset?.productId
        : null)
    );
  }*/

  get productHandle() {
    let ancestor;
    return (
      this.getAttribute('handle') ||
      this.dataset?.productHandle ||
      ((ancestor = this.closest('[data-product-handle]')) ? ancestor.dataset?.productHandle : null)
    );
  }

  get variantId() {
    let ancestor;
    return (
      this._variantId ||
      this.getAttribute('variant-id') ||
      this.dataset?.varianttId ||
      ((ancestor = this.closest('[data-first-available-variant-id]'))
        ? ancestor.dataset?.firstAvailableVariantId
        : null)
    );
  }

  onVariantChanged(variantId) {
    this._variantId = variantId;
    this.checkHeart();
  }

  checkHeart() {
    this.setHeart(isOnWishlist(this.productHandle, this.variantId));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.onClick);
  }

  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.toggleHeart();
  }

  toggleHeart() {
    if (this.isOn) {
      removeWishlistItem(this.productHandle, this.variantId);
    } else {
      addWishlistItem(this.productHandle, this.variantId);
    }
  }

  setHeart(isOn) {
    this.isOn = isOn;
    if (isOn) {
      this.innerHTML = this.iconFull;
      this.title = this.getTranslation('remove');
      return;
    }
    this.innerHTML = this.iconEmpty;
    this.title = this.getTranslation('add');
  }
}

customElements.define('add-to-wishlist', AddToWishlist);
export default AddToWishlist;
