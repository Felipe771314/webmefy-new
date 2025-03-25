// js/custom-element/section/multi-column/multi-column.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import MediaFeatures from '@/js/helper/media-features';
import { CustomAnimation, CustomKeyframeEffect, ParallelEffect } from '@/js/helper/animation';
import './multi-column.scss';

const MultiColumn = class extends CustomHTMLElement {
  connectedCallback() {
    if (!this.hasAttribute('stack')) {
      this.multiColumnInner = this.querySelector('.multi-column__inner');
      this.addEventListener('prev-next:prev', this.previous.bind(this));
      this.addEventListener('prev-next:next', this.next.bind(this));
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:select', (event) => {
          event.target.scrollIntoView({
            inline: 'center',
            block: 'nearest',
            behavior: event.detail.load ? 'auto' : 'smooth',
          });
        });
      }
    }
    if (this.hasAttribute('stagger-apparition')) {
      this._setupVisibility();
    }
  }
  async _setupVisibility() {
    await this.untilVisible({
      threshold: Math.min(50 / this.clientHeight, 1),
    });
    const prefersReducedMotion = MediaFeatures.prefersReducedMotion();
    const animation = new CustomAnimation(
      new ParallelEffect(
        Array.from(this.querySelectorAll('.multi-column__item')).map((item, index) => {
          return new CustomKeyframeEffect(
            item,
            {
              opacity: [0, 1],
              transform: [
                `translateY(${
                  MediaFeatures.prefersReducedMotion() ? 0 : window.innerWidth < 1e3 ? 35 : 60
                }px)`,
                'translateY(0)',
              ],
            },
            {
              duration: 600,
              delay: prefersReducedMotion ? 0 : 100 * index,
              easing: 'ease',
            },
          );
        }),
      ),
    );
    this._hasSectionReloaded ? animation.finish() : animation.play();
  }
  previous(event) {
    const directionFlip = window.themeVariables.settings.direction === 'ltr' ? 1 : -1,
      columnGap = parseInt(getComputedStyle(this).getPropertyValue('--multi-column-column-gap'));
    event.target.nextElementSibling.removeAttribute('disabled');
    event.target.toggleAttribute(
      'disabled',
      this.multiColumnInner.scrollLeft * directionFlip -
        (this.multiColumnInner.clientWidth + columnGap) <=
        0,
    );
    this.multiColumnInner.scrollBy({
      left: -(this.multiColumnInner.clientWidth + columnGap) * directionFlip,
      behavior: 'smooth',
    });
  }
  next(event) {
    const directionFlip = window.themeVariables.settings.direction === 'ltr' ? 1 : -1,
      columnGap = parseInt(getComputedStyle(this).getPropertyValue('--multi-column-column-gap'));
    event.target.previousElementSibling.removeAttribute('disabled');
    event.target.toggleAttribute(
      'disabled',
      this.multiColumnInner.scrollLeft * directionFlip +
        (this.multiColumnInner.clientWidth + columnGap) * 2 >=
        this.multiColumnInner.scrollWidth,
    );
    this.multiColumnInner.scrollBy({
      left: (this.multiColumnInner.clientWidth + columnGap) * directionFlip,
      behavior: 'smooth',
    });
  }
};
window.customElements.define('multi-column', MultiColumn);

export default MultiColumn;
