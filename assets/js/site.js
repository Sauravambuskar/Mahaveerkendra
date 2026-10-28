/* ==========================================================================
   Shree Vardhaman Mahaveer Kendra — site behaviour
   --------------------------------------------------------------------------
   >>> EDIT THE CONTACT DETAILS IN `KENDRA` BELOW AND THE WHOLE SITE UPDATES.
       Every WhatsApp button, call link and footer number is generated from it.
   ========================================================================== */

var KENDRA = {
  /* ---- CHANGE THESE TWO LINES ------------------------------------------ */

  // Full number in international format, digits only. No +, no spaces.
  // Example for an Indian mobile 98765 43210  ->  "919876543210"
  phone: '919351516186',

  // How the number should read on screen.
  phoneDisplay: '+91 93515 16186',

  /* ---------------------------------------------------------------------- */

  // Pre-filled text for the WhatsApp chat.
  waMessage: 'Jai Jinendra. I would like to know more about Shree Vardhaman Mahaveer Kendra, Sani Gaon, Abu Road.',

  email: 'info@shreevardhamanmahaveerkendra.org',

  address: 'HPR6+P7C, opposite Chacha Museum, Sani Gaon, Abu Road, Rajasthan 307501',
  plusCode: 'HPR6+P7C'
};

KENDRA.waLink = 'https://wa.me/' + KENDRA.phone + '?text=' + encodeURIComponent(KENDRA.waMessage);
KENDRA.telLink = 'tel:+' + KENDRA.phone;
KENDRA.mapLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(KENDRA.address);
KENDRA.dirLink = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(KENDRA.address);

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function each(sel, fn, root) {
    var nodes = (root || document).querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) { fn(nodes[i], i); }
  }

  /* --- Fill in every contact link and number from KENDRA --------------- */

  function wireContactDetails() {
    each('[data-wa]', function (el) {
      el.setAttribute('href', KENDRA.waLink);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    each('[data-tel]', function (el) { el.setAttribute('href', KENDRA.telLink); });

    each('[data-map]', function (el) {
      el.setAttribute('href', KENDRA.mapLink);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    each('[data-dir]', function (el) {
      el.setAttribute('href', KENDRA.dirLink);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    each('[data-mail]', function (el) { el.setAttribute('href', 'mailto:' + KENDRA.email); });

    each('[data-phone-text]', function (el) { el.textContent = KENDRA.phoneDisplay; });
    each('[data-mail-text]', function (el) { el.textContent = KENDRA.email; });
  }

  /* --- Sticky header shadow -------------------------------------------- */

  function wireMasthead() {
    var head = document.querySelector('.masthead');
    if (!head) { return; }

    function onScroll() {
      head.classList.toggle('is-stuck', window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobile drawer ---------------------------------------------------- */

  function wireDrawer() {
    var burger = document.querySelector('.burger');
    var drawer = document.getElementById('site-drawer');
    if (!burger || !drawer) { return; }

    function setOpen(open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    each('a', function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    }, drawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1000) { setOpen(false); }
    });
  }

  /* --- Floating WhatsApp button ---------------------------------------- */

  function wireFloat() {
    var fab = document.querySelector('.wa-float');
    if (!fab) { return; }

    function onScroll() {
      fab.classList.toggle('is-shown', window.scrollY > 320);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Scroll reveal ---------------------------------------------------- */

  function wireReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) { return; }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      each('.reveal', function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    each('.reveal', function (el) { io.observe(el); });
  }

  /* --- Gallery filters -------------------------------------------------- */

  function wireFilters() {
    var bar = document.querySelector('.filters');
    if (!bar) { return; }

    var tiles = document.querySelectorAll('.tile');

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filters__btn');
      if (!btn) { return; }

      var want = btn.getAttribute('data-filter');

      each('.filters__btn', function (b) {
        b.setAttribute('aria-selected', String(b === btn));
      }, bar);

      for (var i = 0; i < tiles.length; i++) {
        var group = tiles[i].getAttribute('data-group');
        tiles[i].classList.toggle('is-hidden', want !== 'all' && group !== want);
      }
    });
  }

  /* --- Lightbox -------------------------------------------------------- */

  function wireLightbox() {
    var box = document.getElementById('lightbox');
    if (!box) { return; }

    var img = box.querySelector('[data-lb-img]');
    var cap = box.querySelector('[data-lb-caption]');
    var count = box.querySelector('[data-lb-count]');
    var lastFocus = null;
    var visible = [];
    var at = 0;

    function collect() {
      visible = [];
      each('[data-lb-src]', function (el) {
        if (!el.classList.contains('is-hidden')) { visible.push(el); }
      });
    }

    function render() {
      var el = visible[at];
      if (!el) { return; }
      img.setAttribute('src', el.getAttribute('data-lb-src'));
      img.setAttribute('alt', el.getAttribute('data-lb-alt') || '');
      cap.textContent = el.getAttribute('data-lb-caption') || '';
      count.textContent = (at + 1) + ' / ' + visible.length;
    }

    function open(el) {
      collect();
      at = Math.max(0, visible.indexOf(el));
      lastFocus = document.activeElement;
      render();
      box.classList.add('is-open');
      box.removeAttribute('aria-hidden');
      document.body.classList.add('is-locked');
      var closeBtn = box.querySelector('[data-lb-close]');
      if (closeBtn) { closeBtn.focus(); }
    }

    function close() {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    }

    function step(by) {
      if (!visible.length) { return; }
      at = (at + by + visible.length) % visible.length;
      render();
    }

    each('[data-lb-src]', function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        open(el);
      });
    });

    box.addEventListener('click', function (e) {
      if (e.target.closest('[data-lb-close]')) { return close(); }
      if (e.target.closest('[data-lb-prev]')) { return step(-1); }
      if (e.target.closest('[data-lb-next]')) { return step(1); }
      if (e.target === box || e.target.classList.contains('lightbox__stage')) { close(); }
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) { return; }
      if (e.key === 'Escape') { close(); }
      if (e.key === 'ArrowLeft') { step(-1); }
      if (e.key === 'ArrowRight') { step(1); }
    });
  }

  /* --- Copy to clipboard ----------------------------------------------- */

  function wireCopy() {
    each('[data-copy]', function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var label = btn.querySelector('[data-copy-label]') || btn;
        var original = label.textContent;

        function done(ok) {
          label.textContent = ok ? 'Copied' : 'Press Ctrl+C';
          setTimeout(function () { label.textContent = original; }, 1800);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { done(true); },
                                                    function () { done(false); });
        } else {
          done(false);
        }
      });
    });
  }

  /* --- Current year ----------------------------------------------------- */

  function wireYear() {
    each('[data-year]', function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* --- Boot ------------------------------------------------------------- */

  function boot() {
    wireContactDetails();
    wireMasthead();
    wireDrawer();
    wireFloat();
    wireReveal();
    wireFilters();
    wireLightbox();
    wireCopy();
    wireYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
