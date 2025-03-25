// js/custom-element/section/timeline/timeline.js
import { getSiblings } from '@/js/helper/dom';
import './timeline.scss';

const Timeline = class extends HTMLElement {
  connectedCallback() {
    this.prevNextButtons = this.querySelector('prev-next-buttons');
    this.pageDots = this.querySelector('page-dots');
    this.scrollBarElement = this.querySelector('.timeline__progress-bar');
    this.listWrapperElement = this.querySelector('.timeline__list-wrapper');
    this.listItemElements = Array.from(this.querySelectorAll('.timeline__item'));
    this.isScrolling = false;
    if (this.listItemElements.length > 1) {
      this.addEventListener('prev-next:prev', this.previous.bind(this));
      this.addEventListener('prev-next:next', this.next.bind(this));
      this.addEventListener('page-dots:changed', (event) => this.select(event.detail.index));
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:select', (event) => {
          this.select(
            [...event.target.parentNode.children].indexOf(event.target),
            !event.detail.load,
          );
        });
      }
      this.itemIntersectionObserver = new IntersectionObserver(this._onItemObserved.bind(this), {
        threshold: 0.4,
      });
      const mediaQuery = window.matchMedia(window.themeVariables.breakpoints.pocket);
      mediaQuery.addListener(this._onMediaChanged.bind(this));
      this._onMediaChanged(mediaQuery);
    }
  }
  get selectedIndex() {
    return this.listItemElements.findIndex((item) => !item.hasAttribute('hidden'));
  }
  previous() {
    this.select(Math.max(0, this.selectedIndex - 1));
  }
  next() {
    this.select(Math.min(this.selectedIndex + 1, this.listItemElements.length - 1));
  }
  select(index, animate = true) {
    const listItemElement = this.listItemElements[index],
      boundingRect = listItemElement.getBoundingClientRect();
    if (animate) {
      this.isScrolling = true;
      setTimeout(() => (this.isScrolling = false), 800);
    }
    if (window.matchMedia(window.themeVariables.breakpoints.pocket).matches) {
      this.listWrapperElement.scrollTo({
        behavior: animate ? 'smooth' : 'auto',
        left: this.listItemElements[0].clientWidth * index,
      });
    } else {
      this.listWrapperElement.scrollBy({
        behavior: animate ? 'smooth' : 'auto',
        left: Math.floor(boundingRect.left - window.innerWidth / 2 + boundingRect.width / 2),
      });
    }
    this._onItemSelected(index);
  }
  _onItemSelected(index) {
    var _a;
    const listItemElement = this.listItemElements[index];
    listItemElement.removeAttribute('hidden', 'false');
    getSiblings(listItemElement).forEach((item) => item.setAttribute('hidden', ''));
    this.prevNextButtons.isPrevDisabled = index === 0;
    this.prevNextButtons.isNextDisabled = index === this.listItemElements.length - 1;
    this.pageDots.selectedIndex = index;
    (_a = this.scrollBarElement) == null
      ? void 0
      : _a.style.setProperty(
          '--transform',
          `${(100 / (this.listItemElements.length - 1)) * index}%`,
        );
  }
  _onItemObserved(entries) {
    if (this.isScrolling) {
      return;
    }
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this._onItemSelected([...entry.target.parentNode.children].indexOf(entry.target));
      }
    });
  }
  _onMediaChanged(event) {
    if (event.matches) {
      this.listItemElements.forEach((item) => this.itemIntersectionObserver.observe(item));
    } else {
      this.listItemElements.forEach((item) => this.itemIntersectionObserver.unobserve(item));
    }
  }
};
window.customElements.define('time-line', Timeline);

export default Timeline;
