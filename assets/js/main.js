document.addEventListener('DOMContentLoaded', function () {

  /* Mobile drawer menu */
  var hamburger = document.querySelector('.hamburger');
  var drawer = document.querySelector('.mobile-drawer');
  var drawerClose = document.querySelector('.drawer-close');
  var drawerOverlay = document.querySelector('.drawer-overlay');
  var menuTriggers = document.querySelectorAll('.mobile-menu-trigger');

  function openDrawer(e){ if (e) e.preventDefault(); drawer.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeDrawer(){ drawer.classList.remove('open'); document.body.style.overflow = ''; }

  if (hamburger && drawer) {
    hamburger.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    menuTriggers.forEach(function (t) { t.addEventListener('click', openDrawer); });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Contact / trial forms: fake submit -> success state */
  document.querySelectorAll('form[data-fake-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var card = form.closest('.form-card');
      var success = card ? card.querySelector('.form-success') : null;
      if (form.checkValidity()) {
        form.style.display = 'none';
        if (success) success.classList.add('show');
      } else {
        form.reportValidity();
      }
    });
  });

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }
});
