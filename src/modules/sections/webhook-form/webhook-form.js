// js/custom-element/section/collection-list/collection-list.js
const WebhookForm = class extends HTMLFormElement {
  constructor() {
    super();
  }

  getTemplate(target) {
    const template = this.querySelector(target);
    if (!template || template.tagName !== 'TEMPLATE') return '';
    const tempDivElement = document.createElement('div');
    tempDivElement.appendChild(template.content.firstElementChild.cloneNode(true));
    return tempDivElement.innerHTML;
  }

  connectedCallback() {
    this.webhook = this.getAttribute('data-webhook') || '';
    this.secret = this.getAttribute('data-secret') || '';
    this.goback = this.getAttribute('data-goback') || '';

    this.successTemplate = this.getTemplate('.success-banner');
    this.errorTemplate = this.getTemplate('.error-banner');
    if (this.webhook && this.secret) {
      this.addEventListener('submit', this._onSubmit.bind(this));
      // hack : necessary for chrome due to an update of Shopify
      this.submit = () => {};
    }
  }

  async _onSubmit(event) {
    event.preventDefault();

    const form = new FormData(this);
    const formEntries = [...form.entries()];
    // const entries = Object.fromEntries(formEntries);
    const previousHTML = this.innerHTML;

    const submitButtons = [...this.querySelectorAll('button[type="submit"]')];

    submitButtons?.forEach((submitButton) => {
      submitButton.setAttribute('disabled', 'disabled');
      submitButton.setAttribute('aria-busy', 'true');
    });

    const response = await fetch(this.webhook, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Language': this.secret,
      },
      body: form,
    });

    const json = await response.json();

    const template = json.status === 'OK' ? this.successTemplate : this.errorTemplate;

    this.innerHTML = template.replace(/#message#/g, json.message);

    this.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });

    if (json.status === 'KO') {
      const button = document.createElement('button');
      button.className = 'button button--secondary';
      button.innerHTML = this.goback;
      this.appendChild(button);

      button.addEventListener('click', () => {
        this.innerHTML = previousHTML;
        formEntries.forEach(([key, value]) => {
          const input = this.querySelector(`[name="${key}"]`);
          if (input) input.value = value;
        });
        const submitButtons = [...this.querySelectorAll('button[type="submit"]')];

        submitButtons?.forEach((submitButton) => {
          submitButton.removeAttribute('disabled');
          submitButton.removeAttribute('aria-busy');
        });
      });
    }
  }
};
window.customElements.define('webhook-form', WebhookForm, {
  extends: 'form',
});

export default WebhookForm;
