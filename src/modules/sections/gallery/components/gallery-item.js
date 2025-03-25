// js/custom-element/section/gallery/gallery-item.js
const GalleryItem = class extends HTMLElement {
  get index() {
    return [...this.parentNode.children].indexOf(this);
  }
  get isOnRightHalfPartOfScreen() {
    if (window.themeVariables.settings.direction === 'ltr') {
      return this.getBoundingClientRect().left > window.innerWidth / 2;
    } else {
      return this.getBoundingClientRect().right < window.innerWidth / 2;
    }
  }
  get isOnLeftHalfPartOfScreen() {
    if (window.themeVariables.settings.direction === 'ltr') {
      return this.getBoundingClientRect().right < window.innerWidth / 2;
    } else {
      return this.getBoundingClientRect().left > window.innerWidth / 2;
    }
  }
};
window.customElements.define('gallery-item', GalleryItem);

export default GalleryItem;
