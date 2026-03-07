'use strict';

class NotificationFeedController {
  static CARDS = [
    {
      app: 'Instagram',
      icon: 'fab fa-instagram',
      bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
      title: 'Reel hit 847K views 🔥',
      text: 'Pure organic — zero ad spend',
      time: 'now',
      live: true,
    },
    {
      app: 'Google Ads',
      icon: 'fab fa-google',
      bg: 'linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)',
      title: 'ROAS reached 6.4× 📈',
      text: 'E-commerce client — Month 2',
      time: '1m ago',
      live: true,
    },
    {
      app: 'TikTok',
      icon: 'fab fa-tiktok',
      bg: '#010101',
      title: '+2,300 followers today 🚀',
      text: 'Viral sound strategy working',
      time: '2m ago',
      live: true,
    },
    {
      app: 'Meta Ads',
      icon: 'fab fa-facebook-f',
      bg: '#1877F2',
      title: 'Cost per lead: EGP 12 💰',
      text: 'Down 65% from last quarter',
      time: '4m ago',
      live: false,
    },
    {
      app: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      bg: '#25D366',
      title: '18 qualified leads today 🎯',
      text: 'From Meta lead gen campaign',
      time: '5m ago',
      live: true,
    },
    {
      app: 'Google Analytics',
      icon: 'fas fa-chart-line',
      bg: '#F4B400',
      title: 'Traffic up 156% 📊',
      text: 'SEO improvements live 6 weeks',
      time: '7m ago',
      live: false,
    },
    {
      app: 'Instagram',
      icon: 'fab fa-instagram',
      bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
      title: 'Story CTR: 12.3% ✨',
      text: 'Average is 3% — crushing it',
      time: '9m ago',
      live: false,
    },
    {
      app: 'Google Ads',
      icon: 'fab fa-google',
      bg: 'linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)',
      title: '284 conversions this month ',
      text: 'Search + Performance Max',
      time: '11m ago',
      live: false,
    },
    {
      app: 'Shopify',
      icon: 'fab fa-shopify',
      bg: '#96BE3F',
      title: 'Revenue +180% 💵',
      text: 'Launch campaign: 940 orders',
      time: '8m ago',
      live: true,
    },
    {
      app: 'Salla',
      icon: 'fas fa-shopping-bag',
      bg: '#FF6B35',
      title: 'SAR 156K sales — 30 days 🛒',
      text: 'Social ads drove 72% of orders',
      time: '20m ago',
      live: false,
    },
    {
      app: 'Stripe',
      icon: 'fab fa-stripe-s',
      bg: '#635BFF',
      title: '$9,200 in new revenue 💳',
      text: 'Subscription funnel live 2 weeks',
      time: '33m ago',
      live: false,
    },
    {
      app: 'TikTok',
      icon: 'fab fa-tiktok',
      bg: '#010101',
      title: 'Video shared 3,400 times ',
      text: 'No paid boost — organic only',
      time: '13m ago',
      live: true,
    },
    {
      app: 'Meta Ads',
      icon: 'fab fa-facebook-f',
      bg: '#1877F2',
      title: 'Campaign CTR: 4.2% 👆',
      text: 'New creative outperforming 2×',
      time: '15m ago',
      live: false,
    },
    {
      app: 'YouTube',
      icon: 'fab fa-youtube',
      bg: '#FF0000',
      title: 'Brand video: 94K views 🎬',
      text: 'Watch time avg: 2m 18s',
      time: '17m ago',
      live: false,
    },
    {
      app: 'Google Search',
      icon: 'fab fa-google',
      bg: '#34A853',
      title: 'Page 1 for 8 keywords ',
      text: 'Was page 4 — 45 days of SEO',
      time: '19m ago',
      live: false,
    },
    {
      app: 'Instagram',
      icon: 'fab fa-instagram',
      bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
      title: 'Post reached 67K accounts 👀',
      text: '82% non-followers discovered us',
      time: '21m ago',
      live: false,
    },
    {
      app: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      bg: '#25D366',
      title: 'Client closed EGP 85K deal 🤝',
      text: 'Lead came from our Meta ads',
      time: '23m ago',
      live: false,
    },
    {
      app: 'Google Ads',
      icon: 'fab fa-google',
      bg: 'linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)',
      title: 'Quality Score: 8/10 ⭐',
      text: 'Above average across all metrics',
      time: '25m ago',
      live: false,
    },
    {
      app: 'TikTok',
      icon: 'fab fa-tiktok',
      bg: '#010101',
      title: '250K profile visits 👤',
      text: 'Reached in just 60 days',
      time: '27m ago',
      live: true,
    },
    {
      app: 'Meta Ads',
      icon: 'fab fa-facebook-f',
      bg: '#1877F2',
      title: 'Retargeting ROAS: 8.1× 🎯',
      text: 'Website visitor segment',
      time: '29m ago',
      live: false,
    },
    {
      app: 'Google Analytics',
      icon: 'fas fa-chart-line',
      bg: '#F4B400',
      title: 'Bounce rate: 34% 📉',
      text: 'Down from 58% — new UX live',
      time: '31m ago',
      live: false,
    },
    {
      app: 'Instagram',
      icon: 'fab fa-instagram',
      bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
      title: 'Saved 8.2K times ',
      text: 'Carousel content performing',
      time: '34m ago',
      live: false,
    },
    {
      app: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      bg: '#25D366',
      title: '"Results exceeded expectations" 💬',
      text: 'Client feedback — Month 3',
      time: '36m ago',
      live: false,
    },
  ];

  static SPEED = 0.38;
  static GAP = 8;
  static STAGGER = 280;
  static INITIAL_CARDS = 2;

  constructor() {
    this.feedArea = document.getElementById('heroFeedArea');
    this.track = document.getElementById('heroFeed');
    if (!this.feedArea || !this.track) return;

    this._offset = 0;
    this._halfH = 0;
    this._paused = false;
    this._entered = [];
    this._totalCardsAdded = 0;
    this._duplicateSet = [];
    this._scrollStarted = false;

    this._shuffledCards = this._shuffleArray([...NotificationFeedController.CARDS]);

    this._buildInitial();
    this._measure();
    this._bindEvents();
    this._staggerEnter();
    this._waitForLoaderAndProgressive();
  }

  _shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  _buildInitial() {
    const cards = this._shuffledCards;
    const initialCount = Math.min(NotificationFeedController.INITIAL_CARDS, cards.length);

    for (let i = 0; i < cards.length; i++) {
      const el = this._makeCard(cards[i], i < initialCount);
      this.track.appendChild(el);
      this._entered.push(el);
    }
    this._totalCardsAdded = initialCount;

    cards.forEach((data) => {
      const el = this._makeCard(data, true);
      this.track.appendChild(el);
      this._duplicateSet.push(el);
    });
  }

  _waitForLoaderAndProgressive() {
    const loader = document.getElementById('page-loader');
    const checkLoaded = () => {
      if (loader && loader.classList.contains('loaded')) {
        this._progressivelyAddCards();
      } else {
        requestAnimationFrame(checkLoaded);
      }
    };
    requestAnimationFrame(checkLoaded);
  }

  _progressivelyAddCards() {
    const cards = this._shuffledCards;
    const totalCards = cards.length;

    const addNextCard = (index) => {
      if (index >= totalCards) {
        return;
      }

      const el = this._entered[index];
      if (el) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, 80);
      }

      this._totalCardsAdded++;

      setTimeout(() => addNextCard(index + 1), NotificationFeedController.STAGGER);
    };

    addNextCard(NotificationFeedController.INITIAL_CARDS);
  }

  _rebuildDuplicateSet() {
    const cards = this._shuffledCards;

    this._duplicateSet.forEach((el) => el.remove());
    this._duplicateSet = [];

    cards.forEach((data) => {
      const el = this._makeCard(data, true);
      this.track.appendChild(el);
      this._duplicateSet.push(el);
    });
  }

  _makeCard(data, preVisible) {
    const el = document.createElement('div');
    el.className = 'notif-card' + (preVisible ? ' is-visible' : '');
    if (preVisible) {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0) scale(1)';
    }

    el.innerHTML = `
      <div class="notif-icon" style="background:${data.bg};" aria-hidden="true">
        <i class="${data.icon}"></i>
      </div>
      <div class="notif-body">
        <div class="notif-meta">
          <span class="notif-app">${data.app}</span>
          <span class="notif-dot" aria-hidden="true"></span>
          <span class="notif-time">${data.time}</span>
        </div>
        <div class="notif-title">${data.title}</div>
        <div class="notif-text">${data.text}</div>
      </div>
      ${data.live ? '<span class="notif-live" aria-hidden="true"></span>' : ''}
    `;
    return el;
  }

  _measure() {
    requestAnimationFrame(() => {
      const gap = NotificationFeedController.GAP;
      const count = this._shuffledCards.length;
      let h = 0;
      const children = this.track.children;
      for (let i = 0; i < count; i++) {
        if (children[i]) {
          h += children[i].offsetHeight + gap;
        }
      }
      this._halfH = h;

      if (!this._scrollStarted) {
        this._scrollStarted = true;
        this._scroll();
      }
    });
  }

  _staggerEnter() {
    this._entered.forEach((el, i) => {
      setTimeout(
        () => {
          el.classList.add('is-visible');
        },
        80 + i * NotificationFeedController.STAGGER,
      );
    });
  }

  _scroll() {
    const tick = () => {
      if (!this._paused && this._halfH > 0) {
        this._offset += NotificationFeedController.SPEED;
        if (this._offset >= this._halfH) this._offset -= this._halfH;
        this.track.style.transform = `translateY(-${this._offset}px)`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  _bindEvents() {}
}

class ServicesController {
  constructor() {
    this.timeline = document.getElementById('servicesTimeline');
    this.svgEl = document.getElementById('servicesConnector');
    this.trackEl = document.getElementById('connectorTrack');
    this.glowEl = document.getElementById('connectorGlow');
    this.progressEl = document.getElementById('connectorProgress');
    this.dotEl = document.getElementById('connectorDot');
    this.dotGlowEl = document.getElementById('connectorDotGlow');
    this.dotInnerEl = document.getElementById('connectorDotInner');
    this.items = Array.from(document.querySelectorAll('.service-item'));

    if (!this.timeline || !this.svgEl || !this.items.length) return;

    this._pathLen = 0;
    this._milestones = [];
    this._current = -1;

    if (window.innerWidth > 820) {
      document.fonts.ready.then(() =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this._buildPath();
          }),
        ),
      );

      window.addEventListener(
        'resize',
        this._debounce(() => {
          if (window.innerWidth <= 820) return;
          const prev = this._current;
          this._buildPath();
          this._replayTo(prev);
        }, 260),
      );
    }

    this._observeItems();
  }

  _getServicePositions() {
    const tlW = this.timeline.offsetWidth;
    const cx = tlW / 2;

    return this.items.map((item) => {
      const visual = item.querySelector('.service-visual');
      const card = item.querySelector('.service-card');
      const y = item.offsetTop + item.offsetHeight / 2;

      let imageIsLeft = true;
      if (visual) {
        const visualCenterX = item.offsetLeft + visual.offsetLeft + visual.offsetWidth / 2;
        imageIsLeft = visualCenterX < cx;
      }

      let gapX = cx;
      if (visual && card) {
        gapX = imageIsLeft ? item.offsetLeft + visual.offsetLeft + visual.offsetWidth + 30 : item.offsetLeft + visual.offsetLeft - 30;
      }

      return { y, imageIsLeft, gapX };
    });
  }

  _buildPath() {
    const tlW = this.timeline.offsetWidth;
    const tlH = this.timeline.scrollHeight;
    if (!tlW || !tlH) return;

    this.svgEl.setAttribute('viewBox', `0 0 ${tlW} ${tlH}`);
    this.svgEl.setAttribute('width', tlW);
    this.svgEl.setAttribute('height', tlH);

    const positions = this._getServicePositions();
    if (!positions.length) return;

    const f = this._f;
    const leftEdge = tlW * 0.08;
    const rightEdge = tlW * 0.92;
    const last = positions[positions.length - 1];

    const points = [{ x: rightEdge, y: -30 }];
    positions.forEach((pos) => {
      points.push({ x: pos.imageIsLeft ? rightEdge : leftEdge, y: pos.y });
    });
    points.push({ x: last.imageIsLeft ? leftEdge : rightEdge, y: tlH + 30 });

    let d = `M ${f(points[0].x)},${f(points[0].y)}`;
    const tension = 0.35;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      d += ` C ${f(cp1x)},${f(cp1y)} ${f(cp2x)},${f(cp2y)} ${f(p2.x)},${f(p2.y)}`;
    }

    [this.trackEl, this.glowEl, this.progressEl].forEach((el) => el && el.setAttribute('d', d));

    const len = (this._pathLen = this.trackEl.getTotalLength());
    [this.progressEl, this.glowEl].forEach((el) => {
      if (!el) return;
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    });

    this._milestones = this._computeMilestones(positions, len, 100);
  }

  _computeMilestones(positions, totalLen, samples = 100) {
    const result = [];
    let lastFound = 0;

    positions.forEach((pos) => {
      let bestDist = Infinity;
      let bestLen = lastFound;

      for (let i = 0; i <= samples; i++) {
        const len = lastFound + (totalLen - lastFound) * (i / samples);
        try {
          const pt = this.trackEl.getPointAtLength(len);
          const dist = Math.abs(pt.y - pos.y);
          if (dist < bestDist) {
            bestDist = dist;
            bestLen = len;
          }
          if (pt.y > pos.y + 50) break;
        } catch (_) {
          break;
        }
      }

      result.push(bestLen);
      lastFound = bestLen + 20;
    });

    return result;
  }

  _observeItems() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = this.items.indexOf(entry.target);
          if (idx < 0) return;
          entry.target.classList.add('is-visible');
          this._animateTo(idx);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    );

    this.items.forEach((item) => observer.observe(item));
  }

  _animateTo(targetIdx) {
    if (!this._pathLen || targetIdx <= this._current) return;
    this._current = targetIdx;

    const isLastItem = targetIdx === this.items.length - 1;
    const drawn = isLastItem ? this._pathLen : (this._milestones[targetIdx] ?? this._pathLen);
    const offset = Math.max(0, this._pathLen - drawn);

    requestAnimationFrame(() => {
      this.progressEl.style.strokeDashoffset = offset.toFixed(1);
      if (this.glowEl) this.glowEl.style.strokeDashoffset = offset.toFixed(1);

      if (!this.dotEl) return;

      this.dotEl.classList.add('is-active');
      if (this.dotGlowEl) this.dotGlowEl.classList.add('is-active');
      if (this.dotInnerEl) this.dotInnerEl.classList.add('is-active');

      if (isLastItem) {
        this.dotEl.classList.add('is-complete');
        if (this.dotGlowEl) this.dotGlowEl.classList.add('is-complete');
        if (this.dotInnerEl) this.dotInnerEl.classList.add('is-complete');
      }

      try {
        const pt = this.progressEl.getPointAtLength(drawn);
        const x = pt.x.toFixed(1);
        const y = pt.y.toFixed(1);
        [this.dotEl, this.dotGlowEl, this.dotInnerEl].forEach((el) => {
          if (el) {
            el.setAttribute('cx', x);
            el.setAttribute('cy', y);
          }
        });
      } catch (_) {}
    });
  }

  _replayTo(idx) {
    if (idx < 0) return;
    const prev = this.progressEl.style.transition;
    this.progressEl.style.transition = 'none';
    this._current = -1;
    this._animateTo(idx);
    requestAnimationFrame(() => {
      this.progressEl.style.transition = prev;
    });
  }

  _f = (n) => n.toFixed(1);

  _debounce(fn, ms) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), ms);
    };
  }
}

class WhyController {
  constructor() {
    this.stats = Array.from(document.querySelectorAll('.why-stat'));
    this.features = Array.from(document.querySelectorAll('.why-feature'));
    this.numbers = Array.from(document.querySelectorAll('.why-stat__number'));

    if (!this.stats.length && !this.features.length) return;

    this._hasCountedUp = false;
    this._observeElements();
  }

  _observeElements() {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add('is-visible'), index * 100);
          if (!this._hasCountedUp) {
            this._hasCountedUp = true;
            setTimeout(() => this._countUp(), 200);
          }
          statsObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' },
    );

    const featuresObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = this.features.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('is-visible'), idx * 120);
          featuresObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' },
    );

    this.stats.forEach((stat) => statsObserver.observe(stat));
    this.features.forEach((feature) => featuresObserver.observe(feature));
  }

  _countUp() {
    this.numbers.forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target.toLocaleString();
      };

      requestAnimationFrame(animate);
    });
  }
}

class ReviewsController {
  constructor() {
    this.container = document.querySelector('.reviews-swiper');
    if (!this.container) return;

    this._playing = null;
    this._rafId = null;
    this._observer = null;

    this._init();
  }

  _init() {
    this._initSwiper();
    this._bindVideoControls();
    this._initVisibilityObserver();
    this._preloadAdjacentSlides();

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this._initThumbnails(), { timeout: 3000 });
    } else {
      setTimeout(() => this._initThumbnails(), 1200);
    }
  }

  _initThumbnails() {
    this.container.querySelectorAll('.review-video').forEach((video) => {
      const existing = video.getAttribute('poster') || '';
      if (existing && !existing.startsWith('data:image/svg')) return;

      const capture = () => {
        if (!video.videoWidth) return;
        try {
          const scale = Math.min(1, 540 / video.videoWidth);
          const w = Math.round(video.videoWidth * scale);
          const h = Math.round(video.videoHeight * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(video, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          if (dataUrl?.startsWith('data:image/jpeg')) video.setAttribute('poster', dataUrl);
        } catch (_) {
        }
      };

      const doSeek = () => {
        video.addEventListener('seeked', capture, { once: true });
        video.currentTime = 0.001;
      };

      video.readyState >= 1 ? doSeek() : video.addEventListener('loadedmetadata', doSeek, { once: true });
    });
  }

  _initSwiper() {
    const isRTL = document.documentElement.dir === 'rtl';

    this.swiper = new Swiper('.reviews-swiper', {
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
        900: { spaceBetween: 20 },
      },
      pagination: { el: '.reviews-pagination', clickable: true },
      navigation: { nextEl: '.reviews-next', prevEl: '.reviews-prev' },
      on: {
        slideChange: () => {
          this._stopPlaying();
          this._preloadAdjacentSlides();
        },
      },
    });
  }

  _bindVideoControls() {
    this.container.querySelectorAll('.review-card').forEach((card) => {
      const video = card.querySelector('.review-video');
      const playBtn = card.querySelector('.review-play-btn');
      const muteBtn = card.querySelector('.review-mute-btn');
      const progress = card.querySelector('.review-progress');
      if (!video || !playBtn) return;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.review-mute-btn')) return;

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
        this._resetCard({ video, card, playBtn, muteBtn, progress });
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

  _preloadAdjacentSlides() {
    if (!this.swiper) return;
    const active = this.swiper.activeIndex;
    const slides = [...this.container.querySelectorAll('.swiper-slide')];

    slides.forEach((slide, i) => {
      const video = slide.querySelector('.review-video');
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

    const section = this.container.closest('.reviews');
    if (section) this._observer.observe(section);
  }

  _updateMuteIcon(btn, isMuted) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = isMuted ? 'fas fa-volume-xmark' : 'fas fa-volume-high';
    btn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
  }
}

class RevealController {
  constructor() {
    this._observe('.cta-section', 0.15);
    this._observe('.about', 0.2);
  }

  _observe(selector, threshold) {
    const el = document.querySelector(selector);
    if (!el) return;

    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      },
      { threshold },
    ).observe(el);
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  new NotificationFeedController();
  new ServicesController();
  new WhyController();
  new ReviewsController();
  new RevealController();
});
