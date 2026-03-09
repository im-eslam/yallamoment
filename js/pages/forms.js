(function () {
  'use strict';

  /* ═══════════════════════════════════════════════
     CONFIG
  ═══════════════════════════════════════════════ */
  const EMAILJS_CONFIG = {
    PUBLIC_KEY: '8KtmAGdp76K5hvf9t',
    SERVICE_ID: 'service_rpcpv1k',
    CONTACT_TEMPLATE_ID: 'template_v9kvl7s',
    CAREER_TEMPLATE_ID: 'template_2m9knax',
  };

  class BaseForm {
    constructor() {
      this._translations = null;
    }

    async _fetchTranslations() {
      if (this._translations) return this._translations;

      const lang = localStorage.getItem('interactive_lang') || 'en';

      try {
        const res = await fetch(`lang/${lang}.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this._translations = await res.json();
      } catch (err) {
        console.warn(`[forms.js] Could not load lang/${lang}.json, falling back to en.json`, err);
        try {
          const res = await fetch('lang/en.json');
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          this._translations = await res.json();
        } catch (fallbackErr) {
          console.error('[forms.js] Could not load fallback en.json either.', fallbackErr);
          this._translations = {};
        }
      }

      return this._translations;
    }

    _t(keyPath, translations) {
      return keyPath.split('.').reduce((obj, k) => obj?.[k], translations) ?? keyPath;
    }

    _isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    _setFieldError(el, hasError) {
      if (!el) return;
      el.closest('.form-field')?.classList.toggle('has-error', hasError);
    }

    _showAlert({ icon, title, text, confirmButtonText }) {
      return Swal.fire({
        icon,
        title,
        text,
        confirmButtonText,
        customClass: {
          popup: 'ym-swal',
          title: 'ym-swal__title',
          htmlContainer: 'ym-swal__body',
          confirmButton: 'ym-swal__confirm btn-primary',
        },
        buttonsStyling: false,
      });
    }

    _setupFieldStates(form) {
      form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach((el) => {
        const field = el.closest('.form-field');
        if (!field) return;

        el.addEventListener('focus', () => field.classList.add('is-focused'));

        el.addEventListener('blur', () => {
          field.classList.remove('is-focused');
          field.classList.toggle('is-filled', el.value.trim() !== '');
          field.classList.remove('has-error');
        });

        el.addEventListener('input', () => {
          if (el.value.trim()) field.classList.remove('has-error');
        });

        if (el.tagName === 'SELECT') {
          el.addEventListener('change', () => {
            if (el.value) field.classList.remove('has-error');
          });
        }
      });
    }

    _setLoading(btn, spinner, btnText, label) {
      if (btn) btn.classList.add('is-loading');
      if (btn) btn.disabled = true;
      if (spinner) spinner.classList.add('active');
      if (btnText && label) btnText.textContent = label;
    }

    _clearLoading(btn, spinner, btnText, label) {
      if (btn) btn.classList.remove('is-loading');
      if (btn) btn.disabled = false;
      if (spinner) spinner.classList.remove('active');
      if (btnText && label) btnText.textContent = label;
    }
  }

  class ContactForm extends BaseForm {
    constructor() {
      super();
      this.form = document.getElementById('contact-form');
      if (!this.form) return;
      this._init();
    }

    async _init() {
      const t = await this._fetchTranslations();
      this._populateSelects(t);
      this._setupFieldStates(this.form);
      this.form.addEventListener('submit', (e) => this._handleSubmit(e, t));
    }

    _populateSelects(t) {
      const serviceEl = document.getElementById('cf-service');
      const budgetEl = document.getElementById('cf-budget');

      const services = t?.contact?.form?.options?.services;
      const budgets = t?.contact?.form?.options?.budgets;

      const defaultServices = [
        'Select a service...',
        'Corporate Identity & Branding',
        'Website Design & Web Solutions',
        'Video Production & Motion Graphics',
        'Social Media Management & Paid Ads',
        'Full-Service Growth Partnership',
      ];
      const defaultBudgets = ['Select a budget range...', 'Under 20,000 EGP', '20,000 EGP - 50,000 EGP', '50,000 EGP - 150,000 EGP', '150,000+ EGP'];

      const renderOptions = (el, opts) => {
        if (!el) return;
        el.innerHTML = opts.map((s, i) => `<option value="${i === 0 ? '' : s}"${i === 0 ? ' disabled selected hidden' : ''}>${s}</option>`).join('');
      };

      renderOptions(serviceEl, services?.length ? services : defaultServices);
      renderOptions(budgetEl, budgets?.length ? budgets : defaultBudgets);
    }

    async _handleSubmit(e, t) {
      e.preventDefault();

      const name = document.getElementById('cf-name')?.value.trim();
      const email = document.getElementById('cf-email')?.value.trim();
      const phone = document.getElementById('cf-phone')?.value.trim();
      const brand = document.getElementById('cf-brand')?.value.trim();
      const social = document.getElementById('cf-social')?.value.trim() || '—';
      const service = document.getElementById('cf-service')?.value;
      const budget = document.getElementById('cf-budget')?.value;
      const bottleneck = document.getElementById('cf-bottleneck')?.value.trim();
      const brief = document.getElementById('cf-brief')?.value.trim() || '—';

      let hasError = false;

      const check = (id, condition) => {
        const el = document.getElementById(id);
        const err = !condition;
        this._setFieldError(el, err);
        if (err) hasError = true;
      };

      check('cf-name', !!name);
      check('cf-email', !!email && this._isValidEmail(email));
      check('cf-phone', !!phone);
      check('cf-brand', !!brand);
      check('cf-service', !!service);
      check('cf-budget', !!budget);
      check('cf-bottleneck', !!bottleneck);

      if (hasError) {
        this.form.querySelector('.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        await this._showAlert({
          icon: 'warning',
          title: t?.contact?.alerts?.validation?.title ?? 'Missing Information',
          text: t?.contact?.alerts?.validation?.text ?? 'Please fill out all required fields.',
          confirmButtonText: t?.contact?.alerts?.validation?.confirm ?? 'Got it',
        });
        return;
      }

      const btn = document.getElementById('contact-submit');
      const spinner = btn?.querySelector('.btn-spinner');
      const btnText = btn?.querySelector('.btn-text');
      this._setLoading(btn, spinner, btnText, t?.contact?.form?.submitting ?? 'Sending...');

      try {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
          {
            from_name: name,
            from_email: email,
            phone,
            brand,
            social,
            service,
            budget,
            bottleneck,
            brief,
            reply_to: email,
          },
          { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
        );

        await this._showAlert({
          icon: 'success',
          title: t?.contact?.alerts?.success?.title ?? 'Application Received',
          text: t?.contact?.alerts?.success?.text ?? 'We will contact you within 24 hours.',
          confirmButtonText: t?.contact?.alerts?.success?.confirm ?? 'Done',
        });

        window.location.href = 'index.html';
      } catch (err) {
        console.error('[ContactForm] EmailJS error:', err);
        await this._showAlert({
          icon: 'error',
          title: t?.contact?.alerts?.error?.title ?? 'Something went wrong',
          text: t?.contact?.alerts?.error?.text ?? 'Please try again or reach us via WhatsApp.',
          confirmButtonText: t?.contact?.alerts?.error?.confirm ?? 'Try Again',
        });
      } finally {
        this._clearLoading(btn, spinner, btnText, t?.contact?.form?.submit ?? 'Submit Application');
      }
    }
  }

  class CareerForm extends BaseForm {
    constructor() {
      super();
      this.form = document.getElementById('career-form');
      if (!this.form) return;
      this._init();
    }

    async _init() {
      const t = await this._fetchTranslations();
      this._setupFieldStates(this.form);
      this._setupFileInput(t);
      this._setupAgreement();
      this.form.addEventListener('submit', (e) => this._handleSubmit(e, t));
    }

    _setupFileInput(t) {
      const fileInput = document.getElementById('cf-cv');
      const fileLabel = document.getElementById('cv-file-label');
      const fileName = document.getElementById('cv-file-name');
      const cvField = document.getElementById('cv-field');
      if (!fileInput) return;

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
          if (fileName) fileName.textContent = file.name;
          fileLabel?.classList.add('has-file');
          cvField?.classList.remove('has-error');
        } else {
          if (fileName) fileName.textContent = t?.career?.form?.upload_btn ?? 'Choose File';
          fileLabel?.classList.remove('has-file');
        }
      });
    }

    _setupAgreement() {
      const checkbox = document.getElementById('cf-agreement');
      const field = document.getElementById('agreement-field');
      if (!checkbox || !field) return;

      checkbox.addEventListener('change', () => {
        if (checkbox.checked) field.classList.remove('has-error');
      });
    }

    _readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    async _handleSubmit(e, t) {
      e.preventDefault();

      const name = document.getElementById('cf-name')?.value.trim();
      const email = document.getElementById('cf-email')?.value.trim();
      const phone = document.getElementById('cf-phone')?.value.trim();
      const jobTitle = document.getElementById('cf-job-title')?.value.trim();
      const portfolio = document.getElementById('cf-portfolio')?.value.trim();
      // const cvFile = document.getElementById('cf-cv')?.files[0] ?? null;  // CV upload disabled
      const whyUs = document.getElementById('cf-why-us')?.value.trim();
      const agreement = document.getElementById('cf-agreement')?.checked ?? false;

      let hasError = false;

      const check = (id, condition) => {
        const el = document.getElementById(id);
        const err = !condition;
        this._setFieldError(el, err);
        if (err) hasError = true;
      };

      check('cf-name', !!name);
      check('cf-email', !!email && this._isValidEmail(email));
      check('cf-phone', !!phone);
      check('cf-job-title', !!jobTitle);
      check('cf-portfolio', !!portfolio);
      check('cf-why-us', !!whyUs);

      // CV validation disabled — re-enable when EmailJS Pro attachment is ready
      // const cvField = document.getElementById('cv-field');
      // let cvError = false;
      // if (!cvFile) {
      //   cvError = true;
      // } else if (cvFile.size > 5 * 1024 * 1024) {
      //   cvError = true;
      // } else if (!cvFile.type.includes('pdf') && !cvFile.name.toLowerCase().endsWith('.pdf')) {
      //   cvError = true;
      // }
      // if (cvError) {
      //   cvField?.classList.add('has-error');
      //   hasError = true;
      // }

      const agreementField = document.getElementById('agreement-field');
      if (!agreement) {
        agreementField?.classList.add('has-error');
        hasError = true;
      }

      if (hasError) {
        this.form.querySelector('.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        await this._showAlert({
          icon: 'warning',
          title: t?.career?.alerts?.validation?.title ?? 'Missing Information',
          text: t?.career?.alerts?.validation?.text ?? 'Please fill out all required fields and check the confirmation box.',
          confirmButtonText: t?.career?.alerts?.validation?.confirm ?? 'Got it',
        });
        return;
      }

      const btn = document.getElementById('career-submit');
      const spinner = btn?.querySelector('.btn-spinner');
      const btnText = btn?.querySelector('.btn-text');
      this._setLoading(btn, spinner, btnText, t?.career?.form?.submitting ?? 'Sending...');

      try {
        // CV read + attachment disabled — uncomment both lines when EmailJS Pro is active
        // const cvBase64 = await this._readFileAsBase64(cvFile);
        // attachments: [{ name: cvFile.name, data: cvBase64 }],

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.CAREER_TEMPLATE_ID,
          {
            from_name: name,
            from_email: email,
            phone,
            job_title: jobTitle,
            portfolio,
            cv_name: '—', // placeholder until CV upload is re-enabled
            why_us: whyUs,
            reply_to: email,
          },
          { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
        );

        await this._showAlert({
          icon: 'success',
          title: t?.career?.alerts?.success?.title ?? 'Application Received',
          text: t?.career?.alerts?.success?.text ?? 'Your application is in our system. We will contact you if your work matches our standards.',
          confirmButtonText: t?.career?.alerts?.success?.confirm ?? 'Done',
        });

        window.location.href = 'index.html';
      } catch (err) {
        console.error('[CareerForm] EmailJS error:', err);
        await this._showAlert({
          icon: 'error',
          title: t?.career?.alerts?.error?.title ?? 'Upload Failed',
          text: t?.career?.alerts?.error?.text ?? 'Please try again or ensure your CV is under 5 MB.',
          confirmButtonText: t?.career?.alerts?.error?.confirm ?? 'Try Again',
        });
      } finally {
        this._clearLoading(btn, spinner, btnText, t?.career?.form?.submit ?? 'Submit Application');
      }
    }
  }

  function boot() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    } else {
      console.error('[forms.js] EmailJS not loaded. Check script order.');
    }

    new ContactForm();
    new CareerForm();
  }

  window.onLoaderReady = boot;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        if (!window._formsBooted) boot();
      }, 300);
    });
  } else {
    setTimeout(() => {
      if (!window._formsBooted) boot();
    }, 300);
  }

  const _originalBoot = boot;
  window.onLoaderReady = function () {
    window._formsBooted = true;
    _originalBoot();
  };
})();
