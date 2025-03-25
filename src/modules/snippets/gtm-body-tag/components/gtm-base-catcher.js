import CustomHTMLElement from '@/js/custom-element/common/custom-html-element';

import StorageArray from '@/js/helper/storage-array';
import StorageObject from '@/js/helper/storage-object';
import { subscribeUser } from '@/js/store/user';
import { getUrlParams } from '@/js/helper/location';
import { getParentTarget } from '@/js/helper/get-parent-target';

import Delegate from 'ftdomdelegate/main';
import TrackingEvent from '@/js/helper/trackingEvents';
import { getUser } from '@/js/store/user';
import { setCookie, getCookie, getCookieValuesStartingWith } from '@/js/helper/cookies';

const GTMBaseCatcher = class extends CustomHTMLElement {
  //***************************************************************
  //**********************LIFE CYCLE*******************************
  //***************************************************************

  constructor(props) {
    super(props);

    const defaultConsentAnalytics = this.getAttribute('default-consent-analytics') === 'true'; // default-t-analytics
    const defaultConsentAds = this.getAttribute('default-consent-ads') === 'true';

    this.defaultConsent = {
      ad_storage: defaultConsentAds ? 'granted' : 'denied',
      analytics_storage: defaultConsentAnalytics ? 'granted' : 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
    };

    this.gtm_tag_cdn = this.getAttribute('gtm_tag_cdn') || '';
    if (this.gtm_tag_cdn) {
      setCookie('gtm_tag_cdn', this.gtm_tag_cdn);
    }

    // Execute le listener sur les clicks
    this.bodyDelegate = this.bodyDelegate || new Delegate(document.body);
    this.killDelegate = () => {
      this.bodyDelegate.destroy();
    };

    this.currency = this.getAttribute('currency') || 'EUR';
    this.pageType = this.getAttribute('page-type') || '';
    const pageTitle = this.getAttribute('page-title') || '';
    this.prodId = this.hasAttribute('prodid') ? parseInt(this.getAttribute('prodid')) : null;
    const span = document.createElement('span');
    span.innerHTML = pageTitle;
    this.pageTitle = span.textContent;

    this.pagePath = this.getAttribute('page-path') || '';
    this.userIsSendable = this.hasAttribute('send-user-id');
    setCookie('gtm_user_is_sendable', this.userIsSendable.toString());

    this.sendAsync = this.hasAttribute('send-async');

    // on stocke les tags-id dans le storage pour le PIXEL
    this.gtm_tags = this.getAttribute('gtm-tags') || '';
    setCookie('gtm_tag_ids', this.gtm_tags);

    let _gaCookie;
    const gtm_forced_tag_session_id = this.getAttribute('gtm-forced-tag-session-id') || null;

    if (gtm_forced_tag_session_id) {
      const cookieName = gtm_forced_tag_session_id.replace(/G-/g, '_ga_');
      _gaCookie = getCookie(cookieName);
    }

    if (!_gaCookie) {
      _gaCookie = getCookieValuesStartingWith('_ga_')[0] || null;
    }
    if (_gaCookie) {
      const _gaValues = _gaCookie.split(/\./);
      this.sessionId = (_gaValues && _gaValues[2]) || null;
      if (this.sessionId) {
        setCookie('user_token', this.sessionId);
      }
    }

    // on stocke l'url dans le storage pour le PIXEL
    const script_url = this.getAttribute('script-url') || '';
    window.localStorage.setItem('gtm_script_url', script_url);
    setCookie('gtm_script_url', script_url);
  }

  get syncStorage() {
    window.dataLayer = window.dataLayer || [];

    // Si les évènements doivent être propagés vers le Pixel, on écoute les changement sur le datalayer que l'on propage à onDataLayerPush
    if (this.send_to_pixel) {
      const raiseEvent = this.onDataLayerPush.bind(this);

      try {
        Object.defineProperty(window.dataLayer, 'push', {
          configurable: true,
          enumerable: false,
          writable: true, // Previous values based on Object.getOwnPropertyDescriptor(Array.prototype, "push")
          value: function (...args) {
            let result = Array.prototype.push.apply(this, args); // Original push() implementation based on https://github.com/vuejs/vue/blob/f2b476d4f4f685d84b4957e6c805740597945cde/src/core/observer/array.js and https://github.com/vuejs/vue/blob/daed1e73557d57df244ad8d46c9afff7208c9a2d/src/core/util/lang.js

            raiseEvent(...args);

            return result; // Original push() implementation
          },
        });
      } catch (e) {}
    }

    return window.dataLayer;
  }

  get putConsentMode() {
    return this.hasAttribute('put-consent-mode');
  }

  get send_to_pixel() {
    return this.hasAttribute('send-to-pixel') && window?.Shopify?.analytics;
  }

  async init() {
    // Si on est full pixel, on doit envoyer le consent
    if (this.putConsentMode && this.send_to_pixel) {
      let consentMode = window.localStorage.getItem('consentMode');
      if (consentMode) {
        consentMode = JSON.parse(consentMode);

        this.send_event(
          (function () {
            return arguments;
          })('consent', 'default', {
            ...consentMode,
            wait_for_update: 500,
            __oz_event: true,
          }),
          false,
          false,
          false,
        );
      } else {
        this.send_event(
          (function () {
            return arguments;
          })('consent', 'default', {
            ...this.defaultConsent,
            wait_for_update: 500,
            __oz_event: true,
          }),
          false,
          false,
          false,
        );
      }
    }

    this.userData = this.grab_user_data(getUser());

    const visit = window.visitData ? window.visitData.get() : {};
    this.env = {
      country: window?.themeVariables?.settings?.currentLocalization,
      langage: window?.themeVariables?.data?.lang,
      site_name: window?.themeVariables?.data?.shop,
      currency: window?.themeVariables?.settings?.cartCurrency,
      ...visit,
    };

    let resetObject = {};

    this.return_back_event = this.return_back_event.bind(this);
    window.addEventListener('message', this.return_back_event);

    // on créé le nouveau contexte de cette page
    const initLayer = {
      pagePath: this.pagePath,
      pageTitle: this.pageTitle,
      pageType: this.pageType,
      ...visit,
    };

    if (this.prodId) initLayer.prodid = this.prodId;

    if (this.putConsentMode) {
      this.bodyDelegate.on('google-consent', 'body', this.send_consent_mode.bind(this));
    }

    // On pousse la page vue
    this.send_event({
      event: 'page_view',
      ...resetObject,
      ...initLayer,
      __oz_event: true,
    });

    // le env
    this.send_event(
      {
        event: 'env',
        ...this.env,
      },
      false,
      false,
    );

    //  le suser
    this.send_user_id();

    // le consent-ready
    if (window.sessionStorage) {
      // on vérifie si l'update du consent a déjà été lancé
      this.consentIsReady = window.themeVariables.consent.ready;

      if (this.putConsentMode) {
        const storageConsent = window.localStorage.getItem('consentMode');
        const consent = storageConsent ? JSON.parse(storageConsent) : this.defaultConsent;

        if (this.consentIsReady) {
          this.send_event({
            event: 'consent-ready',
            consent,
          });
        } else {
          this.waitingConsentStorage = [];
          const consentReady = (event) => {
            this.consentIsReady = true;

            this.send_event({
              event: 'consent-ready',
              consent,
            });

            // Envoi des events stawués jusqu'au consent
            if (this.waitingConsentStorage.length) {
              this.send_event(...this.waitingConsentStorage);
              this.waitingConsentStorage.length = 0;
            }

            window.removeEventListener('oz-consent:ready', consentReady);
          };

          window.addEventListener('oz-consent:ready', consentReady);
        }
      }
      // On récupère les données de la page précédente si existantes et on les traite
      const asyncDataLayerStorage = sessionStorage.getItem('asyncDataLayer');
      const previousContext = JSON.parse(sessionStorage.getItem('previousContext') || '{}');

      if (asyncDataLayerStorage) {
        const asyncDataLayer = JSON.parse(asyncDataLayerStorage);

        // les données du dataLayer basique sont enrichies avec les évènement de contextes qui ne sont - du coup - plus dans la page
        const extendedItems = asyncDataLayer.map((item) => ({
          ...previousContext,
          ...item,
        }));

        this.send_event(...extendedItems);

        // on prévoit de réinitialiser le contexte
        resetObject = Object.fromEntries(Object.keys(previousContext).map((key) => [key, null]));
        if (extendedItems.length) resetObject.ecommerce = null;
      }
    }

    this.launchEventTracking();

    // Préparation des cas aynchrones
    if (!this.sendAsync) return;

    // Et on lance le stockage du nouveau contexte
    this.asyncStorage = new StorageArray('asyncDataLayer');
    this.asyncContext = new StorageObject('previousContext');

    this.asyncContext.set(initLayer);

    return true;
  }

  /**
   * Fonction de vérification des évènements poyssé au datalayer, sur la base d'éléments
   * potentiellement écoutés via des TrackingEvents de type "datalayer"
   * @param args
   */
  onDataLayerPush(...args) {
    const callbackFn = (event) => this.propagateEventToPixel(event, false);

    const matchingResults = TrackingEvent._getDatalayers('GTM');

    if (!matchingResults) return;

    args.forEach((arg) => {
      if (typeof arg === 'object' && arg.event) {
        const match = matchingResults.find((model) => {
          const reg =
            typeof model.target === 'string' ? new RegExp(model.target, 'g') : model.target;
          return reg.test(arg.event);
        });

        if (match) {
          match.callback(arg, callbackFn);
        }
      }
    });
  }

  /**
   * Souscriptions aus données
   */
  async connectedCallback() {
    if (window._isLightHouse) {
      return;
    }

    await this.init();
    this._unsubscribeUser = subscribeUser(this.lister_user.bind(this), false);
  }

  /**
   * nettoyage des souscriptions aus données
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.killDelegate && this.killDelegate();
    this._unsubscribeUser && this._unsubscribeUser();
  }

  /**
   * Permet de retouner le dataLayer à utilsier
   * @param shouldBeAsync : boolean permettant d'iundiquer si le traitement devrait être effectué sur la page d'après
   * @returns {*|{}|{}}
   */
  getDataLayer(shouldBeAsync = false) {
    if (shouldBeAsync && this.sendAsync) {
      return this.asyncStorage;
    }
    if (this.putConsentMode && this.waitingConsentStorage && !this.consentIsReady) {
      return this.waitingConsentStorage;
    }

    return this.syncStorage;
  }

  //***************************************************************
  //******************ENVOI DES EVENTS GTM*************************
  //***************************************************************

  send_event(event, shouldBeAsync = false, withGlobalData = true, throw_tag = true) {
    const dataLayer = this.getDataLayer(shouldBeAsync);
    //gestion des objets enrichis avec le contexte
    const eventObject =
      withGlobalData && event?.event
        ? {
            ...event,
            user_data: this.userData?.user_data,
            env: this.env,
            session_id: this.sessionId,
          }
        : {
            ...event,
          };

    // cas d'implémentation full pixel
    if (this.send_to_pixel) {
      const eventData = {
        tag_url: this.gtm_tag_cdn,
        gtm_tags: this.gtm_tags,
        throw_tag,
      };
      // Cas des arguments (NB : On a pas besoin de l'eventObject)
      if (Array.isArray(event) || event.length) {
        eventData.is_arguments = true;
        eventData.arguments_data = [...event];
      }
      // Cas des évènements standards
      else {
        eventData.data = { ...eventObject };
      }

      window.Shopify.analytics.publish('TOZ_custom', eventData);
    }
    // cas d'implélmentation dans le storefront
    else {
      dataLayer.push(eventObject);
    }
  }

  /*
    Propoage un objet vers le Pixel
   */
  propagateEventToPixel(event = {}, throw_tag) {
    // cas d'implémentation full pixel

    const eventData = {
      tag_url: this.gtm_tag_cdn,
      gtm_tags: this.gtm_tags,
      throw_tag,
      data: { ...event },
    };

    window.Shopify.analytics.publish('TOZ_custom', eventData);
  }

  /**
   * Permet de faire remonter des évèncmeent depuis le Pixel
   */
  return_back_event(event) {
    if (!event.data.event) return;

    const dataLayer = this.getDataLayer(false);
    dataLayer.push(event.data);
  }

  grab_user_data({ encoded_id, action, user_data }) {
    if (this.sendAsync) this.asyncContext.set({ user_id: id });

    const data = {
      user_id: encoded_id || null,
      session_id: this.sessionId,
    };

    if (user_data) {
      const { name_sha256, email_sha256, email_md5, new_customer, ...rest } = user_data;

      data.user_name_sha256 = name_sha256;
      data.user_email_sha256 = email_sha256;
      data.user_email_md5 = email_md5;
      data.new_customer = new_customer;

      if (this.userIsSendable && user_data) {
        Object.assign(data, rest);
      }
    }
    return {
      user_data: data,
      action,
    };
  }

  lister_user({ encoded_id, action, user_data }) {
    this.userData = this.grab_user_data({ encoded_id, action, user_data });
    this.send_user_id();
  }

  send_user_id() {
    if (this.sendAsync) this.asyncContext.set({ user_id: id });

    const { user_data, action } = this.userData;

    switch (action) {
      case 'logout':
        this.send_event(
          {
            event: 'logout',
            ...user_data,
          },
          false,
          false,
        );
        break;
      case 'login':
        this.send_event(
          {
            event: 'login',
            ...user_data,
          },
          false,
          false,
        );
        break;
      case 'sign_up':
        this.send_event(
          {
            event: 'sign_up',
            ...user_data,
          },
          false,
          false,
        );
        break;
    }

    this.send_event(user_data, false, false);
  }

  /**
   * Envoi de données génériquesn
   */
  send_generic_event(data = {}) {
    if (data.ecommerce) this.send_event({ ecommerce: null });
    this.send_event(data);
  }

  /**
   * Envoi de données génériques asynchrones
   */
  send_generic_event_async(data = {}) {
    if (data.ecommerce) dataLayer.push({ ecommerce: null });
    this.send_event(data, true);
  }

  send_consent_mode(event = {}) {
    if (!this.putConsentMode) return;

    let consentMode = event.detail;
    if (!consentMode) return;

    const {
      ad_storage = this.defaultConsent.ad_storage,
      analytics_storage = this.defaultConsent.analytics_storage,
      ad_user_data = this.defaultConsent.ad_user_data,
      ad_personalization = this.defaultConsent.ad_personalization,
      disable_datalayer_event = false,
    } = consentMode;

    consentMode = {
      ...this.defaultConsent,
      ad_storage,
      analytics_storage,
      ad_user_data,
      ad_personalization,
      personalization_storage: ad_personalization
        ? ad_personalization
        : this.defaultConsent.personalization_storage,
    };

    const stringConsentMode = JSON.stringify(consentMode);
    const previsouConsentMode = window.localStorage.getItem('consentMode');

    if (this.consentIsReady && stringConsentMode === previsouConsentMode) return;
    window.localStorage.setItem('consentMode', JSON.stringify(consentMode));

    this.consentIsReady = true;
    // On ne met pas l'évènement dans le datalayer si on est dans une configuration standard ET que l'évenement est déjà remonté par la CMP.
    // En revanche on le relai dans le cas d'une implémentation full pixel
    if (this.send_to_pixel || !disable_datalayer_event) {
      this.send_event(
        (function () {
          return arguments;
        })('consent', 'update', {
          ...consentMode,
          __oz_event: true,
        }),
        false,
        false,
      );
    }
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
      const matchingResults = TrackingEvent._getClickers('GTM', elem);

      // Si on a des "matches" on execute les callback
      if (matchingResults) {
        matchingResults.forEach(({ callback, async }) =>
          callback(
            elem,
            async ? this.send_generic_event_async.bind(this) : this.send_generic_event.bind(this),
          ),
        );
      }
    };

    const _grabNavigationClicks = () => {
      targets.forEach((target) => this.bodyDelegate.on('click', target, checkClicks, false));
    };

    // Execute les listeners sur les queries
    const _grabQueryParameters = () => {
      const params = getUrlParams();
      let results = [];
      Object.entries(params).forEach(([paramName, paramValue]) => {
        const matchingResults = TrackingEvent._getQueries('GTM', paramName) || [];
        results.push(
          ...matchingResults.map((result) => ({
            ...result,
            paramValue,
            paramName,
          })),
        );
      });
      const whiteResults = TrackingEvent._getQueries('GTM', '') || [];
      results.push(...whiteResults.map((result) => result));
      results = [...new Set([...whiteResults, ...results])];

      results.forEach(({ callback, paramValue }) =>
        callback(paramValue, this.send_generic_event.bind(this)),
      );
    };

    const _grabEvents = (event) => {
      const { source, ...rest } = event.detail;
      if (!source) return;

      const matchingResults = TrackingEvent._getEvents('GTM', source);
      if (matchingResults)
        matchingResults.forEach(({ callback }) =>
          callback(rest, this.send_generic_event.bind(this)),
        );
    };

    // Lance les listener au DOMContentLoaded
    const init = () => {
      _grabNavigationClicks();
      _grabQueryParameters();
      this.bodyDelegate.on('gtm-event', 'body', _grabEvents.bind(this), false);
      window.removeEventListener('DOMContentLoaded', init);
    };
    window.addEventListener('DOMContentLoaded', init);
  }

  //***************************************************************
  //**********************HELPERS**********************************
  //***************************************************************

  static getMainProductd() {
    const pdt = document.querySelector('[list="product:main"]');
    return pdt?.getAttribute('data-product-id=') || null;
  }

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

export default GTMBaseCatcher;
