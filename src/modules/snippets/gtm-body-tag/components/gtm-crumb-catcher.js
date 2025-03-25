import { subscribeSelectedVariant } from '@/js/store/products';
import {
  subscribeAddToCart,
  subscribeImpressions,
  subscribeNavigation,
} from '@/js/store/impressions';

import { debounce } from '@/js/helper/debouncers';
import { subscribeCartDisplay } from '@/js/store/cart';
import { getMappedResults } from '@/js/helper/getMappedResults';
import { subscribeSearch } from '@/js/store/search';
import PerishableEvents from '@/js/helper/perishable-events';
import {
  cartMapping,
  itemMapping,
} from '@modules/snippets/gtm-body-tag/components/gtm-data-mapping';
import { subscribeFilters } from '@/js/store/collection';

import GTMBaseCatcher from '@modules/snippets/gtm-body-tag/components/gtm-base-catcher';
import {
  getObjectDif,
  getCollectionList,
  getCompletedImpressions,
  isMainProduct,
  getCartDiscountCode,
  getQuantitySelectorValue,
} from '@/js/helper/trackingHelpers';
import TrackingEvent from '@/js/helper/trackingEvents';
import { getBreadcrumb } from '@/js/store/breadcrumb';

const GTMCrumbCatcher = class extends GTMBaseCatcher {
  //***************************************************************
  //**********************LIFE CYCLE*******************************
  //***************************************************************

  constructor(props) {
    super(props);
    this.previousState = {};
    this.previousFilters = {};
  }

  /**
   * Souscriptions aus données
   */
  async connectedCallback() {
    await super.connectedCallback();

    if (window._isLightHouse) {
      return;
    }

    // stacke les infos d'impressions
    this.getImpressions = debounce(this.launchImpressions.bind(this), 2000);
    this._unsubscribeImpressions = subscribeImpressions(this.getImpressions, true);

    switch (this.pageType) {
      case 'collection':
        this.unsubscribeFacets = subscribeFilters(this.facetTracking.bind(this));
        this.throwCollectionEvent();
        break;
      case 'product':
        this.unsubscribeFacets = subscribeFilters(this.facetTracking.bind(this));
        this.throwCollectionEvent();
        break;
      case 'search':
        this.unsubscribeFacets = subscribeFilters(this.facetTracking.bind(this));
    }

    this._unsubscribeNavigation = subscribeNavigation(this.send_select_content.bind(this));
    this._unsubscribeAddToCart = subscribeAddToCart(this.send_add_to_cart.bind(this));
    this._unsubscribeSearch = subscribeSearch(this.send_search.bind(this));

    this._unsubscribeCartDisplay = subscribeCartDisplay(this.send_view_cart.bind(this), true);

    if (window.sessionStorage) {
      this.previousCart = JSON.parse(sessionStorage.getItem('gtm-cart') || '{}');
    }
    this.unsubscribeCart = subscribeCartDisplay(this.manage_cart_suppressions.bind(this), true);

    this.runSimpleTrackings();

    // créé un pool de fonction à nettoyer
    this.variantSubscribtionPool = [];
  }

  /**
   * nettoyage des souscriptions aus données
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeImpressions();
    this._unsubscribeNavigation();
    this._unsubscribeAddToCart();
    this.variantSubscribtionPool.forEach((elemToCancel) => elemToCancel());
    this.variantSubscribtionPool.length = 0;
    this._unsubscribeCartDisplay();
    this._unsubscribeSearch();
    this.unsubscribeCart();
    this.unsubscribeFacets && this.unsubscribeFacets();
  }

  throwCollectionEvent() {
    const breadcrumbs = getBreadcrumb() || [];
    if (breadcrumbs.length) {
      const breadcrumb = Object.fromEntries(
        breadcrumbs.map((item, key) => [`category_lvl${key + 1}`, item.name.trim()]),
      );

      const currentCat = breadcrumbs[breadcrumbs.length - 1];

      this.send_event({
        event: 'view_collection',
        ecommerce: {
          currency: this.currency,
          name: currentCat && currentCat.name,
          id: document.querySelector('[data-collection-id]')?.getAttribute('data-collection-id'),
          ...breadcrumb,
        },
      });
    }
  }

  manage_cart_suppressions(cart) {
    const items = (cart.items || []).map(
      (
        { id, price, compare_at_price, variant_title, product_title, handle, quantity },
        position,
      ) => ({
        id,
        position,
        price,
        compare_at_price,
        variant_title,
        product_title,
        handle,
        quantity,
      }),
    );

    if (Object.keys(this.previousCart).length) {
      const dif = this.previousCart.reduce((delta, item) => {
        if (!items.find((pdt) => pdt.id === item.id)) delta.push(item);
        return delta;
      }, []);

      if (dif.length) {
        this.send_remove_from_cart(dif, cart.zone);
      }
    }
    this.previousCart = items;
    if (window.sessionStorage) {
      sessionStorage.setItem('gtm-cart', JSON.stringify(items));
    }
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

    // Ecoute des changement de variants pour les product detail afin d'envoyer ne nouvelles impressions à chaque changement
    Object.entries(object).forEach(([key, value]) => {
      if (isMainProduct(key)) {
        const { handle } = value.impressions[0];
        this.variantSubscribtionPool.push(
          subscribeSelectedVariant(
            handle,
            () => {
              this.send_view_items(
                {
                  [key]: value,
                },
                'variant_selection',
              );
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
   * Tracking des filtres à facettes
   * @returns {(function(): void)|*}
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
      `collection_filter${key ? key + 1 : ''}`,
      name,
    ]);

    dedupeFiltersEntries.push(['collection_sort', sort_by]);

    // Enfin on les merge avec les entrées précédentes annulées
    Object.assign(finalFilters, Object.fromEntries(dedupeFiltersEntries));
    // on stocke pour le coup d'après
    this.previousFilters = JSON.parse(JSON.stringify(finalFilters));
    // et on envoie
    if (this.sendAsync) this.asyncContext.set(finalFilters);

    this.send_generic_event(finalFilters);
  }

  /**
   * Ru simples void trackings
   */
  runSimpleTrackings() {
    // newsletter
    new TrackingEvent(
      'GTM',
      'news_subscribe',
      'click',
      '.newsletter__form button',
      (node, GTMSend) => {
        PerishableEvents.setItem('news_subscribe', true);
      },
      true,
    );

    new TrackingEvent(
      'GTM',
      'news_subscribe_confirm',
      'query',
      'customer_posted',
      (queryValue, GTMSend) => {
        const footer_news = PerishableEvents.getItem('news_subscribe');
        if (footer_news)
          GTMSend({
            event: 'newsletter_subscribe',
          });
        PerishableEvents.deleteItem('news_subscribe');
      },
    );

    // Popin newsletter
    new TrackingEvent('GTM', 'popup_subscription', 'event', 'theme_popup', (eventData, GTMSend) => {
      if (!eventData.open)
        GTMSend({
          event: 'popin_closed',
        });
    });

    new TrackingEvent(
      'GTM',
      'popin_subscribe',
      'click',
      '.newsletter-modal__form button',
      (node, GTMSend) => {
        PerishableEvents.setItem('popin_subscribe', true);
      },
      true,
    );

    new TrackingEvent(
      'GTM',
      'popin_subscribe_confirm',
      'query',
      'customer_posted',
      (queryValue, GTMSend) => {
        const popin_news = PerishableEvents.getItem('popin_subscribe');
        if (popin_news)
          GTMSend({
            event: 'popin_subscribe',
          });
        PerishableEvents.deleteItem('popin_subscribe');
      },
    );

    // Product Photo swipe
    new TrackingEvent(
      'GTM',
      'product_photo_swipe',
      'event',
      'product_photo_swipe',
      (eventData, GTMSend) => {
        GTMSend({
          event: 'product_photo_swipe',
        });
      },
    );

    // Account recovering
    new TrackingEvent(
      'GTM',
      'account_recover',
      'click',
      "form[action='/account/recover'] button",
      (node, GTMSend) => {
        GTMSend({
          event: 'account_recover',
        });
      },
      true,
    );

    // announcement-bar
    new TrackingEvent(
      'GTM',
      'announcement_bar_read',
      'click',
      ".announcement-bar button[data-action='open-content']",
      (node, GTMSend) => {
        GTMSend({
          event: 'announcement_bar_read',
        });
      },
    );

    // announcement-bar
    new TrackingEvent(
      'GTM',
      'announcement_bar_promo_code',
      'click',
      '.announcement-bar .nl-promocode__btn',
      (node, GTMSend) => {
        GTMSend({
          event: 'announcement_bar_promo_code',
        });
      },
    );

    new TrackingEvent(
      'GTM',
      'announcement_bar_navigate',
      'click',
      '.announcement-bar a.button button--primary',
      (node, GTMSend) => {
        GTMSend({
          event: 'announcement_bar_navigate',
        });
      },
      true,
    );

    // Social
    new TrackingEvent(
      'GTM',
      'share_button_click',
      'click',
      '.product-meta__share-button-item',
      (node, GTMSend) => {
        const source = /product-meta__share-button-item--([^\s"]+)/.exec(node.className);
        if (!source) return;
        GTMSend({
          event: 'share_button_click',
          network: source[1],
        });
      },
      false,
    );

    // Form errors
    new TrackingEvent('GTM', 'form_error', 'event', 'form_error', (eventData, GTMSend) => {
      GTMSend({
        event: 'form_error',
        form: eventData.form,
      });
    });

    // swatches
    new TrackingEvent('GTM', 'oz_swatches', 'event', 'oz_swatches', (eventData, GTMSend) => {
      GTMSend({
        event: 'oz_swatches',
        handle: eventData.handle,
      });
    });

    // Aki discount
    new TrackingEvent(
      'GTM',
      'aki_discount_coupon_valid',
      'event',
      'aki-discount:coupon:valid',
      (eventData, GTMSend) => {
        GTMSend({
          event: 'aki_discount_coupon_valid',
          coupon: eventData.coupon,
        });
      },
    );

    new TrackingEvent(
      'GTM',
      'aki_discount_coupon_error',
      'event',
      'aki-discount:coupon:error',
      (eventData, GTMSend) => {
        GTMSend({
          event: 'aki_discount_coupon_error',
          coupon: eventData.coupon,
        });
      },
    );

    /*
    Exemple for tracking datalayer entries
    
    new TrackingEvent(
      "GTM",
      "unique_name",
      "datalayer",
      /your_regexp/g,
      (event, sendToPixel) => {
        sendToPixel(event);
      }
    );

     */
  }

  //***************************************************************
  //******************ENVOI DES EVENTS GTM*************************
  //***************************************************************

  send_search({ search_term }) {
    if (this.sendAsync) this.asyncContext.set({ search_term });

    if (search_term) {
      this.send_event({
        event: 'search',
        search_term,
      });
    }
  }

  /**
   * Envoi les données de view_item && view_tem_list
   * @param impressions
   */
  send_view_items(impressions, id_complement = '') {
    if (!impressions) return;

    const completedImpressions = getCompletedImpressions(impressions, itemMapping);

    // envoi dans le datalayer
    completedImpressions.forEach(({ item_list_id, item_list_name, items }) => {
      //evite d'envoyer un event avec une liste vide !
      if (!items.length) return;

      //NB : important pour faire un dataloyer propre.
      this.send_event({ ecommerce: null });

      if (isMainProduct(item_list_id)) {
        const value = parseFloat((items[0] ? items[0].price - items[0].discount : 0).toFixed(2));
        this.send_event({
          event: 'view_item',
          ecommerce: {
            currency: this.currency,
            value,
            item_list_name: `${item_list_name} ${id_complement}`,
            item_list_id: `${item_list_id}${id_complement ? ':' + id_complement : ''}`,
            items,
          },
        });
      } else {
        this.send_event({
          event: 'view_item_list',
          ecommerce: {
            currency: this.currency,
            item_list_name,
            item_list_id,
            items,
          },
        });
      }
    });
  }

  /**
   * Envoi les données de navigation
   * @param impressions
   */
  send_select_content(impression, elem, shouldBeAsync) {
    if (Object.keys(impression).length === 0) return;

    const completedImpressions = getCompletedImpressions(impression, itemMapping);

    // envoi dans le datalayer
    completedImpressions.forEach(({ item_list_id, item_list_name, items }) => {
      this.send_event({ ecommerce: null }, shouldBeAsync);
      this.send_event(
        {
          event: 'select_item',
          ecommerce: {
            currency: this.currency,
            item_list_name,
            item_list_id,
            items,
          },
        },
        shouldBeAsync,
      );
    });
  }

  send_add_to_cart(impression, node) {
    if (Object.keys(impression).length === 0) return;

    const quantity = getQuantitySelectorValue(node);

    const completedImpressions = getCompletedImpressions(impression, itemMapping);

    // si on est  sur la page panier, les events doivent être enoyés en asyn
    const async = this.pageType === 'cart';

    // envoi dans le datalayer
    completedImpressions.forEach(({ items, item_list_id, item_list_name }) => {
      // La value prend en compte la quantité
      const value = parseFloat(
        ((items[0] ? items[0].price - items[0].discount : 0) * quantity).toFixed(2),
      );
      // et on rajoute la quantité à la volée dans le datalayer
      items[0].quantity = quantity;

      this.send_event({ ecommerce: null }, async);
      this.send_event(
        {
          event: 'add_to_cart',
          ecommerce: {
            currency: this.currency,
            value,
            items,
            item_list_id,
            item_list_name,
          },
        },
        async,
      );
    });
  }

  send_remove_from_cart(delta, zone) {
    const completedImpressions = getMappedResults(
      delta.map((item) => ({ ...item, list: zone })),
      cartMapping,
    );

    // si on est  sur la page panier, les events doivent être enoyés en asyn
    const async = this.pageType === 'cart';

    // La value prend en compte la quantité
    const value = parseFloat(
      completedImpressions
        .reduce((total, item) => total + (item.price - item.discount) * item.quantity, 0)
        .toFixed(2),
    );

    this.send_event({ ecommerce: null }, async);
    this.send_event(
      {
        event: 'remove_from_cart',
        ecommerce: {
          currency: this.currency,
          value,
          items: completedImpressions,
        },
      },
      async,
    );
  }

  send_view_cart(cart) {
    if (!cart.items) return;

    const cartItems = cart.items.map((item, position) => {
      const categoryInfos = getCollectionList(item);

      return {
        ...item,
        ...categoryInfos,
        position,
        list: cart.zone,
      };
    });

    const items = getMappedResults(cartItems, cartMapping);

    const value = parseFloat((cart.total_price / 100).toFixed(2));

    const message = {
      event: 'view_cart',
      ecommerce: {
        currency: this.currency,
        value,
        items,
      },
    };

    const coupon = getCartDiscountCode(cart);
    if (coupon) message.ecommerce.coupon = coupon;

    // envoi dans le datalayer
    this.send_event({ ecommerce: null });
    this.send_event(message);
  }
};

window.customElements.define('gtm-crumb-catcher', GTMCrumbCatcher);
export default GTMCrumbCatcher;
