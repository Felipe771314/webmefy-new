// js/custom-element/section/shop-the-look/shop-the-look-nav.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';

const ShopTheLookNav = class extends CustomHTMLElement {
  connectedCallback() {
    this.shopTheLook = this.closest('shop-the-look');
    this.inTransition = false;
    this.pendingTransition = false;
    this.pendingTransitionTo = null;
    this.delegate.on('click', '[data-action="prev"]', () => this.shopTheLook.previous());
    this.delegate.on('click', '[data-action="next"]', () => this.shopTheLook.next());
  }
  transitionToIndex(selectedIndex, nextIndex, shouldAnimate = true) {
    const indexElements = Array.from(
        this.querySelectorAll('.shop-the-look__counter-page-transition'),
      ),
      currentElement = indexElements[selectedIndex],
      nextElement = indexElements[nextIndex];
    if (this.inTransition) {
      this.pendingTransition = true;
      this.pendingTransitionTo = nextIndex;
      return;
    }
    this.inTransition = true;
    currentElement.animate(
      { transform: ['translateY(0)', 'translateY(-100%)'] },
      {
        duration: shouldAnimate ? 1e3 : 0,
        easing: 'cubic-bezier(1, 0, 0, 1)',
      },
    ).onfinish = () => {
      currentElement.setAttribute('hidden', '');
      this.inTransition = false;
      if (this.pendingTransition && this.pendingTransitionTo !== nextIndex) {
        this.pendingTransition = false;
        this.transitionToIndex(nextIndex, this.pendingTransitionTo, shouldAnimate);
        this.pendingTransitionTo = null;
      }
    };
    nextElement.removeAttribute('hidden');
    nextElement.animate(
      { transform: ['translateY(100%)', 'translateY(0)'] },
      {
        duration: shouldAnimate ? 1e3 : 0,
        easing: 'cubic-bezier(1, 0, 0, 1)',
      },
    );
  }
};
window.customElements.define('shop-the-look-nav', ShopTheLookNav);

export default ShopTheLookNav;
