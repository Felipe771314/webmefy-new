// js/custom-element/section/slideshow/slideshow-item.js
import MediaFeatures from '~/js/helper/media-features';
import {
  CustomAnimation,
  CustomKeyframeEffect,
  ParallelEffect,
  SequenceEffect,
} from '~/js/helper/animation';
import { imageLoaded } from '~/js/helper/image';
import { resolveAsyncIterator } from '~/js/helper/dom';

const SlideshowItem = class extends HTMLElement {
  async connectedCallback() {
    this._pendingAnimations = [];
    this.addEventListener('split-lines:re-split', (event) => {
      Array.from(event.target.children).forEach(
        (line) => (line.style.visibility = this.selected ? 'visible' : 'hidden'),
      );
    });
    if (MediaFeatures.prefersReducedMotion()) {
      this.setAttribute('reveal-visibility', '');
      Array.from(this.querySelectorAll('[reveal], [reveal-visibility]')).forEach((item) => {
        item.removeAttribute('reveal');
        item.removeAttribute('reveal-visibility');
      });
    }
  }
  get index() {
    return [...this.parentNode.children].indexOf(this);
  }
  get selected() {
    return !this.hasAttribute('hidden');
  }
  async transitionToLeave(transitionType, shouldAnimate = true) {
    if (transitionType !== 'reveal') {
      this.setAttribute('hidden', '');
    }
    this._pendingAnimations.forEach((animation2) => animation2.cancel());
    this._pendingAnimations = [];
    let animation = null,
      textElements = await resolveAsyncIterator(
        this.querySelectorAll('split-lines, .button-group, .button-wrapper'),
      ),
      imageElements = Array.from(this.querySelectorAll('.slideshow__image-wrapper'));
    switch (transitionType) {
      case 'sweep':
        animation = new CustomAnimation(
          new SequenceEffect([
            new CustomKeyframeEffect(
              this,
              { visibility: ['visible', 'hidden'] },
              { duration: 500 },
            ),
            new ParallelEffect(
              textElements.map((item) => {
                return new CustomKeyframeEffect(item, {
                  opacity: [1, 0],
                  visibility: ['visible', 'hidden'],
                });
              }),
            ),
          ]),
        );
        break;
      case 'fade':
        animation = new CustomAnimation(
          new CustomKeyframeEffect(
            this,
            { opacity: [1, 0], visibility: ['visible', 'hidden'] },
            { duration: 250, easing: 'ease-in-out' },
          ),
        );
        break;
      case 'reveal':
        animation = new CustomAnimation(
          new SequenceEffect([
            new ParallelEffect(
              textElements.reverse().map((item) => {
                return new CustomKeyframeEffect(
                  item,
                  { opacity: [1, 0], visibility: ['visible', 'hidden'] },
                  { duration: 250, easing: 'ease-in-out' },
                );
              }),
            ),
            new ParallelEffect(
              imageElements.map((item) => {
                if (!item.classList.contains('slideshow__image-wrapper--secondary')) {
                  return new CustomKeyframeEffect(
                    item,
                    {
                      visibility: ['visible', 'hidden'],
                      clipPath: ['inset(0 0 0 0)', 'inset(0 0 100% 0)'],
                    },
                    {
                      duration: 450,
                      easing: 'cubic-bezier(0.99, 0.01, 0.50, 0.94)',
                    },
                  );
                } else {
                  return new CustomKeyframeEffect(
                    item,
                    {
                      visibility: ['visible', 'hidden'],
                      clipPath: ['inset(0 0 0 0)', 'inset(100% 0 0 0)'],
                    },
                    {
                      duration: 450,
                      easing: 'cubic-bezier(0.99, 0.01, 0.50, 0.94)',
                    },
                  );
                }
              }),
            ),
          ]),
        );
        break;
    }
    await this._executeAnimation(animation, shouldAnimate);
    if (transitionType === 'reveal') {
      this.setAttribute('hidden', '');
    }
  }
  async transitionToEnter(transitionType, shouldAnimate = true, reverseDirection = false) {
    this.removeAttribute('hidden');
    await this._untilReady();
    let animation = null,
      textElements = await resolveAsyncIterator(
        this.querySelectorAll('split-lines, .button-group, .button-wrapper'),
      ),
      imageElements = Array.from(this.querySelectorAll('.slideshow__image-wrapper'));
    switch (transitionType) {
      case 'sweep':
        animation = new CustomAnimation(
          new SequenceEffect([
            new CustomKeyframeEffect(
              this,
              {
                visibility: ['hidden', 'visible'],
                clipPath: reverseDirection
                  ? ['inset(0 100% 0 0)', 'inset(0 0 0 0)']
                  : ['inset(0 0 0 100%)', 'inset(0 0 0 0)'],
              },
              { duration: 500, easing: 'cubic-bezier(1, 0, 0, 1)' },
            ),
            new ParallelEffect(
              textElements.map((item, index) => {
                return new CustomKeyframeEffect(
                  item,
                  {
                    opacity: [0, 1],
                    visibility: ['hidden', 'visible'],
                    clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
                    transform: ['translateY(100%)', 'translateY(0)'],
                  },
                  {
                    duration: 450,
                    delay: 100 * index,
                    easing: 'cubic-bezier(0.5, 0.06, 0.01, 0.99)',
                  },
                );
              }),
            ),
          ]),
        );
        break;
      case 'fade':
        animation = new CustomAnimation(
          new CustomKeyframeEffect(
            this,
            { opacity: [0, 1], visibility: ['hidden', 'visible'] },
            { duration: 250, easing: 'ease-in-out' },
          ),
        );
        break;
      case 'reveal':
        animation = new CustomAnimation(
          new SequenceEffect([
            new ParallelEffect(
              imageElements.map((item) => {
                if (!item.classList.contains('slideshow__image-wrapper--secondary')) {
                  return new CustomKeyframeEffect(
                    item,
                    {
                      visibility: ['hidden', 'visible'],
                      clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
                    },
                    {
                      duration: 450,
                      delay: 100,
                      easing: 'cubic-bezier(0.5, 0.06, 0.01, 0.99)',
                    },
                  );
                } else {
                  return new CustomKeyframeEffect(
                    item,
                    {
                      visibility: ['hidden', 'visible'],
                      clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'],
                    },
                    {
                      duration: 450,
                      delay: 100,
                      easing: 'cubic-bezier(0.5, 0.06, 0.01, 0.99)',
                    },
                  );
                }
              }),
            ),
            new ParallelEffect(
              textElements.map((item, index) => {
                return new CustomKeyframeEffect(
                  item,
                  {
                    opacity: [0, 1],
                    visibility: ['hidden', 'visible'],
                    clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
                    transform: ['translateY(100%)', 'translateY(0)'],
                  },
                  {
                    duration: 450,
                    delay: 100 * index,
                    easing: 'cubic-bezier(0.5, 0.06, 0.01, 0.99)',
                  },
                );
              }),
            ),
          ]),
        );
        break;
    }
    return this._executeAnimation(animation, shouldAnimate);
  }
  async _executeAnimation(animation, shouldAnimate) {
    this._pendingAnimations.push(animation);
    shouldAnimate ? animation.play() : animation.finish();
    return animation.finished;
  }
  async _untilReady() {
    return Promise.all(this._getVisibleImages().map((image) => imageLoaded(image)));
  }
  _preloadImages() {
    this._getVisibleImages().forEach((image) => {
      image.setAttribute('loading', 'eager');
    });
  }
  _getVisibleImages() {
    return Array.from(this.querySelectorAll('img')).filter((image) => {
      return getComputedStyle(image.parentElement).display !== 'none';
    });
  }
};
window.customElements.define('slide-show-item', SlideshowItem);

export default SlideshowItem;
