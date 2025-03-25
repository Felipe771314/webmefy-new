// js/custom-element/section/announcement-bar/announcement-bar.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';

const AnnouncementBar = class extends CustomHTMLElement {
  async connectedCallback() {
    await customElements.whenDefined('announcement-bar-item');
    this.items = Array.from(this.querySelectorAll('announcement-bar-item'));
    this.hasPendingTransition = false;
    this.delegate.on('click', '[data-action="prev"]', this.previous.bind(this));
    this.delegate.on('click', '[data-action="next"]', this.next.bind(this));
    if (this.autoPlay) {
      this.delegate.on('announcement-bar:content:open', this._pausePlayer.bind(this));
      this.delegate.on('announcement-bar:content:close', this._startPlayer.bind(this));
    }
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this._updateCustomProperties.bind(this));
      this.resizeObserver.observe(this);
    }
    if (this.autoPlay) {
      this._startPlayer();
    }
    if (Shopify.designMode) {
      this.delegate.on('shopify:block:select', (event) => this.select(event.target.index, false));
    }

    // Announcement bar

    this.bindedOnCloseAnnouncementBar = this.closeAnnouncementBar.bind(this);

    this.announceBarCloseBtn = document.querySelector('.announcement-bar__main-close-button');

    if (sessionStorage.getItem('closedAnnouncementBar') === 'true') {
      document.querySelector('.announcement-bar').style.display = 'none';
    }

    if (this.announceBarCloseBtn) {
      this.announceBarCloseBtn.addEventListener('click', this.bindedOnCloseAnnouncementBar);
    }
  }
  closeAnnouncementBar(e) {
    document.querySelector('.announcement-bar').style.display = 'none';
    sessionStorage.setItem('closedAnnouncementBar', 'true');
  }

  disconnectedCallback() {
    this.announceBarCloseBtn?.removeEventListener('click', this.bindedOnCloseAnnouncementBar);
  }

  get autoPlay() {
    return this.hasAttribute('auto-play');
  }
  get selectedIndex() {
    return this.items.findIndex((item) => item.selected);
  }
  previous() {
    this.select((this.selectedIndex - 1 + this.items.length) % this.items.length);
  }
  next() {
    this.select((this.selectedIndex + 1 + this.items.length) % this.items.length);
  }
  async select(index, animate = true) {
    if (this.selectedIndex === index || this.hasPendingTransition) {
      return;
    }
    if (this.autoPlay) {
      this._pausePlayer();
    }
    this.hasPendingTransition = true;
    await this.items[this.selectedIndex].deselect(animate);
    await this.items[index].select(animate);
    this.hasPendingTransition = false;
    if (this.autoPlay) {
      this._startPlayer();
    }
  }
  _pausePlayer() {
    clearInterval(this._interval);
  }
  _startPlayer() {
    this._interval = setInterval(
      this.next.bind(this),
      parseInt(this.getAttribute('cycle-speed')) * 1e3,
    );
  }
  _updateCustomProperties(entries) {
    entries.forEach((entry) => {
      if (entry.target === this) {
        const height = entry.borderBoxSize
          ? entry.borderBoxSize.length > 0
            ? entry.borderBoxSize[0].blockSize
            : entry.borderBoxSize.blockSize
          : entry.target.clientHeight;
        document.documentElement.style.setProperty('--announcement-bar-height', `${height}px`);
      }
    });
  }
};
window.customElements.define('announcement-bar', AnnouncementBar);

export default AnnouncementBar;
