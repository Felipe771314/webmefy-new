import ProductHTMLElement from '@/js/custom-element/common/product-html-element';

class AlmaBadge extends ProductHTMLElement {
  get merchant() {
    return this.getAttribute('merchant-id');
  }
  watchVariant = true;

  onVariantChanged({ variant }) {
    this.widgets = Alma.Widgets.initialize(
      this.merchant, // your marchant ID, not API Key
      Alma.ApiMode.LIVE, // API mode (LIVE or TEST)
    );

    this.widgets.add(Alma.Widgets.PaymentPlans, {
      container: '#alma-badge',
      purchaseAmount: variant.price,
      transitionDelay: 5500,
      hideIfNotEligible: false,
      locale: 'fr',
      plans: [{ installmentsCount: 3, minAmount: 100, maxAmount: 200000 }],
    });
  }
}
window.customElements.define('alma-badge', AlmaBadge);

export default AlmaBadge;
