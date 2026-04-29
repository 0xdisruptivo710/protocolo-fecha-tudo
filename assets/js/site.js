/* ═══════════════════════════════════════════════════
   SITE.JS — Protocolo Fecha-Tudo
   Pixel + reveal + smooth scroll + header scroll
   + sticky CTA + FAQ accordion (vanilla)
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── PIXEL HELPERS ─── */
  var PRICE = 47.00;
  var PRODUCT_NAME = 'Protocolo Fecha-Tudo';

  function trackViewContent() {
    if (typeof fbq === 'function') {
      fbq('track', 'ViewContent', {
        content_name: PRODUCT_NAME,
        value: PRICE,
        currency: 'BRL'
      });
    }
  }
  function trackInitiateCheckout(position) {
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', {
        value: PRICE,
        currency: 'BRL',
        content_name: PRODUCT_NAME,
        content_type: 'product',
        cta_position: position || 'unknown'
      });
    }
  }
  window.PFT = {
    trackViewContent: trackViewContent,
    trackInitiateCheckout: trackInitiateCheckout
  };

  /* ─── HOOK: data-event="cta_click" tracking ─── */
  document.querySelectorAll('[data-event="cta_click"]').forEach(function (el) {
    el.addEventListener('click', function () {
      trackInitiateCheckout(el.getAttribute('data-position'));
    });
  });

  /* ─── HERO WORD-BY-WORD REVEAL ─── */
  var headline = document.querySelector('.hero__headline');
  var heroSub = document.querySelector('.hero__sub');
  var heroEyebrow = document.querySelector('.hero__eyebrow');

  if (heroEyebrow) {
    if (prefersReduced) heroEyebrow.classList.add('visible');
    else setTimeout(function () { heroEyebrow.classList.add('visible'); }, 200);
  }

  if (headline) {
    var raw = headline.innerHTML;
    var hasMarkup = /<(br|strong|em|u)/i.test(raw);
    if (!hasMarkup) {
      var text = headline.textContent.trim();
      headline.innerHTML = '';
      var words = text.split(/\s+/);
      var emWords = (headline.dataset.emWords || '').split(',').map(function (w) { return w.trim(); }).filter(Boolean);
      var spans = [];
      words.forEach(function (word, i) {
        var span = document.createElement('span');
        span.className = 'hero__word';
        var clean = word.replace(/[.,!?;:]/g, '');
        if (emWords.indexOf(word) !== -1 || emWords.indexOf(clean) !== -1) {
          span.classList.add('hero__word--em');
        }
        span.textContent = word;
        headline.appendChild(span);
        if (i < words.length - 1) headline.appendChild(document.createTextNode(' '));
        spans.push(span);
      });
      if (prefersReduced) {
        spans.forEach(function (s) { s.classList.add('visible'); });
        if (heroSub) heroSub.classList.add('visible');
      } else {
        var delay = 110;
        var start = 400;
        spans.forEach(function (span, i) {
          setTimeout(function () { span.classList.add('visible'); }, start + i * delay);
        });
        if (heroSub) {
          setTimeout(function () { heroSub.classList.add('visible'); }, start + spans.length * delay + 300);
        }
      }
    } else {
      headline.style.opacity = '0';
      headline.style.transition = 'opacity 0.9s var(--ease)';
      if (prefersReduced) {
        headline.style.opacity = '1';
        if (heroSub) heroSub.classList.add('visible');
      } else {
        setTimeout(function () { headline.style.opacity = '1'; }, 350);
        if (heroSub) setTimeout(function () { heroSub.classList.add('visible'); }, 1000);
      }
    }
  }

  /* ─── SCROLL REVEAL ─── */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ─── HEADER SCROLL STATE ─── */
  var header = document.querySelector('.site-header');
  var sticky = document.querySelector('.sticky-cta');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      if (y > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    if (sticky) {
      if (y > 600) sticky.classList.add('visible');
      else sticky.classList.remove('visible');
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ─── SMOOTH SCROLL p/ links âncora ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── FAQ ACCORDION (auto-fechar outros) ─── */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      }
      var summary = item.querySelector('.faq__q');
      if (summary) summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
    });
    var summary = item.querySelector('.faq__q');
    if (summary) summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
  });
})();
