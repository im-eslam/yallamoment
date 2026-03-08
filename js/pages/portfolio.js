'use strict';

class PortfolioTypewriter {
  static DEFAULTS = {
    en: {
      prefix: 'Engineered for ',
      wrong: 'likes',
      right: 'REVENUE',
      suffix: '.',
    },
    ar: {
      prefix: 'مُصممة لمضاعفة ',
      wrong: 'التفاعل',
      right: 'الأرباح',
      suffix: '.',
    },
  };

  static TYPE_MS = 70;
  static ERASE_MS = 40;
  static PAUSE_BEFORE_ERASE = 850;
  static PAUSE_AFTER_ERASE = 300;
  static START_MS = 400;

  constructor() {
    this._prefix = document.getElementById('portfolioTwPrefix');
    this._word = document.getElementById('portfolioTwWord');
    this._suffix = document.getElementById('portfolioTwSuffix');
    this._cursor = document.getElementById('portfolioCursor');
    this._underline = document.getElementById('portfolioUnderline');
    this._underlinePath = document.getElementById('portfolioUnderlinePath');
    this._wordWrap = document.getElementById('portfolioTwWordWrap');

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

      if (data?.portfolio?.hero) {
        const hero = data.portfolio.hero;
        this._prefixStr = hero.prefix ?? PortfolioTypewriter.DEFAULTS[this._langKey].prefix;
        this._wrongStr = hero.wrong ?? PortfolioTypewriter.DEFAULTS[this._langKey].wrong;
        this._rightStr = hero.right ?? PortfolioTypewriter.DEFAULTS[this._langKey].right;
        this._suffixStr = hero.suffix ?? PortfolioTypewriter.DEFAULTS[this._langKey].suffix;
      } else {
        this._useDefaults();
      }
    } catch (error) {
      console.warn('PortfolioTypewriter: Failed to fetch language file, using defaults', error);
      this._useDefaults();
    }

    this._phase = 'prefix';
    setTimeout(() => this._tick(), PortfolioTypewriter.START_MS);
  }

  _useDefaults() {
    const defaults = PortfolioTypewriter.DEFAULTS[this._langKey];
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
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
        } else {
          this._cIdx = 0;
          this._phase = 'wrong';
          this._word.classList.add('is-wrong');
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
        }
        break;
      }

      case 'wrong': {
        this._cIdx++;
        this._word.textContent = this._wrongStr.slice(0, this._cIdx);
        if (this._cIdx < this._wrongStr.length) {
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
        } else {
          this._cIdx = 0;
          this._phase = 'wrong-suffix';
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
        }
        break;
      }

      case 'wrong-suffix': {
        this._cIdx++;
        this._suffix.textContent = this._suffixStr.slice(0, this._cIdx);
        if (this._cIdx < this._suffixStr.length) {
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
        } else {
          this._phase = 'pause-before-erase';
          setTimeout(() => this._tick(), PortfolioTypewriter.PAUSE_BEFORE_ERASE);
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
          setTimeout(() => this._tick(), PortfolioTypewriter.ERASE_MS);
        } else {
          this._phase = 'erase-wrong';
          this._cIdx = this._wrongStr.length;
          setTimeout(() => this._tick(), PortfolioTypewriter.ERASE_MS);
        }
        break;
      }

      case 'erase-wrong': {
        this._cIdx--;
        this._word.textContent = this._wrongStr.slice(0, this._cIdx);
        if (this._cIdx > 0) {
          setTimeout(() => this._tick(), PortfolioTypewriter.ERASE_MS);
        } else {
          this._word.classList.remove('is-wrong');
          this._phase = 'pause-after-erase';
          setTimeout(() => this._tick(), PortfolioTypewriter.PAUSE_AFTER_ERASE);
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
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
        } else {
          this._cIdx = 0;
          this._phase = 'right-suffix';
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
        }
        break;
      }

      case 'right-suffix': {
        this._cIdx++;
        this._suffix.textContent = this._suffixStr.slice(0, this._cIdx);
        if (this._cIdx < this._suffixStr.length) {
          setTimeout(() => this._tick(), PortfolioTypewriter.TYPE_MS);
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

class PortfolioScrollIndicator {
  constructor() {
    this._el = document.getElementById('portfolioHeroScroll');
    if (!this._el) return;

    window.addEventListener(
      'scroll',
      () => {
        this._el.classList.toggle('is-hidden', window.scrollY > 80);
      },
      { passive: true },
    );

    this._el.addEventListener('click', () => {
      const target = document.getElementById('case-studies');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

class CardDeck {
  constructor({ deckId, prevId, nextId, total }) {
    this.deck = document.getElementById(deckId);
    this.prev = document.getElementById(prevId);
    this.next = document.getElementById(nextId);
    this.total = total;
    if (!this.deck) return;

    this.cards = Array.from(this.deck.querySelectorAll('.pf-card'));
    this.current = 0;
    this.locked = false;

    this._render(false);
    this._bind();
  }

  _depth(idx) {
    return (idx - this.current + this.total) % this.total;
  }

  _render(animate = true) {
    this.cards.forEach((c, i) => {
      if (!animate) c.style.transition = 'none';
      c.setAttribute('data-depth', Math.min(this._depth(i), 4));
      if (!animate) {
        requestAnimationFrame(() => {
          c.style.transition = '';
        });
      }
    });
  }

  _advance(dir) {
    if (this.locked) return;
    this.locked = true;

    if (dir === 'next') {
      // Action: Top card flies off to the outside
      const topCard = this.cards[this.current];
      topCard.classList.add('exit-next');

      setTimeout(() => {
        topCard.classList.remove('exit-next');
        this.current = (this.current + 1) % this.total;
        this._render(true); // Remaining cards bubble up
        setTimeout(() => {
          this.locked = false;
        }, 50);
      }, 400);
    } else {
      // Action: Previous card flies in from the outside and lands on top
      this.current = (this.current - 1 + this.total) % this.total;
      const incomingCard = this.cards[this.current];

      incomingCard.classList.add('enter-prev');
      this._render(true); // Current cards sink down immediately

      setTimeout(() => {
        incomingCard.classList.remove('enter-prev');
        setTimeout(() => {
          this.locked = false;
        }, 50);
      }, 400);
    }
  }

  _bind() {
    this.deck.addEventListener('click', () => this._advance('next'));

    this.next?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._advance('next');
    });
    this.prev?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._advance('prev');
    });

    let tx = 0;
    this.deck.addEventListener(
      'touchstart',
      (e) => {
        tx = e.touches[0].clientX;
      },
      { passive: true },
    );

    this.deck.addEventListener(
      'touchend',
      (e) => {
        const dx = tx - e.changedTouches[0].clientX;
        const isRTL = document.documentElement.dir === 'rtl';

        if (Math.abs(dx) > 40) {
          if (isRTL) {
            // RTL: Swipe Left to discard outside
            this._advance(dx > 0 ? 'next' : 'prev');
          } else {
            // LTR: Swipe Right to discard outside
            this._advance(dx < 0 ? 'next' : 'prev');
          }
        }
      },
      { passive: true },
    );

    this.deck.setAttribute('tabindex', '0');
    this.deck.addEventListener('keydown', (e) => {
      const isRTL = document.documentElement.dir === 'rtl';
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this._advance(isRTL ? 'prev' : 'next');
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this._advance(isRTL ? 'next' : 'prev');
      }
    });
  }
}

class PortfolioVideoController {
  constructor() {
    this.container = document.querySelector('.pf-vid-swiper');
    if (!this.container) return;

    this._playing = null;
    this._rafId = null;
    this._observer = null;

    this._init();
  }

  _init() {
    this._initSwiper();
    this._bindControls();
    this._initVisibilityObserver();
    this._preloadAdjacent();
  }

  _initSwiper() {
    const isRTL = document.documentElement.dir === 'rtl';
    this.swiper = new Swiper('.pf-vid-swiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      rewind: true,
      initialSlide: 2,
      speed: 440,
      grabCursor: true,
      dir: isRTL ? 'rtl' : 'ltr',
      breakpoints: {
        0: { spaceBetween: 12 },
        600: { spaceBetween: 16 },
        900: { spaceBetween: 24 },
      },
      pagination: { el: '.pf-vid-pagination', clickable: true },
      navigation: { nextEl: '.pf-vid-next', prevEl: '.pf-vid-prev' },
      on: {
        slideChange: () => {
          this._stopPlaying();
          this._preloadAdjacent();
        },
      },
    });
  }

  _bindControls() {
    this.container.querySelectorAll('.pf-vid-card').forEach((card) => {
      const video = card.querySelector('.pf-vid-el');
      const playBtn = card.querySelector('.pf-vid-play-btn');
      const muteBtn = card.querySelector('.pf-vid-mute-btn');
      const progress = card.querySelector('.pf-vid-progress');
      if (!video || !playBtn) return;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.pf-vid-mute-btn')) return;

        const slide = card.closest('.swiper-slide');
        const isActive = slide?.classList.contains('swiper-slide-active');

        if (!isActive && this.swiper) {
          const idx = this.swiper.slides.indexOf(slide);
          if (idx !== -1) this.swiper.slideTo(idx);
        } else {
          video.paused ? this._play({ video, card, playBtn, muteBtn, progress }) : this._stopPlaying();
        }
      });

      muteBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        this._updateMuteIcon(muteBtn, video.muted);
      });

      video.addEventListener('ended', () => {
        this._resetCard({ video, playBtn, muteBtn, progress });
      });
    });
  }

  _play({ video, card, playBtn, muteBtn, progress }) {
    if (this._playing && this._playing.video !== video) this._stopPlaying();
    if (video.preload === 'none') video.preload = 'metadata';

    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    playBtn.classList.add('is-playing');
    if (muteBtn) {
      muteBtn.classList.add('is-visible');
      this._updateMuteIcon(muteBtn, video.muted);
    }

    this._playing = { video, card, playBtn, muteBtn, progress };
    if (progress) this._startProgress(video, progress);
  }

  _stopPlaying() {
    if (!this._playing) return;
    const { video, playBtn, muteBtn, progress } = this._playing;
    video.pause();
    playBtn?.classList.remove('is-playing');
    muteBtn?.classList.remove('is-visible');
    if (progress) progress.style.width = '0%';
    this._stopProgress();
    this._playing = null;
  }

  _resetCard({ video, playBtn, muteBtn, progress }) {
    video.currentTime = 0;
    playBtn?.classList.remove('is-playing');
    muteBtn?.classList.remove('is-visible');
    if (progress) progress.style.width = '0%';
    this._stopProgress();
    if (this._playing?.video === video) this._playing = null;
  }

  _startProgress(video, bar) {
    this._stopProgress();
    const tick = () => {
      if (video.duration > 0) bar.style.width = `${(video.currentTime / video.duration) * 100}%`;
      this._rafId = requestAnimationFrame(tick);
    };
    this._rafId = requestAnimationFrame(tick);
  }

  _stopProgress() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  _preloadAdjacent() {
    if (!this.swiper) return;
    const active = this.swiper.activeIndex;
    const slides = [...this.container.querySelectorAll('.swiper-slide')];

    slides.forEach((slide, i) => {
      const video = slide.querySelector('.pf-vid-el');
      if (!video) return;
      video.preload = Math.abs(i - active) <= 1 ? 'metadata' : 'none';
    });
  }

  _initVisibilityObserver() {
    if (!('IntersectionObserver' in window)) return;
    this._observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) this._stopPlaying();
      },
      { threshold: 0.1 },
    );
    const section = this.container.closest('.pf-video-sec');
    if (section) this._observer.observe(section);
  }

  _updateMuteIcon(btn, isMuted) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = isMuted ? 'fas fa-volume-xmark' : 'fas fa-volume-high';
    btn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
  }
}

window.onLoaderReady(() => {
  new PortfolioTypewriter();
  new PortfolioScrollIndicator();
  new CardDeck({ deckId: 'pf-gd-deck', prevId: 'pf-gd-prev', nextId: 'pf-gd-next', curId: 'pf-gd-cur', total: 22 });
  new PortfolioVideoController();
});
