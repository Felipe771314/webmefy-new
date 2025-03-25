// js/custom-element/section/testimonials/testimonial-list.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import VerticalScrollBlockerMixin from '@/js/mixin/vertical-scroll-blocker';

const TestimonialList = class extends CustomHTMLElement {
  connectedCallback() {
    this.items = Array.from(this.querySelectorAll('testimonial-item'));
    this.pageDots = this.querySelector('page-dots');
    this.hasPendingTransition = false;
    if (this.items.length > 1) {
      this.addEventListener('swiperight', this.previous.bind(this));
      this.addEventListener('swipeleft', this.next.bind(this));
      this.addEventListener('prev-next:prev', this.previous.bind(this));
      this.addEventListener('prev-next:next', this.next.bind(this));
      this.addEventListener('page-dots:changed', (event) => this.select(event.detail.index));
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:select', (event) => {
          var _a;
          (_a = this.intersectionObserver) == null ? void 0 : _a.disconnect();
          if (event.detail.load || !event.target.selected) {
            this.select(event.target.index, !event.detail.load);
          }
        });
      }
      this._blockVerticalScroll();
    }
    if (this.hasAttribute('reveal-on-scroll')) {
      this._setupVisibility();
    }
  }
  get selectedIndex() {
    return this.items.findIndex((item) => item.selected);
  }
  async _setupVisibility() {
    await this.untilVisible();
    this.items[this.selectedIndex].transitionToEnter();
  }
  previous() {
    this.select((this.selectedIndex - 1 + this.items.length) % this.items.length);
  }
  next() {
    this.select((this.selectedIndex + 1 + this.items.length) % this.items.length);
  }
  async select(index, shouldAnimate = true) {
    if (this.hasPendingTransition) {
      return;
    }
    this.hasPendingTransition = true;
    await this.items[this.selectedIndex].transitionToLeave(shouldAnimate);
    if (this.pageDots) {
      this.pageDots.selectedIndex = index;
    }
    await this.items[index].transitionToEnter(shouldAnimate);
    this.hasPendingTransition = false;
  }
};
Object.assign(TestimonialList.prototype, VerticalScrollBlockerMixin);
window.customElements.define('testimonial-list', TestimonialList);

export default TestimonialList;
