// js/custom-element/section/image-with-text/image-with-text.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import { imageLoaded } from '~/js/helper/image';
import { CustomAnimation, CustomKeyframeEffect } from '~/js/helper/animation';

const ImageWithText = class extends CustomHTMLElement {
  connectedCallback() {
    this.items = Array.from(this.querySelectorAll('image-with-text-item'));
    this.imageItems = Array.from(this.querySelectorAll('.image-with-text__image'));
    this.pageDots = this.querySelector('page-dots');
    this.hasPendingTransition = false;
    if (this.items.length > 1) {
      this.addEventListener('page-dots:changed', (event) => this.select(event.detail.index));
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:deselect', this.startPlayer.bind(this));
        this.addEventListener('shopify:block:select', (event) => {
          this.intersectionObserver.disconnect();
          this.pausePlayer();
          this.select(event.target.index, !event.detail.load);
        });
      }
    }
    this._setupVisibility();
  }
  async _setupVisibility() {
    await this.untilVisible();
    if (this.hasAttribute('reveal-on-scroll')) {
      await this.transitionImage(this.selectedIndex);
      this.select(this.selectedIndex);
    }
    this.startPlayer();
  }
  get selectedIndex() {
    return this.items.findIndex((item) => item.selected);
  }
  async select(index, shouldAnimate = true) {
    if (this.hasPendingTransition) {
      return;
    }
    this.hasPendingTransition = true;
    if (this.items[index].hasAttachedImage || !shouldAnimate) {
      await this.transitionImage(index, shouldAnimate);
    }
    if (this.selectedIndex !== index) {
      await this.items[this.selectedIndex].transitionToLeave(shouldAnimate);
    }
    if (this.pageDots) {
      this.pageDots.selectedIndex = index;
    }
    await this.items[index].transitionToEnter(shouldAnimate);
    this.hasPendingTransition = false;
  }
  async transitionImage(index, shouldAnimate = true) {
    const activeImage = this.imageItems.find((item) => !item.hasAttribute('hidden')),
      nextImage =
        this.imageItems.find(
          (item) => item.id === this.items[index].getAttribute('attached-image'),
        ) || activeImage;
    activeImage.setAttribute('hidden', '');
    nextImage.removeAttribute('hidden');
    await imageLoaded(nextImage);
    const animation = new CustomAnimation(
      new CustomKeyframeEffect(
        nextImage,
        {
          visibility: ['hidden', 'visible'],
          clipPath: ['inset(0 0 0 100%)', 'inset(0 0 0 0)'],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(1, 0, 0, 1)',
        },
      ),
    );
    shouldAnimate ? animation.play() : animation.finish();
  }
  pausePlayer() {
    this.style.setProperty('--section-animation-play-state', 'paused');
  }
  startPlayer() {
    this.style.setProperty('--section-animation-play-state', 'running');
  }
};
window.customElements.define('image-with-text', ImageWithText);

export default ImageWithText;
