/* ============================================================
   ICTS — Navigation + Scroll Animations
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Logo: continuous scroll-linked shrink (lockup -> emblem) ── */
    var siteNav = document.querySelector('.site-nav');
    if (siteNav) {
      var isHome = document.body.classList.contains('home');
      var ticking = false;
      var applyNav = function () {
        ticking = false;
        var NAV_END = isHome ? 240 : 130;
        var y = window.pageYOffset || document.documentElement.scrollTop || 0;
        var p = y / NAV_END; p = p < 0 ? 0 : (p > 1 ? 1 : p);
        siteNav.style.setProperty('--nav-p', p.toFixed(4));
        siteNav.classList.toggle('is-scrolled', y > 4);
      };
      var onNavScroll = function () {
        if (!ticking) { ticking = true; window.requestAnimationFrame(applyNav); }
      };
      applyNav();
      window.addEventListener('scroll', onNavScroll, { passive: true });
      window.addEventListener('resize', onNavScroll, { passive: true });
    }


    /* ── Mobile nav toggle ── */
    var toggle = document.querySelector('.nav-toggle');
    var links  = document.querySelector('.site-nav__links');

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ── Active link ── */
    var current = window.location.pathname.replace(/\/$/, '');
    document.querySelectorAll('.site-nav__links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').replace(/\/$/, '');
      if (href && (href === current || current.startsWith(href.replace(/index\.html$/, '')))) {
        a.classList.add('active');
      }
    });

    /* ── Scroll-reveal via IntersectionObserver ── */
    if (!('IntersectionObserver' in window)) return;

    /* Elements that reveal individually */
    var individualTargets = [
      '.page-header__eyebrow',
      '.page-header__title',
      '.page-header__lead',
      '.section__eyebrow',
      '.section__title',
      '.section__lead',
      '.unit-item',
      '.activity-item',
      '.person-item',
      '.gov-item',
      '.gov-block',
      '.about-item',
      '.join-block',
      '.researcher-card',
      '.statement-block__heading',
      '.statement-block__body',
      '.unit-page__badge',
      '.unit-page__title',
      '.unit-page__fullname',
      '.unit-page__positioning',
      '.unit-nav',
      '.aside-block',
      '.about-quote',
      '.people-section__header',
      '.people-section__fullname',
    ].join(',');

    /* Containers whose children stagger */
    var staggerContainers = [
      '.unit-grid',
      '.news-grid',
      '.institutions-grid',
      '.person-grid',
    ].join(',');

    /* Eyebrow elements that animate their gold line */
    var eyebrowSelectors = [
      '.section__eyebrow',
      '.page-header__eyebrow',
      '.unit-page__badge',
      '.join-block__label',
    ].join(',');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    /* Apply .reveal and observe individual elements */
    document.querySelectorAll(individualTargets).forEach(function (el) {
      /* Skip if already in hero (always visible) */
      if (el.closest('.hero')) return;
      el.classList.add('reveal');
      observer.observe(el);
    });

    /* Apply .reveal-children and observe stagger containers */
    document.querySelectorAll(staggerContainers).forEach(function (container) {
      container.classList.add('reveal-children');
      observer.observe(container);
    });

    /* Animate eyebrow gold lines */
    document.querySelectorAll(eyebrowSelectors).forEach(function (el) {
      if (el.closest('.hero')) return; /* hero lines always show */
      el.classList.add('eyebrow-init');
      /* IntersectionObserver already added via individualTargets above */
    });

  });
})();
