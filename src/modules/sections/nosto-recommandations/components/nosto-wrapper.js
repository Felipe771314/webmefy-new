import SectionLoader from '@/js/helper/section-loader';

class NostoWrapper extends HTMLElement {
  constructor() {
    super();
    this.template = this.getTemplate();

    if (window.Shopify && window.Shopify.designMode) this.appendChild(this.template);

    this.config = { childList: true, attributes: false, subtree: false };

    this.nostoElement = this.querySelector('[nosto-initial-content]');
    this.observer = new MutationObserver(this.callback.bind(this));
    this.urlParams = null;
  }

  getTemplate() {
    const template = this.querySelector('template');
    if (!template) return document.createElement('div');
    return template.content.cloneNode(true);
  }

  get renderSectionId() {
    return this.getAttribute('render-section-id') || 'ajax-product-list-scroller';
  }

  connectedCallback() {
    this.observer.observe(this.nostoElement, this.config);
  }

  callback = function (nodes) {
    let lastUrl = null;
    const targets = nodes.map((node) => [...node.addedNodes]).flat();
    if (!targets.length) return;

    const handles = targets
      .filter((node) => node.hasAttribute && node.hasAttribute('url'))
      .map((node) => {
        lastUrl = node.textContent;
        return node.textContent;
      })
      .map((url) => /\/([^\/?]+)(?:\?.*)?$/.exec(url))
      .map((redexpResult) => redexpResult && redexpResult[1])
      .filter((handle) => !!handle);

    if (lastUrl) {
      this.urlParams = new URL(lastUrl).searchParams;
    }

    const product_handles = [...new Set(handles)];
    this.nostoElement.innerHTML = '';

    if (product_handles.length) {
      if (!window.Shopify || !window.Shopify.designMode) this.appendChild(this.template);
      this.getProducts(product_handles.join(','));
    }
  };

  async getProducts(product_handles) {
    const url_params = [...this.urlParams].map(([key, value]) => `${key}|${value}`).join(',');
    const nodes = await SectionLoader.load({
      resource: `search`,
      params: {
        q: 'a',
        view: new Date().getTime(),
        product_handles,
        list_id: `nosto|${this.nostoElement.id}`,
        url_params,
      },
      sections: this.renderSectionId,
      options: {
        returnNodes: true,
        saveToStorage: false,
      },
    });

    const productListTarget = this.querySelector('[product-list]');
    productListTarget.innerHTML = '';
    nodes.forEach((node) => productListTarget.appendChild(node));
  }
}

customElements.define('nosto-wrapper', NostoWrapper);
export default NostoWrapper;
