(function (document) {
  const selectors = {
    form: '[data-customer-information-form="true"]',
    addressFields: '[data-address-fields]',
    privacyPolicyField: '[data-privacy-policy-field]',
    privacyPolicyInput: '[data-privacy-policy-input]',
    submitBtn: '[type="submit"], .step__footer__continue-btn',
    checkoutAlmaWording: '[data-checkout-alma-wording]',
    orderSummarySection: '.sidebar .order-summary__sections',
  };

  const toggleDisabledBtn = function (buttons, disabled) {
    buttons.forEach((btn) => {
      if (disabled) {
        btn.removeAttribute('disabled');
      } else {
        btn.setAttribute('disabled', '');
      }
    });
  };

  const checkout = function () {
    if (
      Shopify &&
      Shopify.hasOwnProperty('Checkout') &&
      Shopify.Checkout.step === 'contact_information'
    ) {
      const form = document.querySelector(selectors.form);
      if (!form) {
        return;
      }
      const addressFields = form.querySelector(selectors.addressFields);
      const privacyPolicyField = form.querySelector(selectors.privacyPolicyField);
      const privacyPolicyInput = form.querySelector(selectors.privacyPolicyInput);
      let submitBtn = form.querySelectorAll(selectors.submitBtn);
      if (
        !addressFields ||
        !privacyPolicyField ||
        !privacyPolicyInput ||
        !submitBtn ||
        !submitBtn.length
      ) {
        return;
      }

      addressFields.parentElement.appendChild(privacyPolicyField);

      toggleDisabledBtn(submitBtn, privacyPolicyInput.checked);

      privacyPolicyInput.addEventListener('change', () => {
        submitBtn = form.querySelectorAll(selectors.submitBtn);
        toggleDisabledBtn(submitBtn, privacyPolicyInput.checked);
      });
    }
  };

  const rgpdWording = function () {
    const rgpdText = document.querySelector('.rgpd-information');
    const newsletterCheckbox = document.querySelector('[data-buyer-accepts-marketing]');

    if (newsletterCheckbox) {
      newsletterCheckbox.appendChild(rgpdText);
      rgpdText.removeAttribute('hidden');
    }
  };

  const cartMessage = function () {
    const cartMsg = document.querySelector('.checkout-message');
    const orderSummary = document.querySelector('.order-summary__sections');

    if (orderSummary && cartMsg) {
      orderSummary.appendChild(cartMsg);
      cartMsg.removeAttribute('hidden');
    }
  };

  const callbackEvent = function () {
    checkout();
    rgpdWording();
    cartMessage();
  };

  document.addEventListener('page:load', callbackEvent);
  document.addEventListener('page:change', callbackEvent);
})(document);
