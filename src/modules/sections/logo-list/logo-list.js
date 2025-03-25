// js/custom-element/section/logo-list/logo-list.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import { CustomAnimation, CustomKeyframeEffect, ParallelEffect } from '@/js/helper/animation';
import MediaFeatures from '@/js/helper/media-features';
import './logo-list.scss';

const LogoList = class extends CustomHTMLElement {
  async connectedCallback() {
    this.items = Array.from(this.querySelectorAll('.logo-list__item'));
    this.logoListScrollable = this.querySelector('.logo-list__list');
    if (this.items.length > 1) {
      this.addEventListener('prev-next:prev', this.previous.bind(this));
      this.addEventListener('prev-next:next', this.next.bind(this));
    }
    if (this.hasAttribute('reveal-on-scroll')) {
      this._setupVisibility();
    }
  }
  async _setupVisibility() {
    await this.untilVisible({ rootMargin: '50px 0px', threshold: 0 });
    const animation = new CustomAnimation(
      new ParallelEffect(
        this.items.map((item, index) => {
          return new CustomKeyframeEffect(
            item,
            {
              opacity: [0, 1],
              transform: [
                `translateY(${MediaFeatures.prefersReducedMotion() ? 0 : '30px'})`,
                'translateY(0)',
              ],
            },
            {
              duration: 300,
              delay: MediaFeatures.prefersReducedMotion() ? 0 : 100 * index,
              easing: 'ease',
            },
          );
        }),
      ),
    );
    this._hasSectionReloaded ? animation.finish() : animation.play();
  }
  previous(event) {
    const directionFlip = window.themeVariables.settings.direction === 'ltr' ? 1 : -1;
    event.target.nextElementSibling.removeAttribute('disabled');
    event.target.toggleAttribute(
      'disabled',
      this.logoListScrollable.scrollLeft * directionFlip -
        (this.logoListScrollable.clientWidth + 24) <=
        0,
    );
    this.logoListScrollable.scrollBy({
      left: -(this.logoListScrollable.clientWidth + 24) * directionFlip,
      behavior: 'smooth',
    });
  }
  next(event) {
    const directionFlip = window.themeVariables.settings.direction === 'ltr' ? 1 : -1;
    event.target.previousElementSibling.removeAttribute('disabled');
    event.target.toggleAttribute(
      'disabled',
      this.logoListScrollable.scrollLeft * directionFlip +
        (this.logoListScrollable.clientWidth + 24) * 2 >=
        this.logoListScrollable.scrollWidth,
    );
    this.logoListScrollable.scrollBy({
      left: (this.logoListScrollable.clientWidth + 24) * directionFlip,
      behavior: 'smooth',
    });
  }
};
window.customElements.define('logo-list', LogoList);

export default LogoList;
