/* ═══════════════════════════════════════════════════
   SITE.JS — comportamento compartilhado em todas as páginas
   Pixel helpers + scroll reveal + smooth scroll + header
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PRICE = 14.99;
  var PRODUCT_NAME = 'Protocolo Fecha-tudo';

  /* ═══════ PIXEL HELPERS ═══════ */
  function trackViewContent() {
    if (typeof fbq === 'function') {
      fbq('track', 'ViewContent', {
        content_name: PRODUCT_NAME,
        value: PRICE,
        currency: 'BRL'
      });
    }
  }

  function trackInitiateCheckout() {
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', {
        value: PRICE,
        currency: 'BRL',
        content_name: PRODUCT_NAME,
        content_type: 'product'
      });
    }
  }

  // Expor para uso inline em onclick (compatibilidade com markup atual)
  window.PFT = { trackViewContent: trackViewContent, trackInitiateCheckout: trackInitiateCheckout };

  /* ═══════ HERO WORD-BY-WORD REVEAL ═══════ */
  var headline = document.querySelector('.hero__headline');
  var heroSub = document.querySelector('.hero__sub');
  var heroEyebrow = document.querySelector('.hero__eyebrow');

  if (heroEyebrow) {
    if (prefersReduced) {
      heroEyebrow.classList.add('visible');
    } else {
      setTimeout(function () { heroEyebrow.classList.add('visible'); }, 200);
    }
  }

  if (headline) {
    var raw = headline.innerHTML;
    // Preserve <br> e <strong> markup convertendo a tokens
    var hasMarkup = /<(br|strong|em)/i.test(raw);
    if (!hasMarkup) {
      var text = headline.textContent.trim();
      headline.innerHTML = '';
      var words = text.split(/\s+/);
      var emWords = (headline.dataset.emWords || '').split(',').map(function (w) { return w.trim(); });
      var spans = [];

      words.forEach(function (word, i) {
        var span = document.createElement('span');
        span.className = 'hero__word';
        if (emWords.indexOf(word) !== -1 || emWords.indexOf(word.replace(/[.,!?]/g, '')) !== -1) {
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
        var delay = 140;
        var start = 500;
        spans.forEach(function (span, i) {
          setTimeout(function () { span.classList.add('visible'); }, start + i * delay);
        });
        if (heroSub) {
          setTimeout(function () { heroSub.classList.add('visible'); }, start + spans.length * delay + 400);
        }
      }
    } else {
      // Markup-rich headline: anima como um todo
      headline.style.opacity = '0';
      headline.style.transition = 'opacity 0.8s var(--ease)';
      if (prefersReduced) {
        headline.style.opacity = '1';
        if (heroSub) heroSub.classList.add('visible');
      } else {
        setTimeout(function () { headline.style.opacity = '1'; }, 400);
        if (heroSub) {
          setTimeout(function () { heroSub.classList.add('visible'); }, 1100);
        }
      }
    }
  }

  /* ═══════ SCROLL REVEAL (IntersectionObserver) ═══════ */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ═══════ HEADER SCROLL ═══════ */
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    function updateHeader() {
      if (window.scrollY > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
    }, { passive: true });
  }

  /* ═══════ SMOOTH SCROLL ═══════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();