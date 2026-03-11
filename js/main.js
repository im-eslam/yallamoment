'use strict';

(function () {
  var CONFIG_URL = 'https://gist.githubusercontent.com/im-eslam/781825df34550cb4da2df6cbeb9c5750/raw/ac41b22a4b355fc761752987e5c4ced29dc293f4/site-config.json';
  var CACHE_KEY = 'ym_site_status';
  var CACHE_TTL = 5 * 60 * 1000;

  function showBlocker() {
    document.documentElement.style.overflow = 'hidden';

    var overlay = document.createElement('div');
    overlay.id = 'ym-killswitch-overlay';
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:2147483647',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'background:#0d0807',
      'font-family:Cairo,Tajawal,Arial,sans-serif',
      'padding:2rem',
      'text-align:center',
    ].join(';');

    overlay.innerHTML = [
      '<img src="/assets/images/logo/logo_1.png" alt="Yalla Moment"',
      '  width="64" style="margin-bottom:2rem;opacity:0.6" />',
      '<h1 style="color:#e8dcdb;font-size:1.5rem;font-weight:700;',
      '  margin:0 0 1rem">Site Under Maintenance</h1>',
      '<p style="color:#6b4744;font-size:1rem;max-width:420px;line-height:1.7;margin:0">',
      '  This website is temporarily unavailable.',
      '  Please check back soon or contact us for more information.',
      '</p>',
    ].join('');

    document.body.innerHTML = '';
    document.body.appendChild(overlay);
    document.body.style.cssText = 'margin:0;padding:0;background:#0d0807';
  }

  function checkStatus() {
    try {
      var cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        var entry = JSON.parse(cached);
        if (Date.now() - entry.ts < CACHE_TTL) {
          if (!entry.active) showBlocker();
          return;
        }
      }
    } catch (e) {}

    fetch(CONFIG_URL + '?_=' + Date.now(), {
      cache: 'no-store',
      mode: 'cors',
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              active: !!data.active,
              ts: Date.now(),
            }),
          );
        } catch (e) {}

        if (!data.active) showBlocker();
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkStatus);
  } else {
    checkStatus();
  }
})();
