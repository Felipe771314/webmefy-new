// js/custom-element/section/gallery/gallery-list.js
const GalleryList = class extends HTMLElement {
  connectedCallback() {
    this.listItems = Array.from(this.querySelectorAll('gallery-item'));
    this.scrollBarElement = this.querySelector('.gallery__progress-bar');
    this.listWrapperElement = this.querySelector('.gallery__list-wrapper');
    if (this.listItems.length > 1) {
      this.addEventListener('scrollable-content:progress', this._updateProgressBar.bind(this));
      this.addEventListener('prev-next:prev', this.previous.bind(this));
      this.addEventListener('prev-next:next', this.next.bind(this));
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:select', (event) =>
          this.select(event.target.index, !event.detail.load),
        );
      }
    }
  }
  previous() {
    this.select([...this.listItems].reverse().find((item) => item.isOnLeftHalfPartOfScreen).index);
  }
  next() {
    this.select(this.listItems.findIndex((item) => item.isOnRightHalfPartOfScreen));
  }
  select(index, animate = true) {
    const boundingRect = this.listItems[index].getBoundingClientRect();
    this.listWrapperElement.scrollBy({
      behavior: animate ? 'smooth' : 'auto',
      left: Math.floor(boundingRect.left - window.innerWidth / 2 + boundingRect.width / 2),
    });
  }
  _updateProgressBar(event) {
    var _a;
    (_a = this.scrollBarElement) == null
      ? void 0
      : _a.style.setProperty('--transform', `${event.detail.progress}%`);
  }
};
window.customElements.define('gallery-list', GalleryList);

export default GalleryList;
