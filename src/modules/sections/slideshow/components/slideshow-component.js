// js/custom-element/section/slideshow/slideshow.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import MediaFeatures from '~/js/helper/media-features';
import VerticalScrollBlockerMixin from '~/js/mixin/vertical-scroll-blocker';

const Slideshow = class extends CustomHTMLElement {
  connectedCallback() {
    this.items = Array.from(this.querySelectorAll('slide-show-item'));
    this.pageDots = this.querySelector('page-dots');
    this.isTransitioning = false;
    if (this.items.length > 1) {
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:deselect', this.startPlayer.bind(this));
        this.addEventListener('shopify:block:select', (event) => {
          this.pausePlayer();
          this.intersectionObserver.disconnect();
          if (!(!event.detail.load && event.target.selected)) {
            this.select(event.target.index, !event.detail.load);
          }
        });
      }
      this.bindedPrevious = this.previous.bind(this);
      this.bindedNext = this.next.bind(this);
      this.bindedSelect = (event) => this.select(event.detail.index);

      this.addEventListener('prev-next:prev', this.bindedPrevious);
      this.addEventListener('prev-next:next', this.bindedNext);
      this.addEventListener('swiperight', this.bindedPrevious);
      this.addEventListener('swipeleft', this.bindedNext);
      this.addEventListener('page-dots:changed', this.bindedSelect);
      this._blockVerticalScroll();
    }
    this._setupVisibility();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('prev-next:prev', this.bindedPrevious);
    this.removeEventListener('prev-next:next', this.bindedNext);
    this.removeEventListener('swiperight', this.bindedPrevious);
    this.removeEventListener('swipeleft', this.bindedNext);
    this.removeEventListener('page-dots:changed', this.bindedSelect);
  }

  get selectedIndex() {
    return this.items.findIndex((item) => item.selected);
  }
  get transitionType() {
    return MediaFeatures.prefersReducedMotion() ? 'fade' : this.getAttribute('transition-type');
  }
  async _setupVisibility() {
    await this.untilVisible();
    await this.items[this.selectedIndex]
      .transitionToEnter(this.transitionType)
      .catch((error) => {});
    this.startPlayer();
  }
  previous() {
    this.select((this.selectedIndex - 1 + this.items.length) % this.items.length, true, true);
  }
  next() {
    this.select((this.selectedIndex + 1 + this.items.length) % this.items.length, true, false);
  }
  async select(index, shouldTransition = true, reverseDirection = false) {
    if (this.transitionType === 'reveal' && this.isTransitioning) {
      return;
    }
    this.isTransitioning = true;
    const previousItem = this.items[this.selectedIndex],
      newItem = this.items[index];
    this.items[(newItem.index + 1) % this.items.length]._preloadImages();
    if (previousItem && previousItem !== newItem) {
      if (this.transitionType !== 'reveal') {
        previousItem.transitionToLeave(this.transitionType, shouldTransition);
      } else {
        await previousItem.transitionToLeave(this.transitionType, shouldTransition);
      }
    }
    if (this.pageDots) {
      this.pageDots.selectedIndex = newItem.index;
    }
    await newItem
      .transitionToEnter(this.transitionType, shouldTransition, reverseDirection)
      .catch((error) => {});
    this.isTransitioning = false;
  }
  pausePlayer() {
    this.style.setProperty('--section-animation-play-state', 'paused');
  }
  startPlayer() {
    if (this.hasAttribute('auto-play')) {
      this.style.setProperty('--section-animation-play-state', 'running');
    }
  }
};
Object.assign(Slideshow.prototype, VerticalScrollBlockerMixin);
window.customElements.define('slide-show', Slideshow);

export default Slideshow;
