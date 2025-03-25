// js/custom-element/section/press/press-list.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import VerticalScrollBlockerMixin from '@/js/mixin/vertical-scroll-blocker';

const PressList = class extends CustomHTMLElement {
  connectedCallback() {
    this.pressItemsWrapper = this.querySelector('.press-list__wrapper');
    this.pressItems = Array.from(this.querySelectorAll('press-item'));
    this.pageDots = this.querySelector('page-dots');
    if (this.pressItems.length > 1) {
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:select', (event) => {
          var _a;
          (_a = this.intersectionObserver) == null ? void 0 : _a.disconnect();
          if (event.detail.load || !event.target.selected) {
            this.select(event.target.index, !event.detail.load);
          }
        });
      }
      this.pressItemsWrapper.addEventListener('swiperight', this.previous.bind(this));
      this.pressItemsWrapper.addEventListener('swipeleft', this.next.bind(this));
      this.addEventListener('page-dots:changed', (event) => this.select(event.detail.index));
      this._blockVerticalScroll();
    }
    if (this.hasAttribute('reveal-on-scroll')) {
      this._setupVisibility();
    }
  }
  async _setupVisibility() {
    await this.untilVisible();
    this.pressItems[this.selectedIndex].transitionToEnter();
  }
  get selectedIndex() {
    return this.pressItems.findIndex((item) => item.selected);
  }
  previous() {
    this.select((this.selectedIndex - 1 + this.pressItems.length) % this.pressItems.length);
  }
  next() {
    this.select((this.selectedIndex + 1 + this.pressItems.length) % this.pressItems.length);
  }
  async select(index, shouldAnimate = true) {
    const previousItem = this.pressItems[this.selectedIndex],
      newItem = this.pressItems[index];
    await previousItem.transitionToLeave(shouldAnimate);
    this.pageDots.selectedIndex = index;
    await newItem.transitionToEnter(shouldAnimate);
  }
};
Object.assign(PressList.prototype, VerticalScrollBlockerMixin);
window.customElements.define('press-list', PressList);

export default PressList;
