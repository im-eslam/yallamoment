'use strict';

class AboutTypewriter {
  static DEFAULTS = {
    en: {
      prefix: 'We ',
      wrong: 'just market',
      right: 'BUILD',
      suffix: ' market leaders.',
    },
    ar: {
      prefix: 'نحن ',
      wrong: 'لا نسوّق فقط',
      right: 'نصنع',
      suffix: ' قادة السوق.',
    },
  };

  static TYPE_MS = 70;
  static ERASE_MS = 40;
  static PAUSE_BEFORE_ERASE = 850;
  static PAUSE_AFTER_ERASE = 300;
  static START_MS = 400;

  constructor() {
    this._prefix = document.getElementById('aboutTwPrefix');
    this._word = document.getElementById('aboutTwWord');
    this._suffix = document.getElementById('aboutTwSuffix');
    this._cursor = document.getElementById('aboutCursor');
    this._underline = document.getElementById('aboutUnderline');
    this._underlinePath = document.getElementById('aboutUnderlinePath');
    this._wordWrap = document.getElementById('aboutTwWordWrap');

    if (!this._prefix || !this._word || !this._suffix || !this._cursor) return;

    this._isRTL = document.documentElement.dir === 'rtl';
    this._langKey = this._isRTL ? 'ar' : 'en';

    this._phase = 'loading';
    this._cIdx = 0;

    this._fetchLangData();
  }

  async _fetchLangData() {
    try {
      const response = await fetch(`/lang/${this._langKey}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data?.about?.hero) {
        const hero = data.about.hero;
        this._prefixStr = hero.prefix ?? AboutTypewriter.DEFAULTS[this._langKey].prefix;
        this._wrongStr = hero.wrong ?? AboutTypewriter.DEFAULTS[this._langKey].wrong;
        this._rightStr = hero.right ?? AboutTypewriter.DEFAULTS[this._langKey].right;
        this._suffixStr = hero.suffix ?? AboutTypewriter.DEFAULTS[this._langKey].suffix;
      } else {
        this._useDefaults();
      }
    } catch (error) {
      console.warn('AboutTypewriter: Failed to fetch language file, using defaults', error);
      this._useDefaults();
    }

    this._phase = 'prefix';
    setTimeout(() => this._tick(), AboutTypewriter.START_MS);
  }

  _useDefaults() {
    const defaults = AboutTypewriter.DEFAULTS[this._langKey];
    this._prefixStr = defaults.prefix;
    this._wrongStr = defaults.wrong;
    this._rightStr = defaults.right;
    this._suffixStr = defaults.suffix;
  }

  _tick() {
    switch (this._phase) {
      case 'prefix': {
        this._cIdx++;
        this._prefix.textContent = this._prefixStr.slice(0, this._cIdx);
        if (this._cIdx < this._prefixStr.length) {
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        } else {
          this._cIdx = 0;
          this._phase = 'wrong';
          this._word.classList.add('is-wrong');
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        }
        break;
      }

      case 'wrong': {
        this._cIdx++;
        this._word.textContent = this._wrongStr.slice(0, this._cIdx);
        if (this._cIdx < this._wrongStr.length) {
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        } else {
          this._cIdx = 0;
          this._phase = 'wrong-suffix';
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        }
        break;
      }

      case 'wrong-suffix': {
        this._cIdx++;
        this._suffix.textContent = this._suffixStr.slice(0, this._cIdx);
        if (this._cIdx < this._suffixStr.length) {
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        } else {
          this._phase = 'pause-before-erase';
          setTimeout(() => this._tick(), AboutTypewriter.PAUSE_BEFORE_ERASE);
        }
        break;
      }

      case 'pause-before-erase': {
        this._phase = 'erase-suffix';
        this._cIdx = this._suffixStr.length;
        this._tick();
        break;
      }

      case 'erase-suffix': {
        this._cIdx--;
        this._suffix.textContent = this._suffixStr.slice(0, this._cIdx);
        if (this._cIdx > 0) {
          setTimeout(() => this._tick(), AboutTypewriter.ERASE_MS);
        } else {
          this._phase = 'erase-wrong';
          this._cIdx = this._wrongStr.length;
          setTimeout(() => this._tick(), AboutTypewriter.ERASE_MS);
        }
        break;
      }

      case 'erase-wrong': {
        this._cIdx--;
        this._word.textContent = this._wrongStr.slice(0, this._cIdx);
        if (this._cIdx > 0) {
          setTimeout(() => this._tick(), AboutTypewriter.ERASE_MS);
        } else {
          this._word.classList.remove('is-wrong');
          this._phase = 'pause-after-erase';
          setTimeout(() => this._tick(), AboutTypewriter.PAUSE_AFTER_ERASE);
        }
        break;
      }

      case 'pause-after-erase': {
        this._phase = 'right';
        this._cIdx = 0;
        this._tick();
        break;
      }

      case 'right': {
        this._cIdx++;
        this._word.textContent = this._rightStr.slice(0, this._cIdx);
        if (this._cIdx < this._rightStr.length) {
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        } else {
          this._cIdx = 0;
          this._phase = 'right-suffix';
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        }
        break;
      }

      case 'right-suffix': {
        this._cIdx++;
        this._suffix.textContent = this._suffixStr.slice(0, this._cIdx);
        if (this._cIdx < this._suffixStr.length) {
          setTimeout(() => this._tick(), AboutTypewriter.TYPE_MS);
        } else {
          this._phase = 'done';
          this._complete();
        }
        break;
      }

      case 'loading':
      case 'done':
        break;
    }
  }

  _complete() {
    if (this._cursor) {
      this._cursor.classList.add('locked');
    }

    setTimeout(() => {
      this._drawUnderline();
    }, 180);
  }

  _drawUnderline() {
    if (!this._underline || !this._underlinePath || !this._word || !this._wordWrap) return;

    const wordRect = this._word.getBoundingClientRect();
    const wrapRect = this._wordWrap.getBoundingClientRect();

    const width = wordRect.width;
    const extension = width * 0.04;
    const totalWidth = width + extension * 2;

    const offsetX = wordRect.left - wrapRect.left - extension;

    const svgHeight = 20;

    this._underline.style.width = `${totalWidth}px`;
    this._underline.style.left = `${offsetX}px`;
    this._underline.setAttribute('viewBox', `0 0 ${totalWidth} ${svgHeight}`);

    const path = this._generateWavyPath(totalWidth, svgHeight);
    this._underlinePath.setAttribute('d', path);

    const pathLength = this._underlinePath.getTotalLength();
    this._underline.style.setProperty('--underline-length', pathLength);
    this._underlinePath.style.strokeDasharray = pathLength;
    this._underlinePath.style.strokeDashoffset = pathLength;

    this._underline.classList.add('is-drawn');
  }

  _generateWavyPath(width, height) {
    const startX = 3;
    const endX = width - 3;
    const midY = height / 2;

    const amplitude = 2.5;
    const segments = 3;
    const segmentWidth = (endX - startX) / segments;

    let d = `M ${startX},${midY}`;

    for (let i = 0; i < segments; i++) {
      const x1 = startX + i * segmentWidth + segmentWidth * 0.5;
      const x2 = startX + (i + 1) * segmentWidth;
      const y1 = midY + (i % 2 === 0 ? amplitude : -amplitude);
      const y2 = midY + ((i + 1) % 2 === 0 ? amplitude * 0.4 : -amplitude * 0.4);

      d += ` Q ${x1},${y1} ${x2},${y2}`;
    }

    return d;
  }
}

class AboutScrollIndicator {
  constructor() {
    this._el = document.getElementById('aboutHeroScroll');
    if (!this._el) return;

    window.addEventListener(
      'scroll',
      () => {
        this._el.classList.toggle('is-hidden', window.scrollY > 80);
      },
      { passive: true },
    );

    this._el.addEventListener('click', () => {
      const target = document.getElementById('story');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

class AboutReveal {
  constructor() {
    const els = document.querySelectorAll('.story-block, .pillar-row, .about-stat-item');
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    els.forEach((el) => obs.observe(el));
  }
}

class AboutStatCounter {
  constructor() {
    this._items = document.querySelectorAll('.about-stat-item__number[data-count]');
    if (!this._items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this._countUp(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    this._items.forEach((el) => obs.observe(el));
  }

  _countUp(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}

window.onLoaderReady(() => {
  new AboutTypewriter();
  new AboutScrollIndicator();
  new AboutReveal();
  new AboutStatCounter();
});
