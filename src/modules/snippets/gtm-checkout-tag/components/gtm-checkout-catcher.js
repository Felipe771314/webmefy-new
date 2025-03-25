import { setUser } from '@/js/store/user';
import { getMappedResults } from '@/js/helper/getMappedResults';
import { cartMapping } from '@modules/snippets/gtm-body-tag/components/gtm-data-mapping';
import gtmBaseCatcher from '@modules/snippets/gtm-body-tag/components/gtm-base-catcher';
import { getCartDiscountCode } from '@/js/helper/trackingHelpers';

const GtmCheckoutCatcher = class extends gtmBaseCatcher {
  //***************************************************************
  //**********************LIFE CYCLE*******************************
  //***************************************************************

  constructor(props) {
    super(props);
    // push user and cart in stateManager
    setUser(window.OZ_GTM?.user_id, window.OZ_GTM?.encoded_user_id);
  }

  /**
   * Souscriptions aus données
   */
  async connectedCallback() {
    super.connectedCallback();
    if (window._isLightHouse) {
      return;
    }
    this.unsubscribeListenSteps = this.listenSteps();
  }

  /**
   * nettoyage des souscriptions aus données
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeListenSteps();
  }

  listenSteps() {
    const view_step = (evt) => {
      const { step, page } = Shopify.Checkout;

      // Page du checkout
      if (page === 'show') {
        switch (step) {
          // dans ces cas-là, on n'envoie l'event qu'au click sur le bouton "continuer"
          // (le choix du paiement ou du shipping et alors validé)
          case 'shipping_method':
          case 'payment_method':
            const btn = document.querySelector('#continue_button');
            btn.addEventListener('click', () => {
              this.send_checkout_step(step);
            });

            break;

          // cas standard
          default:
            this.send_checkout_step(step);
        }
      }
      // page de confirmation
      if (page === 'thank_you') this.send_checkout_step('thank_you');
    };

    document.addEventListener('page:load', view_step);
    //document.addEventListener("page:change", view_step);

    return () => {
      document.removeEventListener('page:load', view_step);
      // document.removeEventListener("page:change", view_step);
    };
  }

  //***************************************************************
  //**********************GETTERS**********************************
  //***************************************************************

  getShippingMethod() {
    const shippings = document.querySelectorAll('[data-shipping-method] input');

    if (!shippings.length) return '';
    const selectedShipping = [...shippings].find((input) => input.checked);
    if (!selectedShipping) return '';
    const label = document.querySelector(
      `label[for="${selectedShipping.id}"] [data-shipping-method-label-title]`,
    );
    if (!label) return '';
    return label.getAttribute('data-shipping-method-label-title');
  }

  getPayementMethod() {
    const payments = document.querySelectorAll('input[name="checkout[payment_gateway]"]');
    if (!payments.length) return '';
    const selectedPayment = [...payments].find((input) => input.checked);

    if (!selectedPayment) return '';
    const label = document.querySelector(`label[for="${selectedPayment.id}"]`);
    if (!label) return '';
    const payment = label.textContent.replace(/^[\n\s]+/, '').replace(/[\n\s]+$/, '');

    return payment;
  }

  /**
   *  récupère les 5 premières catgories
   */

  static getCollectionList(productInfos) {
    if (!productInfos.collection_names) return {};

    const categories = productInfos.collection_names.split(/,/).map((elem, key) => {
      const catName = `item_category${key ? key + 1 : ''}`;
      return [catName, elem];
    });
    if (categories.length > 5) categories.length = 5;
    return Object.fromEntries(categories);
  }

  //***************************************************************
  //******************ENVOI DES EVENTS GTM*************************
  //***************************************************************

  send_checkout_step(step) {
    const { currency, cart, order_id } = window.OZ_GTM;

    const items = getMappedResults(
      cart.lineItems.map((item) => {
        const categoryInfos = GtmCheckoutCatcher.getCollectionList(item);
        return {
          ...item,
          ...categoryInfos,
        };
      }),
      cartMapping,
    );

    const value = cart.total_price / 100;

    let dataLayer;

    const message = {
      event: null,
      ecommerce: {
        currency,
        value,
        items,
      },
    };
    const coupon = getCartDiscountCode(cart);
    if (coupon) message.ecommerce.coupon = coupon;

    if (this.sendAsync) this.asyncContext.set({ coupon });
    switch (step) {
      case 'contact_information':
        dataLayer = this.getDataLayer();
        message.event = 'begin_checkout';
        break;
      case 'shipping_method':
        dataLayer = this.getDataLayer(true);
        message.event = 'add_shipping_info';
        message.ecommerce.shipping_tier = this.getShippingMethod();
        break;
      case 'payment_method':
        dataLayer = this.getDataLayer(true);
        message.event = 'add_payment_info';
        message.ecommerce.payment_type = this.getPayementMethod();
        break;
      case 'thank_you':
        dataLayer = this.getDataLayer();
        message.event = 'purchase';
        message.ecommerce.transaction_id = order_id;
        message.ecommerce.shipping = parseInt(((cart.shipping_price || 0) / 100).toFixed(2));
        message.ecommerce.tax = parseInt(((cart.tax || 0) / 100).toFixed(2));
        break;
    }

    if (!message.event) return;

    // envoi dans le datalayer
    dataLayer.push({ ecommerce: null });
    dataLayer.push(message);
  }
};
//***************************************************************
//**********************HELPERS**********************************
//***************************************************************

window.customElements.define('gtm-checkout-catcher', GtmCheckoutCatcher);
export default GtmCheckoutCatcher;
