// js/custom-element/section/cart/notification.js
import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import { subscribePreview, removePreview } from '@/js/store/aki-preview-store';

const AkiPreviewNotification = class extends CustomHTMLElement {
  connectedCallback() {
    this.unsubscribePreview = subscribePreview(this._onShow.bind(this), true);

    this.delegate.on('click', '[data-action="close"]', (event) => {
      event.stopPropagation();
      removePreview();
      this.hidden = true;
    });
  }
  set hidden(value) {
    this.toggleAttribute('hidden', value);
  }

  _onShow(preview_status) {
    if (!preview_status.at) {
      return;
    }

    const date = (this.innerHTML = `
        <div class="preview-notification__overflow">
          <div class="container">
            <div class="preview-notification__wrapper">
              
                <div class="simple-notification__text-wrapper preview-notification__text-wrapper">
                <span class="simple-notification__heading preview-notification__heading heading">AKI Preview</span>
                <span class="simple-notification__text">${new Date(
                  preview_status.date,
                ).toLocaleString()}</span>
              </div>
              
                     <button class="preview-notification__close " data-action="close">
          <span class="visually-hidden">${window.themeVariables.strings.accessibilityClose}</span>
          <svg focusable="false" width="14" height="14" class="icon icon--close icon--inline" viewBox="0 0 14 14">
            <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"></path>
          </svg>
        </button>
            </div>
          </div>
        </div>
      `);

    this.hidden = false;
  }
};
window.customElements.define('aki-preview-notification', AkiPreviewNotification);

export default AkiPreviewNotification;
