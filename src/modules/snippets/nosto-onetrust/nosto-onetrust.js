(() => {
  if (window._isLightHouse) {
    // cas lighthouse, nosto non lancé
    return;
  }

  window.addEventListener('oz-consent:ready', launchNosto);
  // Launch nosto
  if (window.OnetrustActiveGroups) {
    launchNosto();
  }

  function getLevelConsent() {
    return window?.OnetrustActiveGroups?.includes('C0004') || false;
  }

  function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie =
      cookieName +
      '=; Path=/; Domain=.' +
      document.location.hostname +
      '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  function launchNosto() {
    window.removeEventListener('oz-consent:ready', launchNosto);

    const consentMode = JSON.parse(window.localStorage.getItem('consentMode') || '{}');
    let consent = consentMode?.ad_storage === 'granted';

    window.nostojs = (fn) => {
      window.nostojs.q.push(fn);
    };
    window.nostojs.q = [];

    window.nostojs((nosto) => nosto.visit.setDoNotTrack(!consent));
    const script = document.createElement('script');
    // one trust ignore
    // attribute data-ot-ignore MUST BE SET BEFORE src
    script.setAttribute('data-ot-ignore', '');
    script.src = `https://connect.nosto.com/include/shopify-${window.themeVariables.data.shop_id}`;

    document.querySelector('head').appendChild(script);

    document.addEventListener('google-consent', (evt) => {
      const newconsent = evt.detail?.ad_storage === 'granted';

      if (consent === newconsent) {
        return;
      }

      consent = newconsent;

      if (!consent) {
        deleteCookie('nostojs');
        deleteCookie('2c.cId');
        deleteCookie('2c.dc');
        deleteCookie('2c.dId');
        deleteCookie('nostodev');
        deleteCookie('nostopreview');
      }

      window.nostojs((nosto) => nosto.visit.setDoNotTrack(!consent));
      window.nostojs((nosto) => nosto.loadRecommendations());
    });
  }
})();
