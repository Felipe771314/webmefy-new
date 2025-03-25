import Ga4SyncStorage from '@modules/snippets/ga4-body-tag/components/ga4-async-storage';
import gtmCheckoutCatcher from '@modules/snippets/gtm-checkout-tag/components/gtm-checkout-catcher';

// Override gtmCheckoutCatcher
class Ga4CheckoutCatcher extends gtmCheckoutCatcher {
  constructor() {
    super();
  }

  // just replace  window.dataLayer by the proxy
  get syncStorage() {
    this._ga4Storage = this._ga4Storage || new Ga4SyncStorage();
    return this._ga4Storage;
  }
}
customElements.define('ga4-checkout-catcher', Ga4CheckoutCatcher);
export default Ga4CheckoutCatcher;
