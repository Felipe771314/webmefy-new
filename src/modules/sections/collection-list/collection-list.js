// js/custom-element/section/collection-list/collection-list.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import MediaFeatures from '@/js/helper/media-features';
import {
  CustomAnimation,
  CustomKeyframeEffect,
  ParallelEffect,
  SequenceEffect,
} from '@/js/helper/animation';

const CollectionList = class extends CustomHTMLElement {
  async connectedCallback() {
    this.items = Array.from(this.querySelectorAll('.list-collections__item'));
    if (this.hasAttribute('scrollable')) {
      this.scroller = this.querySelector('.list-collections__scroller');
      this.addEventListener('prev-next:prev', this.previous.bind(this));
      this.addEventListener('prev-next:next', this.next.bind(this));
      this.addEventListener('shopify:block:select', (event) =>
        event.target.scrollIntoView({
          block: 'nearest',
          inline: 'center',
          behavior: event.detail.load ? 'auto' : 'smooth',
        }),
      );
    }
    if (this.hasAttribute('reveal-on-scroll')) {
      this._setupVisibility();
    }
  }
  async _setupVisibility() {
    await this.untilVisible();
    const prefersReducedMotion = MediaFeatures.prefersReducedMotion();
    const animation = new CustomAnimation(
      new ParallelEffect(
        this.items.map((item, index) => {
          return new SequenceEffect([
            new CustomKeyframeEffect(
              item.querySelector('.list-collections__item-image'),
              {
                opacity: [0, 1],
                transform: [`scale(${prefersReducedMotion ? 1 : 1.1})`, 'scale(1)'],
              },
              {
                duration: 250,
                delay: prefersReducedMotion ? 0 : 150 * index,
                easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
              },
            ),
            new ParallelEffect(
              Array.from(item.querySelectorAll('.list-collections__item-info [reveal]')).map(
                (textItem, subIndex) => {
                  return new CustomKeyframeEffect(
                    textItem,
                    {
                      opacity: [0, 1],
                      clipPath: [
                        `inset(${prefersReducedMotion ? '0 0 0 0' : '0 0 100% 0'})`,
                        'inset(0 0 0 0)',
                      ],
                      transform: [
                        `translateY(${prefersReducedMotion ? 0 : '100%'})`,
                        'translateY(0)',
                      ],
                    },
                    {
                      duration: 200,
                      delay: prefersReducedMotion ? 0 : 150 * index + 150 * subIndex,
                      easing: 'cubic-bezier(0.5, 0.06, 0.01, 0.99)',
                    },
                  );
                },
              ),
            ),
          ]);
        }),
      ),
    );
    this._hasSectionReloaded ? animation.finish() : animation.play();
  }
  previous() {
    const directionFlip = window.themeVariables.settings.direction === 'ltr' ? 1 : -1;
    this.scroller.scrollBy({
      left: -this.items[0].clientWidth * directionFlip,
      behavior: 'smooth',
    });
  }
  next() {
    const directionFlip = window.themeVariables.settings.direction === 'ltr' ? 1 : -1;
    this.scroller.scrollBy({
      left: this.items[0].clientWidth * directionFlip,
      behavior: 'smooth',
    });
  }
};
window.customElements.define('collection-list', CollectionList);

export default CollectionList;
