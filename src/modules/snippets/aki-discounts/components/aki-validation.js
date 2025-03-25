import { getCartContent, subscribeCartContent } from '@/js/store/cart';
import { getUser } from '@/js/store/user';
import { getActiveAkiCoupons, getActiveUserCoupons } from '@/js/store/aki-coupon-store';
import perishableEvents from '@/js/helper/perishable-events';
import { getPreviewUrl } from '@/js/store/aki-preview-store';
import fetchWithTimeout from '../../../../js/helper/fetchWithTimeout';
import item from '../../../sections/announcement-bar/components/item';

class AkiValidation extends HTMLButtonElement {
  constructor() {
    super();
    this.shop = window.themeVariables.data.shop;
  }
  connectedCallback() {
    const akiDiscountWc = document.querySelector('aki-discounts');
    this.ROOT_URL = akiDiscountWc.ROOT_URL;
    this.fetchTimeout = akiDiscountWc.fetchTimeout;
    this.goToDraftOrder = this.goToDraftOrder.bind(this);
    this._unsubscribeCartContent = subscribeCartContent(this._handleCartContent.bind(this), true);
    // On place un index élevé, car la redirection devrait être la dernière étape des vérifications
    setTimeout(() => {
      this.formElem && this.formElem.addSubmitCondition(this.goToDraftOrder, 10000);
      this.addedSubmitCondition = true;
      this._checkIfReadyToCheckout();
    }, 100);
  }

  _handleCartContent() {
    this._checkIfReadyToCheckout();
  }
  _checkIfReadyToCheckout() {
    const cartMutated = getCartContent().mutated;
    if (cartMutated && this.addedSubmitCondition) {
      this.removeAttribute('disabled');
    }
  }

  get formElem() {
    const formId = this.getAttribute('form');
    return document.getElementById(formId);
  }
  get loginMessage() {
    return this.getAttribute('translation-need-login') || '';
  }

  get useFunctions() {
    return this.hasAttribute('aki-functions');
  }

  get cartForm() {
    const form = this.getAttribute('form') || '';
    return document.getElementById(form);
  }

  disconnectedCallback() {
    this.formElem && this.formElem.removeSubmitCondition?.(10000);
  }

  replaceLock() {
    const lock = this.querySelector('.checkout-button__lock');

    if (!lock) return;

    lock.innerHTML = `<div class="spinner">
            <svg
              focusable="false"
              width="24"
              height="24"
              class="icon icon--spinner"
              viewBox="25 25 50 50"
            >
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor"
                      stroke-width="5"></circle>
            </svg>
        </div>`;
  }

  async goToDraftOrder(shouldSubmit) {
    // si le formulaire a été bloqué par un autre process, on ne fait rien
    if (!shouldSubmit) return false;

    this.replaceLock();

    let url = `${this.ROOT_URL}/order?shop=${this.shop}`;

    const currentCart = getCartContent();
    const discount_code = getActiveAkiCoupons();
    const user_coupons = getActiveUserCoupons();

    const original_line_items = JSON.parse(JSON.stringify(currentCart.items || [])); // L'objet d'origine est un snapshot

    //on répercute les quantités des produits splittés sur les id originaux
    original_line_items.forEach((item) => {
      if (!item.original_id) return;

      const original_id = original_line_items.find(
        (elem) => elem.id === item.original_id && !elem.original_id,
      );
      if (original_id) original_id.quantity += item.quantity;
    });

    const current_line_items = original_line_items
      .filter(({ is_goody, original_id }) => !is_goody && !original_id) // on filtre les élemnts qui seront re-générés par Aki
      .map(({ variant_id, quantity, id }) => ({
        id,
        variant_id,
        quantity,
      }));

    // si il n'y pa a de produit dans le panier, on ne continue pas
    if (!current_line_items.length) return false;

    const request = {
      date: new Date().toISOString(),
      line_items: current_line_items,
      discount_code,
    };
    const user = getUser();
    if (user && user.id) {
      // si on a l'utilsiateur, on le rajoute à la requête
      request.user_id = user.id;
    }
    if (currentCart.note) request.note = currentCart.note;

    const currentLocalization = window.themeVariables.settings.currentLocalization;
    const defaultLocalization = window.themeVariables.settings.defaultLocalization;
    if (currentLocalization !== defaultLocalization) {
      //  request.localization = currentLocalization;
      url += `&market=${currentLocalization.toUpperCase()}`;
      request.currency = window.themeVariables.settings.cartCurrency;
    }

    url += getPreviewUrl();

    if (!user || (!user.id && !!user_coupons.length)) {
      // si aucun utilisateur n'est connecté MAIS que l'on a aun coupon, il faut rediriger ver le login
      perishableEvents.setItem('login_message', this.loginMessage, 1);
      let rootUrl = window.themeVariables.routes.rootUrl;
      if (!/\/$/.test(rootUrl)) {
        rootUrl += '/';
      }
      document.location.assign(
        `${rootUrl}account/login?return_url=${window.themeVariables.routes.cartUrl}`,
      );
      // on retourne null pour bloquer le submit par défaut
      return null;
    }

    if (this.useFunctions) {
      const { cart_level_discount_applications, items, original_total_price, aki_coupons } =
        currentCart;

      // on envoie un cart "amaigri" pour économiser les ressources fonctions
      const functionCart = {
        cart_level_discount_applications,
        original_total_price,
        market: currentLocalization.toUpperCase(),
        aki_coupons,
        items: items.map(
          ({
            original_id,
            line_level_total_discount,
            final_price,
            line_level_discount_allocations,
            variant_id,
            is_goody,
            original_price,
            handle,
            quantity,
          }) => {
            return {
              original_id,
              line_level_total_discount: (original_price - final_price) * quantity, //hack : on envoie la différence pour régler les problèmes d'arrondis
              line_level_discount_allocations,
              variant_id,
              is_goody,
              original_price,
              handle,
              quantity,
            };
          },
        ),
      };
      await fetch(`${window.themeVariables.routes.cartUrl}/update.js`, {
        body: JSON.stringify({
          attributes: { aki_discounts: JSON.stringify(functionCart) },
        }),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    } else {
      const { location } = await fetchWithTimeout(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(request),
        timeout: this.fetchTimeout,
      })
        .then((res) => res.json())
        .catch(function (res) {
          return { location: null };
        });

      if (!location) {
        console.error(`[App Oz : AKI discount] Draftorder endpoint is down (url: ${url})`);
        // if we are on the published theme we skip the draft order
        // else show an error message and dont go to checkout
        if (window.Shopify?.theme?.role != 'main') {
          this.dispatchEvent(
            new CustomEvent('simple-notification:show', {
              bubbles: true,
              cancelable: true,
              detail: {
                status: 'error',
                message: '[App Oz : AKI discount] Draftorder endpoint is down',
              },
            }),
          );
          return false;
        }
        return true;
      }

      let redirectCheckout = location.replace(/^https:\/\/[^\/]+/, '');
      const lang = window.themeVariables.data.lang;
      if (lang) {
        redirectCheckout += `${redirectCheckout.indexOf('?') === -1 ? '?' : '&'}locale=${lang}`;
      }

      document.location.assign(redirectCheckout);
      // on retourne null pour bloquer le submit par défaut
      return null;
    }
  }
}

window.customElements.define('aki-validation', AkiValidation, {
  extends: 'button',
});

export default AkiValidation;
