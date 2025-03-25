import { subscribeWishlistItems } from '@/js/store/wishlist';

class HeaderWishlist extends HTMLAnchorElement {
  constructor() {
    super();

    this.grabbedSpan = this.querySelector('span').outerHTML;
    this.template = document.querySelector('template#wishlist');
    const tempDivElement = document.createElement('div');
    tempDivElement.appendChild(this.template.content.cloneNode(true));

    const iconEmptyElement = tempDivElement.querySelector('.icon--picto-love');
    const iconFullElement = tempDivElement.querySelector('.icon--picto-love-filled');

    // set icon size
    if (this.iconWidth) {
      iconEmptyElement.setAttribute('width', this.iconWidth);
      iconFullElement.setAttribute('width', this.iconWidth);
    }
    if (this.iconHeight) {
      iconEmptyElement.setAttribute('height', this.iconWidth);
      iconFullElement.setAttribute('height', this.iconWidth);
    }

    this.iconEmpty = iconEmptyElement.outerHTML;
    this.iconFull = iconFullElement.outerHTML;
  }

  connectedCallback() {
    this._unsubscriveWishlistItem = subscribeWishlistItems(this.checkHeart.bind(this), true);
  }

  disconnectedCallback() {
    this._unsubscriveWishlistItem();
  }

  get iconWidth() {
    return this.getAttribute('icon-width');
  }

  get iconHeight() {
    return this.getAttribute('icon-height');
  }

  checkHeart(items) {
    this.setHeart(!!items.length);
  }

  setHeart(isOn) {
    this.isOn = isOn;
    if (isOn) {
      this.innerHTML = `${this.iconFull}${this.grabbedSpan}`;
      this.setAttribute('is-filled', true);
      return;
    }
    this.innerHTML = `${this.iconEmpty}${this.grabbedSpan}`;
    this.removeAttribute('is-filled');
  }
}

customElements.define('header-wishlist', HeaderWishlist, { extends: 'a' });
export default HeaderWishlist;
