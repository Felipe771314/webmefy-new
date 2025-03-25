(() => {
  // lire les cookies
  const setShopifyConsent = (result) => {
    const categories = result?.consent?.categories;
    if (!categories) return;

    const detail = {
      analytics: categories[3]?.status === 'on',
      preferences: categories[5]?.status === 'on',
      marketing: categories[1]?.status === 'on',
      sale_of_data: false,
    };

    // Gère le consent Shopify
    window.dispatchEvent(
      new CustomEvent('shopify:consent:change', {
        bubbles: true,
        detail,
      }),
    );
  };

  const setConsent = (result) => {
    const categories = result?.consent?.categories;

    if (!categories) return;

    document.body.dispatchEvent(
      new CustomEvent('google-consent', {
        bubbles: true,
        detail: {
          ad_storage: categories[1]?.status === 'on' ? 'granted' : 'denied',
          analytics_storage: categories[3]?.status === 'on' ? 'granted' : 'denied',
          ad_user_data: categories[2]?.status === 'on' ? 'granted' : 'denied',
          ad_personalization: categories[5]?.status === 'on' ? 'granted' : 'denied',
          functionality_storage: categories[4]?.status === 'on' ? 'granted' : 'denied',
          personalization_storage: categories[5]?.status === 'on' ? 'granted' : 'denied',
          security_storage: categories[6]?.status === 'on' ? 'granted' : 'denied',
        },
      }),
    );

    if (window?.Shopify?.customerPrivacy) {
      setShopifyConsent(result);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // récupération au démarrage
    cact('consent.get', setConsent);

    //récupération au changement
    cact('consent.onUpdate', setConsent);
  });

  //hack gestion du cas où l'objet Shopify n'est pas charge
  document.addEventListener('consent:loaded', () => {
    cact('consent.get', setShopifyConsent);

    window.dispatchEvent(
      new CustomEvent('oz-consent:ready', {
        bubbles: true,
        detail: {
          provider: 'trustcommander',
        },
      }),
    );
  });
})();
