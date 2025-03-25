import customHtmlElement from '@/js/custom-element/common/custom-html-element';
import { getParentTarget } from '@/js/helper/get-parent-target';
import { subscribeUser } from '@/js/store/user';
import {
  addNewAkiCoupon,
  getActiveAkiCoupons,
  getNewAkiCoupon,
  resetNewAkiCoupon,
  setActiveAkiCoupons,
} from '@/js/store/aki-coupon-store';
import { setCartContent, subscribeCartContent } from '@/js/store/cart';
import { triggerEvent } from '@/js/helper/event';
import { debounce } from '@/js/helper/debouncers';

// Hack : GTM event is debounced
//  Component will be displayed twice when running on mini-cart
// Because component reacts to cart-change, so this will relaunch rendering
// ANd at the same time, the full zone is replaced by cart drawer.
const sendGTMEvent = debounce((status, newCoupon) => {
  triggerEvent(document.body, 'gtm-event', {
    coupon: newCoupon,
    source: `aki-discount:coupon:${status}`,
  });
}, 500);

class AkiCoupon extends customHtmlElement {
  constructor() {
    super();

    this.inputLabel = this.getAttribute('translation-label');
    this.submitLabel = this.getAttribute('translation-submit');
    this.validationMessage = this.getAttribute('translation-validation');
    this.forceLogin = this.hasAttribute('force-login');
    try {
      this.errorMessages = JSON.parse(
        (this.getAttribute('translation-error-messages') || '{}').replaceAll('=>', ':'),
      );
    } catch (e) {
      this.errorMessages = {};
    }
    this.errorMessageDefault = this.getAttribute('translation-error');
    this.connectText = this.getAttribute('translation-connect') || '';
    this.needConnectionMessage = (this.getAttribute('translation-need-connection') || '').replace(
      /\{\{\s*?connect\s*?\}\}/,
      `<a href="/account/login">${this.connectText}</a>`,
    );
    this.icons = {
      error: this.getTemplate('template[error-icon]'),
      success: this.getTemplate('template[success-icon]'),
      close: this.getTemplate('template[close-icon]'),
    };
  }

  connectedCallback() {
    this.unsubscribeCart = subscribeCartContent(this.updateCoupons.bind(this), true);

    this.unsubscribeUser = subscribeUser(this.userCallback.bind(this), true);

    this.delegate.on('click', 'button', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const value = this.querySelector('[name="coupon"]').value;
      if (value) this.submitCoupon(value, event.target);
      else {
        let elem = getParentTarget(event.target, 'button');
        if (elem) elem.removeAttribute('aria-busy');
      }
    });

    this.delegate.on('click', '[aki-remove]', (event) => {
      let elem = getParentTarget(event.target, '[aki-remove]');
      let index = parseInt(elem.getAttribute('[aki-remove]') || 0);
      this.removeCoupon(index);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeCart();
    this.unsubscribeUser();
  }

  userCallback({ id }) {
    this.userId = id;
    this.renderForm();
  }

  get message() {
    const coupon = getNewAkiCoupon() || this.notConsumableCouponCode;
    if (!coupon) {
      return null;
    }

    if (this.error) {
      // get error message
      const errorMessage = this.errorMessages[this.error] || this.errorMessageDefault;

      return errorMessage
        .replace(/\{\{\s*?coupon\s*?\}\}/, `<span class="aki-coupon__badge">${coupon}</span>`)
        .replace(/\{\{\s*?connect\s*?\}\}/, `<a href="/account/login">${this.connectText}</a>`);
    }

    if (this.valid)
      return this.validationMessage.replace(
        /\{\{\s*?coupon\s*?\}\}/,
        `<span class="aki-coupon__badge">${coupon}</span>`,
      );
    if (!this.userId && this.forceLogin) return this.needConnectionMessage;
    return null;
  }

  get status() {
    if (this.error) return 'error';
    if (this.valid) return 'success';
    if (!this.userId) return '';
  }

  renderForm() {
    this.locked = this.forceLogin && !this.userId;
    this.coupons = getActiveAkiCoupons();
    this.innerHTML = this.render();
  }

  reset() {
    this.valid = false;
    this.error = false;
    resetNewAkiCoupon();
  }

  /**
   * Récupère les coupons de l'objet panier et met à jour le status
   * @param cart
   */
  updateCoupons(cart) {
    this.notConsumableCouponCode = null;
    const coupons = cart.aki_coupons;
    const all_coupons = cart.aki_all_coupons;

    if (!coupons || !all_coupons) return;
    const filteredCoupons = coupons.map(({ code }) => code);

    setActiveAkiCoupons(filteredCoupons);

    const newCoupon = getNewAkiCoupon();
    if (newCoupon) {
      const couponReference = cart.aki_all_coupons.find(({ code }) => code === newCoupon);

      if (!couponReference) {
        this.error = true;
        sendGTMEvent('error', newCoupon);
      } else {
        if (couponReference?.consumable?.isConsumable) {
          sendGTMEvent('valid', newCoupon);
          this.valid = true;
        } else {
          this.error = couponReference?.consumable?.reason;
          sendGTMEvent('error', newCoupon);
        }
      }
    } else {
      const notConsumableCoupon = cart.aki_all_coupons.find(
        ({ consumable: { isConsumable } }) => isConsumable === false,
      );
      if (notConsumableCoupon) {
        this.error = notConsumableCoupon?.consumable?.reason;
        this.notConsumableCouponCode = notConsumableCoupon.code;
        sendGTMEvent('error', notConsumableCoupon.code);
      }
    }
    this.renderForm();
  }

  /**
   * Stocke la nouvelle valeur du coupon à challenger (qui sera ajoutée par le cartMutator)
   */
  async submitCoupon(value, target) {
    this.reset();

    addNewAkiCoupon(value);
    await this.relaunchCart();
  }

  async relaunchCart() {
    // hack relance le panier
    const cartContent = await (
      await fetch(`${window.themeVariables.routes.cartUrl}.js`, {
        cache: 'reload',
      })
    ).json();
    setCartContent(cartContent);
  }

  /**
   * Supprime le coupon de l'affichage et met à jour le store pour les prochaines requetes
   * @param index
   */
  async removeCoupon(index) {
    this.reset();
    const coupons = [...getActiveAkiCoupons()];
    coupons.splice(index, 1);

    setActiveAkiCoupons(coupons);
    await this.relaunchCart();
  }

  getIcon(status = 'error') {
    return this.icons[status] || this.icons.error;
  }

  render() {
    return `
              <div class="wrapper">
                <div class="input">
                  <input
                    type="text"
                    id="aki-coupon"
                    class="input__field"
                    name="coupon"      
                    ${this.locked ? 'disabled' : ''}
                    ${
                      this.message &&
                      `
                      aria-invalid="true" 
                      aria-describedby="coupon-form-error"
                     `
                    }
                     >
                     <label for="aki-coupon"  class="input__label"  >       
                        ${this.inputLabel}             
                     </label>
                </div>
                <button 
                  type="submit" 
                  is="loader-button" 
                  class="form__submit button button--secondary button--small"
                  ${this.locked ? 'disabled' : ''}
                >
                     ${this.submitLabel}
                </button>
            </div>
            ${
              this.message
                ? `
                <div class="banner${
                  this.status ? ` banner--${this.status}` : ''
                }" id="coupon-form-error">
                    <span class="banner__ribbon">${this.getIcon(this.status)}</spanclass>
                    <p class="banner__content">${this.message}</p>
                 </div>
                `
                : ``
            }
            ${
              this.coupons.length
                ? ` <ul class="aki-coupon__coupons">
                     ${this.coupons.map(
                       (coupon, key) => `
                         <li class="aki-coupon__coupon" aki-remove="${key}">
                         ${this.getIcon('close')} 
                        <span>${coupon}</span>
                        </li>
                         `,
                     )}
                    </ul> `
                : ``
            }
            
        `;
  }
}

window.customElements.define('aki-coupon', AkiCoupon);
export default AkiCoupon;
