// js/custom-element/section/press/press-item.js
import { resolveAsyncIterator } from '@/js/helper/dom';
import { CustomAnimation, CustomKeyframeEffect, ParallelEffect } from '@/js/helper/animation';

const PressItem = class extends HTMLElement {
  connectedCallback() {
    this.addEventListener('split-lines:re-split', (event) => {
      Array.from(event.target.children).forEach(
        (line) => (line.style.visibility = this.selected ? 'visible' : 'hidden'),
      );
    });
  }
  get index() {
    return [...this.parentNode.children].indexOf(this);
  }
  get selected() {
    return !this.hasAttribute('hidden');
  }
  async transitionToLeave(shouldAnimate = true) {
    const textLines = await resolveAsyncIterator(this.querySelectorAll('split-lines')),
      animation = new CustomAnimation(
        new ParallelEffect(
          textLines.reverse().map((item, index) => {
            return new CustomKeyframeEffect(
              item,
              {
                visibility: ['visible', 'hidden'],
                clipPath: ['inset(0 0 0 0)', 'inset(0 0 100% 0)'],
                transform: ['translateY(0)', 'translateY(100%)'],
              },
              {
                duration: 350,
                delay: 60 * index,
                easing: 'cubic-bezier(0.68, 0.00, 0.77, 0.00)',
              },
            );
          }),
        ),
      );
    shouldAnimate ? animation.play() : animation.finish();
    await animation.finished;
    this.setAttribute('hidden', '');
  }
  async transitionToEnter(shouldAnimate = true) {
    this.removeAttribute('hidden');
    const textLines = await resolveAsyncIterator(
        this.querySelectorAll('split-lines, .testimonial__author'),
      ),
      animation = new CustomAnimation(
        new ParallelEffect(
          textLines.map((item, index) => {
            return new CustomKeyframeEffect(
              item,
              {
                visibility: ['hidden', 'visible'],
                clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0px 0)'],
                transform: ['translateY(100%)', 'translateY(0)'],
              },
              {
                duration: 550,
                delay: 120 * index,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
              },
            );
          }),
        ),
      );
    shouldAnimate ? animation.play() : animation.finish();
    return animation.finished;
  }
};
window.customElements.define('press-item', PressItem);

export default PressItem;
