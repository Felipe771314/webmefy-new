(() => {
  if (window._isLightHouse) {
    return;
  }

  let firstTime = true;

  const loadScript = ({ url, callback = null, trigger = null, params = {} } = {}) => {
    const s = document.createElement('script');
    s.src = url;
    s.async = true;

    Object.entries(params).forEach(([key, value]) => {
      s.setAttribute(key, value);
    });
    s.setAttribute('async', true);

    if (callback) {
      if (!trigger) {
        s.onload = callback;
        s.onerror = callback;
      } else {
        const loop = () => {
          if (window[trigger]) callback();
          else setTimeout(loop, 30);
        };

        s.onload = loop;
      }
    }
    document.querySelector('head').appendChild(s);
  };

  // Permet de récupérer les infos dans le datalyer onetrust pour els pousser dans le notre
  window.addEventListener('OneTrustGroupsUpdated', (event) => {
    if (window.otDataLayer && window.otDataLayer.length) {
      window.dataLayer.push(...window.otDataLayer);
      window.otDataLayer.length = 0;
    }
  });

  function loadMainScript() {
    loadScript({
      url: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
      params: {
        'data-document-language': 'true',
        charset: 'UTF-8',
        'data-domain-script': window.themeVariables.apps.onetrust_token,
        'data-dLayer-name': 'otDataLayer', // Il ne faut PAS que Onetrust  utilise le dataloyer car il l'écrase
        //  "data-dLayer-ignore": "true",
      },
      trigger: 'OneTrust',
      callback: () => {
        const event = new Event('onetrust-ready');
        document.dispatchEvent(event);

        window.dispatchEvent(
          new CustomEvent('oz-consent:ready', {
            bubbles: true,
            detail: {
              provider: 'onetrust',
            },
          }),
        );

        document.addEventListener('cookie:relaunch', () => {
          window?.OneTrust?.ToggleInfoDisplay();
        });
      },
    });
  }

  if (!window.themeVariables.apps.onetrust_no_autoblock) {
    loadScript({
      url: `https://cdn.cookielaw.org/consent/${window.themeVariables.apps.onetrust_token}/OtAutoBlock.js`,
      callback: loadMainScript,
    });
  } else {
    loadMainScript();
  }

  window.OptanonWrapper = () => {
    // Get initial OnetrustActiveGroups ids
    if (typeof OptanonWrapperCount === 'undefined') {
      otGetInitialGrps();
    }
    console.log('firsttime', firstTime);

    // Assign OnetrustActiveGroups to custom variable
    function otGetInitialGrps() {
      window.OptanonWrapperCount = '';
      window.otIniGrps = window.OnetrustActiveGroups;
    }

    // Gère le consent Shopify
    window.dispatchEvent(
      new CustomEvent('shopify:consent:change', {
        bubbles: true,
        detail: {
          analytics: !!window?.OnetrustActiveGroups?.includes('C0002'),
          preferences: !!window?.OnetrustActiveGroups?.includes('C0003'),
          marketing: !!window?.OnetrustActiveGroups?.includes('C0004'),
          sale_of_data: false,
        },
      }),
    );

    if (!firstTime) {
      // send event to GTM for google consent
      document.body.dispatchEvent(
        new CustomEvent('google-consent', {
          bubbles: true,
          detail: {
            ad_storage: !firstTime
              ? !!window?.OnetrustActiveGroups?.includes('C0004')
                ? 'granted'
                : 'denied'
              : undefined,
            analytics_storage: !firstTime
              ? !!window?.OnetrustActiveGroups?.includes('C0002')
                ? 'granted'
                : 'denied'
              : undefined,
            ad_user_data: !firstTime
              ? !!window?.OnetrustActiveGroups?.includes('C0004')
                ? 'granted'
                : 'denied'
              : undefined,
            ad_personalization: !firstTime
              ? !!window?.OnetrustActiveGroups?.includes('C0003')
                ? 'granted'
                : 'denied'
              : undefined,
          },
        }),
      );
    }

    firstTime = false;

    function otDeleteCookie(iniOptGrpId) {
      const otDomainGrps = JSON.parse(JSON.stringify(window.Optanon.GetDomainData().Groups));
      const otDeletedGrpIds = otGetInactiveId(iniOptGrpId, window.OnetrustActiveGroups);
      if (otDeletedGrpIds.length !== 0 && otDomainGrps.length !== 0) {
        for (let i = 0; i < otDomainGrps.length; i++) {
          // Check if CustomGroupId matches
          if (
            otDomainGrps[i].CustomGroupId !== '' &&
            otDeletedGrpIds.includes(otDomainGrps[i].CustomGroupId)
          ) {
            for (let j = 0; j < otDomainGrps[i].Cookies.length; j++) {
              // console.log("otDeleteCookie",otDomainGrps[i]['Cookies'][j]['Name'])
              // Delete cookie
              eraseCookie(otDomainGrps[i].Cookies[j].Name);
            }
          }

          // Check if Hostid matches
          if (otDomainGrps[i].Hosts.length !== 0) {
            for (let j = 0; j < otDomainGrps[i].Hosts.length; j++) {
              // Check if HostId presents in the deleted list and cookie array is not blank
              if (
                otDeletedGrpIds.includes(otDomainGrps[i].Hosts[j].HostId) &&
                otDomainGrps[i].Hosts[j].Cookies.length !== 0
              ) {
                for (
                  // eslint-disable-next-line id-length
                  let k = 0;
                  k < otDomainGrps[i].Hosts[j].Cookies.length;
                  k++
                ) {
                  // Delete cookie
                  eraseCookie(otDomainGrps[i].Hosts[j].Cookies[k].Name);
                }
              }
            }
          }
        }
      }
      // Reassign new group ids
      otGetInitialGrps();
    }

    // Get inactive ids
    function otGetInactiveId(iniId, activeGrp) {
      // Initial OnetrustActiveGroups
      // console.log("otGetInactiveId",customIniId)
      let customIniId = iniId;
      let otActiveGrp = activeGrp;
      customIniId = customIniId.split(',');
      customIniId = customIniId.filter(Boolean);

      // After action OnetrustActiveGroups
      otActiveGrp = otActiveGrp.split(',');
      otActiveGrp = otActiveGrp.filter(Boolean);

      const result = [];
      for (let i = 0; i < customIniId.length; i++) {
        if (otActiveGrp.indexOf(customIniId[i]) <= -1) {
          result.push(customIniId[i]);
        }
      }
      return result;
    }

    // Delete cookie
    function eraseCookie(name) {
      // Delete root path cookies
      const domainName = window.location.hostname;
      document.cookie = `${name}=; Max-Age=-99999999; Path=/;Domain=${domainName}`;
      document.cookie = `${name}=; Max-Age=-99999999; Path=/;`;

      // Delete LSO incase LSO being used, cna be commented out.
      localStorage.removeItem(name);

      // Check for the current path of the page
      const pathArray = window.location.pathname.split('/');
      // Loop through path hierarchy and delete potential cookies at each path.
      for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i]) {
          // Build the path string from the Path Array e.g /site/login
          const currentPath = pathArray.slice(0, i + 1).join('/');
          document.cookie = `${name}=; Max-Age=-99999999; Path=${currentPath};Domain=${domainName}`;
          document.cookie = `${name}=; Max-Age=-99999999; Path=${currentPath};`;
          // Maybe path has a trailing slash!
          document.cookie = `${name}=; Max-Age=-99999999; Path=${currentPath}/;Domain=${domainName}`;
          document.cookie = `${name}=; Max-Age=-99999999; Path=${currentPath}/;`;
        }
      }
    }
  };
})();
