// Filter from GTM base tagging
class Ga4SyncStorage extends Array {
  constructor() {
    super();
    this._pendingElems = [];
  }

  push(...elems) {
    // Il n'est pas possible de stopper l'event page de trekkie, on enlève donc celui de du base-catcher
    const filteredElems = elems.filter(
      ({ event, __oz_event }) => !(__oz_event && event == 'page_view'),
    );
    super.push(...filteredElems);
    this.track(filteredElems);
  }

  track(elems) {
    elems.forEach((elem) => {
      // met un marqueur
      elem.__oz_event = true;

      if (elem.ecommerce) {
        // Lhack, le send_to permet de faire transiter les evenements à GA4 si GTM est aussi activé
        const { event, ecommerce, ...rest } = elem;
        elem.ecommerce.send_to = this.gtagId;
        this.gtag('event', event, { ...ecommerce, ...rest });
        return;
      }

      if (elem.ecommerce === null) {
        return;
      }

      if (elem.event) {
        const { event, ...rest } = elem;
        rest.send_to = this.gtagId;
        this.gtag('event', event, rest);
        return;
      }

      elem.send_to = this.gtagId;
      elem.send_page_view = false;
      this.gtag('config', this.gtagId, elem);
    });
  }

  // Retrun GA Tag Id set up in Shopify Account
  get gtagId() {
    return window?.trekkie?.config['Google Gtag Pixel']?.conversionId || null;
  }

  // Fallback if GA is not activated in Shopify
  get gtag() {
    return (
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      }
    );
  }
}
export default Ga4SyncStorage;
