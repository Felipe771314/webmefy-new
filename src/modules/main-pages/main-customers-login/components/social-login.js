import { subscribeCartContent } from '@/js/store/cart';
import { getRedirectUrl } from '@/js/helper/redirect-logic';

class SocialLogin extends HTMLElement {
  constructor() {
    super();

    this.redirect = getRedirectUrl('redirect');

    if (this.redirect && !/^\//.test(this.redirect)) this.redirect = '/' + this.redirect;

    this.config = { childList: true, attributes: false };

    this.grabIframe();
    this.observer = new MutationObserver(this.callback.bind(this));
  }

  get parentIndentifier() {
    const parent = this.closest('[is="customer-identification"]');
    if (!parent) return null;
    return parent.getAttribute('page');
  }

  connectedCallback() {
    this.observer.observe(this, this.config);
    this.unsubscribeCart = subscribeCartContent(this.updateRedirectFromCart.bind(this));
  }
  disconnectedCallback() {
    this.unsubscribeCart && this.unsubscribeCart();
  }

  callback = function (nodes) {
    const targets = nodes.map((node) => [...node.addedNodes]).flat();
    if (!targets.length) return;
    this.grabIframe();
  };

  grabIframe() {
    this.iframe = this.querySelector('iframe');
    if (!this.iframe) return;
    this.iframeOriginalSrc = this.iframe.src;
    this.setUrl();
  }

  updateRedirectFromCart(cart) {
    this.hasCartItems = !!cart.items.length;
    this.setUrl();
  }

  setUrl() {
    if (!this.iframe) return;

    // algo :
    // - Si une redirection est définie on la suit
    // - Sinon, si le panier est remple on redireige vers le panier
    // - Sinon, si c'est un création de compte, on redirige vers la page d'accueil
    let redirect = '/account/login';
    if (this.redirect) {
      redirect = this.redirect;
    } else if (this.hasCartItems && window.themeVariables.routes.cartUrl) {
      redirect = window.themeVariables.routes.cartUrl;
    } else if (this.parentIndentifier === 'register') {
      redirect = '/';
    }

    let src = this.iframeOriginalSrc;
    if (redirect) {
      src = this.iframeOriginalSrc.replace(/\/account\/login[\s\S]*$/, redirect);
    }
    this.iframe.src = src;
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }
}

window.customElements.define('social-login', SocialLogin);

export default SocialLogin;
