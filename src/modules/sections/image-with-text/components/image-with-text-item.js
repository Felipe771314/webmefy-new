// js/custom-element/section/image-with-text/image-with-text-item.js
import { resolveAsyncIterator } from '~/js/helper/dom';
import {
  CustomAnimation,
  CustomKeyframeEffect,
  ParallelEffect,
  SequenceEffect,
} from '~/js/helper/animation';

const ImageWithTextItem = class extends HTMLElement {
  get index() {
    return [...this.parentNode.children].indexOf(this);
  }
  get selected() {
    return !this.hasAttribute('hidden');
  }
  get hasAttachedImage() {
    return this.hasAttribute('attached-image');
  }
  async transitionToEnter(shouldAnimate = true) {
    this.removeAttribute('hidden');
    const textWrapper = this.querySelector('.image-with-text__text-wrapper'),
      headings = await resolveAsyncIterator(
        this.querySelectorAll('.image-with-text__content split-lines'),
      );
    const animation = new CustomAnimation(
      new SequenceEffect([
        new ParallelEffect(
          headings.map((item, index) => {
            return new CustomKeyframeEffect(
              item,
              {
                opacity: [0, 0.2, 1],
                transform: ['translateY(100%)', 'translateY(0)'],
                clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
              },
              {
                duration: 350,
                delay: 120 * index,
                easing: 'cubic-bezier(0.5, 0.06, 0.01, 0.99)',
              },
            );
          }),
        ),
        new CustomKeyframeEffect(textWrapper, { opacity: [0, 1] }, { duration: 300 }),
      ]),
    );
    shouldAnimate ? animation.play() : animation.finish();
    return animation.finished;
  }
  async transitionToLeave(shouldAnimate = true) {
    const elements = await resolveAsyncIterator(
      this.querySelectorAll(
        '.image-with-text__text-wrapper, .image-with-text__content split-lines',
      ),
    );
    const animation = new CustomAnimation(
      new ParallelEffect(
        elements.map((item) => {
          return new CustomKeyframeEffect(item, { opacity: [1, 0] }, { duration: 200 });
        }),
      ),
    );
    shouldAnimate ? animation.play() : animation.finish();
    await animation.finished;
    this.setAttribute('hidden', '');
  }
};
window.customElements.define('image-with-text-item', ImageWithTextItem);

export default ImageWithTextItem;
