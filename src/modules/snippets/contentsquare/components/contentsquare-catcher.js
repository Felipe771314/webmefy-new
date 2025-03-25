import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';
import {
  subscribeAddToCart,
  subscribeImpressions,
  subscribeNavigation,
} from '@/js/store/impressions';
import { itemMapping } from '@modules/snippets/contentsquare/components/contentsquare-data-mapping';
import Delegate from 'ftdomdelegate/main';
import { subscribeSelectedVariant } from '@/js/store/products';
import { subscribeUser } from '@/js/store/user';
import TrackingEvent from '@/js/helper/trackingEvents';
import { subscribeFilters } from '@/js/store/collection';
import { getParentTarget } from '@/js/helper/get-parent-target';
import { debounce } from '@/js/helper/debouncers';
import { getUrlParams } from '@/js/helper/location';
import PerishableEvents from '@/js/helper/perishable-events';
import { isMainProduct, getCompletedImpressions, getObjectDif } from '@/js/helper/trackingHelpers';
import { setCookie, getCookie } from '@/js/helper/cookies';

import { getBreadcrumb } from '@/js/store/breadcrumb';

const SCOPE_VISIT = 2;
const SCOPE_PAGE = 3;

const ContentsquareCatcher = class extends CustomHTMLElement {
  //***************************************************************
  //**********************LIFE CYCLE*******************************
  //***************************************************************

  constructor(props) {
    super(props);
    this.previousState = {};
    this.previousFilters = {};

    // Execute le listener sur les clicks
    this.bodyDelegate = this.bodyDelegate || new Delegate(document.body);
    this.killDelegate = () => {
      this.bodyDelegate.destroy();
    };

    this.currency = this.getAttribute('currency') || 'EUR';
    this.pageType = this.getAttribute('page-type') || '';
    this.tag_id = this.getAttribute('tag-id') || '';
    const pageTitle = this.getAttribute('page-title') || '';
    const span = document.createElement('span');
    span.innerHTML = pageTitle;
    this.pageTitle = span.textContent;

    this.pagePath = this.getAttribute('page-path') || '';

    // on stocke l'url dans le storage pour le PIXEL
    const script_url = this.getAttribute('script-url') || '';
    window.localStorage.setItem('contentsquare_script_url', script_url);
    setCookie('contentsquare_script_url', script_url);

    // on stocke le tags-id dans le storage pour le PIXEL
    window.localStorage.setItem('contentsquare_tag_id', this.tag_id);
    setCookie('contentsquare_tag_id', this.tag_id);
  }

  static promisify = () => {
    let resolve;
    const promise = new Promise((res) => (resolve = res));
    return [promise, resolve];
  };

  init() {
    this.send_event('setCustomVariable', 11, 'page_type', this.pageType, SCOPE_PAGE);

    this.send_event(
      'setCustomVariable',
      12,
      'env_language',
      window?.themeVariables?.data?.lang,
      SCOPE_PAGE,
    );

    this.send_event(
      'setCustomVariable',
      13,
      'env_country',
      window?.themeVariables?.settings?.currentLocalization,
      SCOPE_PAGE,
    );

    this.send_event(
      'setCustomVariable',
      14,
      'env_currency',
      window?.themeVariables?.settings?.cartCurrency,
      SCOPE_PAGE,
    );

    const breadcrumbs = getBreadcrumb() || [];
    if (breadcrumbs.length) {
      const breadcrumb = breadcrumbs.map((item) => item.name).join(' / ');

      this.send_event('setCustomVariable', 15, 'page_breadcrumb', breadcrumb, SCOPE_PAGE);
    }

    const [promiseConsent, resolveConsent] = ContentsquareCatcher.promisify();
    const [promiseUser, resolveUser] = ContentsquareCatcher.promisify();
    const [promiseProduct, resolveProduct] = ContentsquareCatcher.promisify();

    this.resolveConsent = resolveConsent;
    this.resolveProduct = resolveProduct;
    this.resolveUser = resolveUser;

    const whenReady = Promise.all([promiseConsent, promiseUser, promiseProduct]);
    whenReady.then(() => {
      this.launchScript();
    });

    const previsouConsentMode = window.localStorage.getItem('consentMode');
    if (previsouConsentMode) {
      this.waitForConsent(previsouConsentMode);
    }
    this.bodyDelegate.on('google-consent', 'body', (event) => {
      this.waitForConsent(event.detail);
    });

    if (this.pageType !== 'product') {
      this.resolveProduct();
    }
  }

  launch_trackings() {
    // stacke les infos d'impressions
    this.getImpressions = debounce(this.launchImpressions.bind(this), 2000);
    this._unsubscribeImpressions = subscribeImpressions(this.getImpressions, true);

    this._unsubscribeNavigation = subscribeNavigation();
    // this.send_select_content.bind(this)
    this._unsubscribeAddToCart = subscribeAddToCart(this.send_add_to_cart.bind(this));

    if (window.sessionStorage) {
      this.previousCart = JSON.parse(sessionStorage.getItem('gtm-cart') || '{}');
    }

    /*
    this.unsubscribeCart = subscribeCartDisplay(
      this.manage_cart_suppressions.bind(this),
      true
    );
     */

    this.launchEventTracking();
    this.runSimpleTrackings();

    // créé un pool de fonction à nettoyer
    this.variantSubscribtionPool = [];
  }
  /**
   * Souscriptions aus données
   */
  async connectedCallback() {
    /*if (window._isLightHouse) {
      return;
    }*/

    this.init();
    this.launch_trackings();

    switch (this.pageType) {
      case 'collection':
        this.unsubscribeFacets = subscribeFilters(
          this.pushNewPage.bind(this),
          //this.facetTracking.bind(this)
        );
        this.rootDelegate.on('pagination:page-changed', this.pushNewPage.bind(this));
        break;
      /* case "product":
        this.unsubscribeFacets = subscribeFilters(
          this.facetTracking.bind(this)
        );
        this.throwCollectionEvent();
        break;*/
      case 'search':
        this.unsubscribeFacets = subscribeFilters(this.facetTracking.bind(this));
    }

    //if (this.userIsSendable) {
    this._unsubscribeUser = subscribeUser(this.send_user_id.bind(this), true);
    //  }
  }

  /**
   * nettoyage des souscriptions aus données
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.killDelegate && this.killDelegate();
    this._unsubscribeUser && this._unsubscribeUser();
    this._unsubscribeImpressions();
    this._unsubscribeAddToCart();
    this.variantSubscribtionPool.forEach((elemToCancel) => elemToCancel());
    this.variantSubscribtionPool.length = 0;
    this.unsubscribeFacets && this.unsubscribeFacets();
  }

  /**
   * Permet de retouner le dataLayer à utilsier
   * @param shouldBeAsync : boolean permettant d'iundiquer si le traitement devrait être effectué sur la page d'après
   * @returns {*|{}|{}}
   */
  getDataLayer(shouldBeAsync = false) {
    window._uxa = window._uxa || [];
    return window._uxa;
  }

  launchScript() {
    const dataLayer = this.getDataLayer();

    if (typeof CS_CONF === 'undefined') {
      dataLayer.push([
        'setPath',
        window.location.pathname + window.location.hash.replace('#', '?__'),
      ]);
      const mt = document.createElement('script');
      mt.type = 'text/javascript';
      mt.async = true;
      mt.src = `//t.contentsquare.net/uxa/${this.tag_id}.js`;
      document.getElementsByTagName('head')[0].appendChild(mt);
    } else {
      dataLayer.push([
        'trackPageview',
        window.location.pathname + window.location.hash.replace('#', '?__'),
      ]);
    }
  }

  send_event(...args) {
    const dataLayer = this.getDataLayer();
    //  console.log("send_event args", args);
    dataLayer.push([...args]);
  }

  /**
   * Permet d'executer des trackings génériques pilotés par GTM-event-tracker
   */
  launchEventTracking() {
    // La liste des cibles écoutées dans la page
    const targets = ['a', 'button', 'input', '[gtm-event]', 'copy-clipboard'];

    // call des clicks sur les cibles ou l'un de leur enfants
    const checkClicks = (event) => {
      //  permet de retrouver l'élément cible (des fois on a un des noeuds enfants dans le event.target)
      let elem = getParentTarget(event.target, targets);
      if (!elem) return;

      // ceci permet de parser les event traqués
      const matchingResults = TrackingEvent._getClickers('CONTENTSQUARE', elem);

      // Si on a des "matches" on execute les callback
      if (matchingResults) {
        matchingResults.forEach(({ callback, async }) => {
          callback(elem, this.send_generic_event.bind(this));
        });
      }
    };

    const _grabNavigationClicks = () => {
      targets.forEach((target) => this.bodyDelegate.on('click', target, checkClicks, false));
    };

    // Execute les listeners sur les queries
    const _grabQueryParameters = () => {
      const params = getUrlParams();
      Object.entries(params).forEach(([paramName, paramValue]) => {
        const matchingResults = TrackingEvent._getQueries('CONTENTSQUARE', paramName);
        if (matchingResults)
          matchingResults.forEach(({ callback }) =>
            callback(paramValue, this.send_generic_event.bind(this)),
          );
      });
    };

    const _grabEvents = (event) => {
      const { source, ...rest } = event.detail;
      if (!source) return;

      const matchingResults = TrackingEvent._getEvents('CONTENTSQUARE', source);
      if (matchingResults)
        matchingResults.forEach(({ callback }) =>
          callback(rest, this.send_generic_event.bind(this)),
        );
    };

    // Lance les listener au DOMContentLoaded
    const onDomLoaded = () => {
      _grabNavigationClicks();
      _grabQueryParameters();
      this.bodyDelegate.on('gtm-event', 'body', _grabEvents.bind(this), false);
      window.removeEventListener('DOMContentLoaded', onDomLoaded);
    };
    window.addEventListener('DOMContentLoaded', onDomLoaded);
  }

  send_view_items(impressions) {
    if (!impressions) return;

    const completedImpressions = getCompletedImpressions(impressions, itemMapping);

    // envoi dans le datalayer
    completedImpressions.forEach(({ item_list_id, item_list_name, items }) => {
      //evite d'envoyer un event avec une liste vide !
      if (!items.length) return;

      if (isMainProduct(item_list_id)) {
        const price = parseFloat((items[0] ? items[0].price - items[0].discount : 0).toFixed(2));

        const { name, in_stock, id } = items[0];

        this.resolveProduct();
        this.send_event('setCustomVariable', 7, 'product_name', name, SCOPE_PAGE);

        this.send_event('setCustomVariable', 8, 'product_price', price.toString(), SCOPE_PAGE);

        this.send_event(
          'setCustomVariable',
          9,
          'product_in_stock',
          in_stock.toString(),
          SCOPE_PAGE,
        );

        this.send_event('setCustomVariable', 10, 'product_id', id.toString(), SCOPE_PAGE);
      }
    });
  }

  /**
   * Gestion des impressions
   * @param impressions
   */
  launchImpressions(impressions) {
    // récupère un delta des impressions et l'envoie à GTM
    let object;

    if (Object.keys(this.previousState).length === 0) {
      object = impressions;
    } else {
      object = getObjectDif(impressions, this.previousState);
    }
    this.send_view_items(object);
    this.resolveProduct();

    // Ecoute des changement de variants pour les product detail afin d'envoyer ne nouvelles impressions à chaque changement
    Object.entries(object).forEach(([key, value]) => {
      if (isMainProduct(key)) {
        const { handle } = value.impressions[0];
        this.variantSubscribtionPool.push(
          subscribeSelectedVariant(
            handle,
            (elem) => {
              this.send_event('trackPageview', `/product/${handle}?variant=${elem.id}`);
            },
            false,
          ),
        );
      }
    });

    // Stockage de l'état cumulé pour comparaison ultérieure
    this.previousState = Object.assign(this.previousState, object);
  }

  /**
   * Pushes a new page to the contensquare tracking with url parameters
   *
   * @return {void} This function does not return anything.
   */
  pushNewPage() {
    const acceptedParams = ['page', 'sort_by'];
    let search = document.location.search.replace('?', '');
    search = search
      .split('&')
      .map((e) => e.split('='))
      .filter(([name, value]) => !!value && (acceptedParams.includes(name) || /^filter/.test(name)))
      .map(([name, value]) => {
        // nettoyage des nom des filtres
        let key = name.split(/\./).pop();
        // renommage de sprix max / min
        if (key === 'lte') key = 'price_lte';
        if (key === 'gte') key = 'price_gte';
        if (/^filter/.test(name) && !/^filter/.test(key)) key = `filter_${key}`;
        return [key, value];
      })
      .map(([name, value]) => `${name}=${value}`)
      .join('&');

    this.send_event('trackPageview', `${document.location.pathname}?${search}`);
  }
  /**
   * Generates a facet tracking object based on the provided filter state.
   *
   * @param {Object} filterState - The state of the filters.
   * @return {void}
   */

  facetTracking(filterState) {
    const { filters, sort_by } = JSON.parse(JSON.stringify(filterState));

    // On prévoit d'annuler toutes les entrées précédentes
    const finalFilters = Object.fromEntries(
      Object.keys(this.previousFilters).map((filterName) => [filterName, null]),
    );

    // puis on récupère les filtres actuels
    const filterNames = Object.keys(filters).map((filterName) =>
      filterName.replace(/\.(?:lte|gte)$/g, ''),
    );
    // if (!filters.length) return;
    const dedupeFilters = [...new Set(filterNames)];
    const dedupeFiltersEntries = dedupeFilters.map((name, key) => [
      `filter${key ? key + 1 : ''}`,
      name,
    ]);

    dedupeFiltersEntries.push(['sort_by', sort_by]);

    // Enfin on les merge avec les entrées précédentes annulées
    Object.assign(finalFilters, Object.fromEntries(dedupeFiltersEntries));
    // on stocke pour le coup d'après
    this.previousFilters = JSON.parse(JSON.stringify(finalFilters));
    // et on envoie

    const search = Object.entries(finalFilters)
      .map(([key, value]) => {
        const name = value.split(/\./).pop();
        return `${key}=${name}`;
      })
      .join('&');

    this.send_event('trackPageview', `${document.location.pathname}?${search}`);
  }

  /**
   * Ru simples void trackings
   */
  runSimpleTrackings() {
    // newsletter
    new TrackingEvent(
      'CONTENTSQUARE',
      'news_subscribe',
      'click',
      '.newsletter__form button, .footer__newsletter-form button',
      (node, callback) => {
        PerishableEvents.setItem('news_subscribe', true);
      },
      true,
    );

    new TrackingEvent(
      'CONTENTSQUARE',
      'news_subscribe_confirm',
      'query',
      'customer_posted',
      (queryValue, callback) => {
        const footer_news = PerishableEvents.getItem('news_subscribe');
        if (footer_news) callback('trackPageEvent', 'subscribe_from_footer');
        PerishableEvents.deleteItem('news_subscribe');
      },
    );

    // Popin newsletter
    new TrackingEvent(
      'CONTENTSQUARE',
      'popup_subscription',
      'event',
      'theme_popup',
      (eventData, callback) => {
        if (!eventData.open) callback('trackPageEvent', 'popin_subscribtion_closed');
      },
    );

    new TrackingEvent(
      'CONTENTSQUARE',
      'popin_subscribe',
      'click',
      '.newsletter-modal__form button',
      (node, callback) => {
        PerishableEvents.setItem('popin_subscribe', true);
      },
      true,
    );

    new TrackingEvent(
      'CONTENTSQUARE',
      'popin_subscribe_confirm',
      'query',
      'customer_posted',
      (queryValue, callback) => {
        const popin_news = PerishableEvents.getItem('popin_subscribe');
        if (popin_news) callback('trackPageEvent', 'subscribe_from_popin');
        PerishableEvents.deleteItem('popin_subscribe');
      },
    );

    // announcement-bar
    new TrackingEvent(
      'CONTENTSQUARE',
      'announcement_bar_read',
      'click',
      ".announcement-bar button[data-action='open-content']",
      (node, callback) => {
        callback('trackPageEvent', 'announcement_bar_read');
      },
    );

    // announcement-bar
    new TrackingEvent(
      'CONTENTSQUARE',
      'announcement_bar_promo_code',
      'click',
      '.announcement-bar .nl-promocode__btn',
      (node, callback) => {
        callback('trackPageEvent', 'announcement_bar_promo_code');
      },
    );

    new TrackingEvent(
      'CONTENTSQUARE',
      'announcement_bar_navigate',
      'click',
      '.announcement-bar a.button button--primary',
      (node, callback) => {
        callback('trackPageEvent', 'announcement_bar_navigate');
      },
      true,
    );

    // Social
    new TrackingEvent(
      'CONTENTSQUARE',
      'share_button_click',
      'click',
      '.product-meta__share-button-item, .social-media__item li',
      (node, callback) => {
        const source =
          /product-meta__share-button-item--([^\s"]+)/.exec(node.className) ||
          /social-media__item--([^\s"]+)/.exec(node.className);
        if (!source) return;
        callback('trackDynamicVariable', {
          key: 'share_button_click',
          value: source[1],
        });
      },
      false,
    );

    // Aki dicount
    new TrackingEvent(
      'CONTENTSQUARE',
      'aki_discount_coupon_valid',
      'event',
      'aki-discount:coupon:valid',
      (eventData, callback) => {
        callback('trackDynamicVariable', {
          key: 'aki_discount_coupon_valid',
          coupon: eventData.coupon,
        });
      },
    );

    new TrackingEvent(
      'CONTENTSQUARE',
      'aki_discount_coupon_error',
      'event',
      'aki-discount:coupon:error',
      (eventData, callback) => {
        callback('trackDynamicVariable', {
          key: 'aki_discount_coupon_error',
          coupon: eventData.coupon,
        });
      },
    );
  }
  send_user_id({ id, action, user_data }) {
    switch (action) {
      case 'logout':
      case 'login':
      case 'sign_up':
        this.send_event('setCustomVariable', 2, 'user_logEvent', action, SCOPE_PAGE);
        break;
    }

    if (id) {
      this.send_event('setCustomVariable', 1, 'user_logged', (!!id).toString(), SCOPE_VISIT);
    }

    if (user_data) {
      this.send_event(
        'setCustomVariable',
        3,
        'user_newCustomer',
        user_data.new_customer?.toString(),
        SCOPE_VISIT,
      );

      this.send_event('setCustomVariable', 4, 'user_lastOrder', user_data.last_order, SCOPE_VISIT);

      this.send_event(
        'setCustomVariable',
        5,
        'user_numberOfOrders',
        user_data.orders_count.toString(),
        SCOPE_VISIT,
      );
    }

    this.resolveUser();
  }

  /**
   * Envoi de données génériquesn
   */
  send_generic_event(data = {}) {
    this.send_event(data);
  }

  send_add_to_cart(impression, node) {
    if (Object.keys(impression).length === 0) return;

    // const quantity = getQuantitySelectorValue(node);

    const completedImpressions = getCompletedImpressions(impression, itemMapping);

    // si on est  sur la page panier, les events doivent être enoyés en asyn
    const async = this.pageType === 'cart';

    // envoi dans le datalayer
    completedImpressions.forEach(({ items, item_list_id }) => {
      // La value prend en compte la quantité
      //   const value = parseFloat(
      //   (
      //      (items[0] ? items[0].price - items[0].discount : 0) * quantity
      //     ).toFixed(2)
      //   );
      // et on rajoute la quantité à la volée dans le datalayer
      //  items[0].quantity = quantity;
      const { sku, id, barcode } = items[0];
      this.send_event('ec:cart:add', {
        sku,
        id,
        //   barcode /* obligatoire - Product code (SKU) (string) */,
        // merchant: "merchant_name"  /* optionnel - Merchant name (string) */
      });

      this.send_event('trackPageEvent', `addToCart`);

      this.send_event('trackPageview', `add-to-cart?source=${item_list_id}&id=${id}`);
    });
  }

  waitForConsent(consentString) {
    try {
      const consent = typeof consentString === 'string' ? JSON.parse(consentString) : consentString;

      if (consent.ad_user_data === 'granted') {
        this.resolveConsent();
      } else {
        console.log('Contensquare not thrown because of consent');
      }
    } catch (e) {
      console.log('WARNING : consent mode not properly set for contentsquare');
      this.resolveConsent();
    }
  }

  //***************************************************************
  //**********************HELPERS**********************************
  //***************************************************************

  /**
   * Retourne un format identique à l'objet des impressions
   * @param list
   * @param impressions
   * @returns {{}}
   */
  static getFormattedImpression(list, impressions) {
    return {
      [list]: {
        list,
        impressions,
      },
    };
  }
};

window.customElements.define('contentsquare-catcher', ContentsquareCatcher);
export default ContentsquareCatcher;
