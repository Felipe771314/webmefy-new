// js/custom-element/section/announcement-bar/item.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import { createFocusTrap } from 'focus-trap';

const AnnouncementBarItem = class extends CustomHTMLElement {
  connectedCallback() {
    if (this.hasContent) {
      this.contentElement = this.querySelector('.announcement-bar__content');
      this.delegate.on('click', '[data-action="open-content"]', this.openContent.bind(this));
      this.delegate.on('click', '[data-action="close-content"]', this.closeContent.bind(this));
      if (Shopify.designMode) {
        this.addEventListener('shopify:block:select', this.openContent.bind(this));
        this.addEventListener('shopify:block:deselect', this.closeContent.bind(this));
      }
    }
  }
  get index() {
    return [...this.parentNode.children].indexOf(this);
  }
  get hasContent() {
    return this.hasAttribute('has-content');
  }
  get selected() {
    return !this.hasAttribute('hidden');
  }
  get focusTrap() {
    return (this._trapFocus =
      this._trapFocus ||
      createFocusTrap(this.contentElement.querySelector('.announcement-bar__content-inner'), {
        fallbackFocus: this,
        clickOutsideDeactivates: (event) => !(event.target.tagName === 'BUTTON'),
        allowOutsideClick: (event) => event.target.tagName === 'BUTTON',
        onDeactivate: this.closeContent.bind(this),
        preventScroll: true,
      }));
  }
  async select(animate = true) {
    this.removeAttribute('hidden');
    await new Promise((resolve) => {
      this.animate(
        {
          transform: ['translateY(8px)', 'translateY(0)'],
          opacity: [0, 1],
        },
        {
          duration: animate ? 150 : 0,
          easing: 'ease-in-out',
        },
      ).onfinish = resolve;
    });
  }
  async deselect(animate = true) {
    await this.closeContent();
    await new Promise((resolve) => {
      this.animate(
        {
          transform: ['translateY(0)', 'translateY(-8px)'],
          opacity: [1, 0],
        },
        {
          duration: animate ? 150 : 0,
          easing: 'ease-in-out',
        },
      ).onfinish = resolve;
    });
    this.setAttribute('hidden', '');
  }
  async openContent() {
    if (this.hasContent) {
      this.contentElement.addEventListener('transitionend', () => this.focusTrap.activate(), {
        once: true,
      });
      this.contentElement.removeAttribute('hidden');
      document.documentElement.classList.add('lock-all');
      this.dispatchEvent(new CustomEvent('announcement-bar:content:open', { bubbles: true }));
    }
  }
  async closeContent() {
    if (!this.hasContent || this.contentElement.hasAttribute('hidden')) {
      return Promise.resolve();
    }
    await new Promise((resolve) => {
      this.contentElement.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
      this.contentElement.setAttribute('hidden', '');
      this.focusTrap.deactivate();
      document.documentElement.classList.remove('lock-all');
      this.dispatchEvent(new CustomEvent('announcement-bar:content:close', { bubbles: true }));
    });
  }
};
window.customElements.define('announcement-bar-item', AnnouncementBarItem);

export default AnnouncementBarItem;
