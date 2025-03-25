import gtmCrumbCatcher from '@modules/snippets/gtm-body-tag/components/gtm-crumb-catcher';
import Ga4SyncStorage from '@modules/snippets/ga4-body-tag/components/ga4-async-storage';

// Si GTM uniquement Tag GTM + crumb catcher GTM
// Si GTM  + GTAG : TAG GTM  + GTAG catcher
// GTA uniquement : GTAG catcher
// activation GTag dans theme : TAG GTAG

// Override gtmCrumbCatcher
class Ga4CrumbCatcher extends gtmCrumbCatcher {
  constructor() {
    super();
  }

  // just replace  window.dataLayer by the proxy
  get syncStorage() {
    this._ga4Storage = this._ga4Storage || new Ga4SyncStorage();
    return this._ga4Storage;
  }
}
customElements.define('ga4-crumb-catcher', Ga4CrumbCatcher);
export default Ga4CrumbCatcher;
