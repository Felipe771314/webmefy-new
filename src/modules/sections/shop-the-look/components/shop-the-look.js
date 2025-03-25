// js/custom-element/section/shop-the-look/shop-the-look.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import { imageLoaded } from '~/js/helper/image';

const ShopTheLook = class extends CustomHTMLElement {
  connectedCallback() {
    this.lookItems = Array.from(this.querySelectorAll('shop-the-look-item'));
    this.nav = this.querySelector('shop-the-look-nav');
    this.hasPendingTransition = false;
    if (this.hasAttribute('reveal-on-scroll')) {
      this._setupVisibility();
    }
    if (this.lookItems.length > 1 && Shopify.designMode) {
      this.addEventListener('shopify:block:select', async (event) => {
        this.intersectionObserver.disconnect();
        await this.select(event.target.index, !event.detail.load);
        this.nav.animate(
          {
            opacity: [0, 1],
            transform: ['translateY(30px)', 'translateY(0)'],
          },
          { duration: 0, fill: 'forwards', easing: 'ease-in-out' },
        );
      });
    }
  }
  get selectedIndex() {
    return this.lookItems.findIndex((item) => item.selected);
  }
  async _setupVisibility() {
    await this.untilVisible();
    const images = Array.from(
      this.lookItems[this.selectedIndex].querySelectorAll('.shop-the-look__image'),
    );
    for (let image of images) {
      if (image.offsetParent !== null) {
        await imageLoaded(image);
      }
    }
    await this.lookItems[this.selectedIndex].transitionToEnter();
    if (this.nav) {
      this.nav.animate(
        { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
        { duration: 150, fill: 'forwards', easing: 'ease-in-out' },
      );
    }
  }
  previous() {
    this.select((this.selectedIndex - 1 + this.lookItems.length) % this.lookItems.length);
  }
  next() {
    this.select((this.selectedIndex + 1 + this.lookItems.length) % this.lookItems.length);
  }
  async select(index, animate = true) {
    const currentLook = this.lookItems[this.selectedIndex],
      nextLook = this.lookItems[index];
    if (this.hasPendingTransition) {
      return;
    }
    this.hasPendingTransition = true;
    if (currentLook !== nextLook) {
      this.nav.transitionToIndex(this.selectedIndex, index, animate);
      currentLook.transitionToLeave();
    }
    nextLook.transitionToEnter(animate);
    this.hasPendingTransition = false;
  }
};
window.customElements.define('shop-the-look', ShopTheLook);

export default ShopTheLook;
