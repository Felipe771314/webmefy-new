// js/custom-element/section/shop-the-look/shop-the-look-item.js
import {
  CustomAnimation,
  CustomKeyframeEffect,
  ParallelEffect,
  SequenceEffect,
} from '~/js/helper/animation';

const ShopTheLookItem = class extends HTMLElement {
  get index() {
    return [...this.parentNode.children].indexOf(this);
  }
  get selected() {
    return !this.hasAttribute('hidden');
  }
  async transitionToLeave(shouldAnimate = true) {
    this.setAttribute('hidden', '');
    const animation = new CustomAnimation(
      new CustomKeyframeEffect(this, { visibility: ['visible', 'hidden'] }, { duration: 500 }),
    );
    shouldAnimate ? animation.play() : animation.finish();
    return animation.finished;
  }
  async transitionToEnter(shouldAnimate = true) {
    this.removeAttribute('hidden');
    const dots = Array.from(this.querySelectorAll('.shop-the-look__dot'));
    dots.forEach((dot) => (dot.style.opacity = 0));
    const animation = new CustomAnimation(
      new SequenceEffect([
        new ParallelEffect(
          Array.from(this.querySelectorAll('.shop-the-look__image')).map((item) => {
            return new CustomKeyframeEffect(item, { opacity: [1, 1] }, { duration: 0 });
          }),
        ),
        new CustomKeyframeEffect(
          this,
          {
            visibility: ['hidden', 'visible'],
            zIndex: [0, 1],
            clipPath: ['inset(0 0 0 100%)', 'inset(0 0 0 0)'],
          },
          { duration: 500, easing: 'cubic-bezier(1, 0, 0, 1)' },
        ),
        new ParallelEffect(
          dots.map((item, index) => {
            return new CustomKeyframeEffect(
              item,
              { opacity: [0, 1], transform: ['scale(0)', 'scale(1)'] },
              { duration: 120, delay: 75 * index, easing: 'ease-in-out' },
            );
          }),
        ),
      ]),
    );
    shouldAnimate ? animation.play() : animation.finish();
    await animation.finished;
    if (window.matchMedia(window.themeVariables.breakpoints.tabletAndUp).matches) {
      const firstPopover = this.querySelector(
        '.shop-the-look__product-wrapper .shop-the-look__dot',
      );
      firstPopover == null ? void 0 : firstPopover.setAttribute('aria-expanded', 'true');
    }
  }
};
window.customElements.define('shop-the-look-item', ShopTheLookItem);

export default ShopTheLookItem;
