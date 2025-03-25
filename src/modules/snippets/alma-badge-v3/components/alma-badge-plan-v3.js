import ProductHTMLElement from '@/js/custom-element/common/product-html-element';
import { getProductPriceData } from '@/js/store/products';

/* Alma Widget documentation
https://github.com/alma/widgets/blob/master/documentation.md
 */
class AlmaBadgeV3 extends ProductHTMLElement {
  watchVariant = true;
  watchProductData = true;

  constructor() {
    super();
    this._initAlmaWidget();
  }

  get merchantId() {
    return this.getAttribute('merchant-id');
  }

  get hideIfNotEligible() {
    return this.hasAttribute('hide-if-not-eligible');
  }

  get monochrome() {
    return this.hasAttribute('monochrome');
  }

  get hideBorder() {
    return this.hasAttribute('hide-border');
  }

  get cards() {
    return (this.getAttribute('cards') || '').split(',');
  }

  get suggestedPaymentPlan() {
    return this.hasAttribute('suggested-payment-plan')
      ? parseInt(this.getAttribute('suggested-payment-plan'))
      : undefined;
  }

  get plans() {
    let plans;

    try {
      if (this.hasAttribute('plans')) {
        plans = JSON.parse(this.getAttribute('plans'));
      }
    } catch (e) {
      console.error(e);
    }

    return plans;
  }

  onProductDataChanged({ product, variant }) {
    const { price } = getProductPriceData(this.productHandle, variant?.id);
    this._updateAlmaBadge({ purchaseAmount: price });
  }

  onVariantChanged({ variant }) {
    const { price } = getProductPriceData(this.productHandle, variant.id);
    this._updateAlmaBadge({ purchaseAmount: price });
  }

  _initAlmaWidget() {
    this.widgets = Alma.Widgets.initialize(
      this.merchantId, // your marchant ID, not API Key
      Alma.ApiMode.LIVE, // API mode (LIVE or TEST)
    );
  }

  _updateAlmaBadge({ purchaseAmount }) {
    // update alma widget only if price change
    if (purchaseAmount !== this.purchaseAmount) {
      this.purchaseAmount = purchaseAmount;
      this.widgets.add(Alma.Widgets.PaymentPlans, {
        container: '#alma-badge-v3',
        purchaseAmount: this.purchaseAmount,
        hideIfNotEligible: this.hideIfNotEligible,
        monochrome: this.monochrome,
        hideBorder: this.hideBorder,
        suggestedPaymentPlan: this.suggestedPaymentPlan,
        cards: this.cards,
        locale: window.themeVariables.data.lang,
        plans: this.plans,
      });
    }
  }
}
window.customElements.define('alma-badge-v3', AlmaBadgeV3);

export default AlmaBadgeV3;
