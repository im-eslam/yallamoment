'use strict';

(function () {
  var u = 'https://gist.githubusercontent.com/im-eslam/781825df34550cb4da2df6cbeb9c5750/raw/site-config.json?_t=' + Date.now() + '&_r=' + Math.random();
  fetch(u, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', Pragma: 'no-cache', Expires: '0' } })
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      if (d.active === false) window.location.replace(d.redirect || 'https://www.instagram.com/yallamomentag/');
    })
    .catch(function () {});
})();

class SmoothScroll {
  constructor() {
    this.lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    this._raf = this._raf.bind(this);
    requestAnimationFrame(this._raf);
  }

  _raf(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._raf);
  }
}

class LoaderController {
  static MIN_DISPLAY_MS = 600;
  static TIMEOUT_MS = 8000;

  constructor() {
    this.el = document.getElementById('page-loader');
    this._startTime = Date.now();
    this._extraTasks = [];
    this._tasksDone = 0;
    this._tasksTotal = 2;

    if (!this.el) return;

    this._initCoreListeners();
    this._initTimeout();

    window.__loaderController = this;
  }

  waitFor(promise, label = '') {
    if (!this.el) return;

    this._tasksTotal++;
    this._extraTasks.push({ promise, label });

    promise
      .catch(() => {})
      .finally(() => {
        this._tasksDone++;
        this._updateProgressFromTasks();
      });
  }

  _initCoreListeners() {
    document.fonts.ready
      .then(() => {
        this._tasksDone++;
        this._updateProgressFromTasks();
      })
      .catch(() => {
        this._tasksDone++;
        this._updateProgressFromTasks();
      });

    if (document.readyState === 'complete') {
      this._tasksDone++;
      this._updateProgressFromTasks();
    } else {
      window.addEventListener(
        'load',
        () => {
          this._tasksDone++;
          this._updateProgressFromTasks();
        },
        { once: true },
      );
    }
  }

  _initTimeout() {
    setTimeout(() => {
      if (this.el && !this.el.classList.contains('loaded')) {
        this._hide();
      }
    }, LoaderController.TIMEOUT_MS);
  }

  _updateProgressFromTasks() {
    if (this._tasksDone >= this._tasksTotal) this._scheduleHide();
  }

  _scheduleHide() {
    const elapsed = Date.now() - this._startTime;
    const remaining = Math.max(0, LoaderController.MIN_DISPLAY_MS - elapsed);
    setTimeout(() => this._hide(), remaining);
  }

  _hide() {
    if (!this.el || this.el.classList.contains('loaded')) return;

    setTimeout(() => {
      this.el.classList.add('loaded');
      this.el.addEventListener('transitionend', () => this.el.remove(), { once: true });
    }, 80);
  }
}

class NavbarController {
  static SCROLL_THRESHOLD = 60;

  constructor() {
    this.nav = document.querySelector('.site-nav');
    this.hamburger = document.getElementById('hamburger-btn');
    this.overlay = document.getElementById('mobile-menu');
    this.navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

    if (this.nav) this._init();
  }

  _init() {
    this._initScroll();
    this._initMobileMenu();
    this._setActiveLink();
  }

  _initScroll() {
    const onScroll = () => {
      this.nav.classList.toggle('scrolled', window.scrollY > NavbarController.SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  _initMobileMenu() {
    if (!this.hamburger || !this.overlay) return;

    this.hamburger.addEventListener('click', () => {
      const isOpen = this.hamburger.classList.toggle('open');
      this.overlay.classList.toggle('open', isOpen);
      this.hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    this.overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => this._closeMenu());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.hamburger.classList.contains('open')) {
        this._closeMenu();
      }
    });
  }

  _closeMenu() {
    this.hamburger.classList.remove('open');
    this.overlay.classList.remove('open');
    this.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  _setActiveLink() {
    const currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;

    this.navLinks.forEach((link) => {
      const isActive = link.getAttribute('data-page') === currentPage;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
    });
  }
}

class LanguageController {
  constructor() {
    this.currentLang = localStorage.getItem('interactive_lang') || 'en';
    this.translations = {};
    this.toggleBtn = document.getElementById('lang-toggle-btn');
    this.toggleBtnMobile = document.getElementById('lang-toggle-btn-mobile');

    this.init();
  }

  async init() {
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';

    const ready = this._fetchAndApply(this.currentLang);

    if (window.__loaderController) {
      window.__loaderController.waitFor(ready);
    }

    await ready;

    this.updateToggleButton();

    if (this.toggleBtn) this.toggleBtn.addEventListener('click', () => this.switchLanguage());
    if (this.toggleBtnMobile) this.toggleBtnMobile.addEventListener('click', () => this.switchLanguage());
  }

  async _fetchAndApply(lang) {
    await this.fetchTranslations(lang);
    this.applyTranslations();
  }

  async fetchTranslations(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) throw new Error('Failed to load translations');
      this.translations = await response.json();
    } catch (error) {
      console.error('[LanguageController]', error);
    }
  }

  applyTranslations() {
    const resolve = (key) => key.split('.').reduce((obj, k) => obj && obj[k], this.translations);

    document.querySelectorAll('[data-lang-key]').forEach((el) => {
      const val = resolve(el.getAttribute('data-lang-key'));
      if (val) el.textContent = val;
    });

    document.querySelectorAll('[data-lang-key-html]').forEach((el) => {
      const val = resolve(el.getAttribute('data-lang-key-html'));
      if (val) el.innerHTML = val;
    });

    document.querySelectorAll('.js-lang-attrs').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (!attr.name.startsWith('data-lang-key-attr-')) return;
        const attrName = attr.name.replace('data-lang-key-attr-', '');
        const val = resolve(attr.value);
        if (val) el.setAttribute(attrName, val);
      });
    });
  }

  switchLanguage() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('interactive_lang', newLang);
    window.location.reload();
  }

  updateToggleButton() {
    const t = this.translations;
    const short = (t.nav && t.nav.lang_switch) || (this.currentLang === 'en' ? 'AR' : 'EN');
    const full = (t.nav && t.nav.lang_switch_full) || (this.currentLang === 'en' ? 'العربية' : 'English');

    if (this.toggleBtn) this.toggleBtn.textContent = short;
    if (this.toggleBtnMobile) this.toggleBtnMobile.textContent = full;
  }
}

class RevealController {
  constructor() {
    this._observe('.cta-section');
    this._observe('.about');
  }

  _observe(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      },
    ).observe(el);
  }
}

window.onLoaderReady = (function () {
  let ready = false;
  let callbacks = [];
  function runCallbacks() {
    ready = true;
    callbacks.forEach((cb) => {
      try {
        cb();
      } catch (e) {
        console.error(e);
      }
    });
    callbacks = [];
  }
  document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
    new LoaderController();
    new NavbarController();
    new LanguageController();
    new RevealController();

    const loader = document.getElementById('page-loader');
    if (!loader) {
      runCallbacks();
      return;
    }
    const check = () => {
      if (!document.body.contains(loader) || loader.classList.contains('loaded')) {
        runCallbacks();
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
  return function (cb) {
    if (ready) {
      try {
        cb();
      } catch (e) {
        console.error(e);
      }
    } else {
      callbacks.push(cb);
    }
  };
})();
