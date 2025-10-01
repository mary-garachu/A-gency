// counter.js
(function () {
  'use strict';

  function formatNumber(num) {
    return num.toLocaleString(); // formats 1000 -> "1,000"
  }

  function animateValue(el, start, end, duration, suffix) {
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      el.textContent = formatNumber(current) + (suffix || '');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // ensure final value is exact
        el.textContent = formatNumber(end) + (suffix || '');
      }
    }

    requestAnimationFrame(step);
  }

  function runCounter(el) {
    const targetAttr = el.getAttribute('data-target');
    const target = targetAttr ? parseInt(targetAttr.replace(/\D/g, ''), 10) : parseInt(el.textContent.replace(/\D/g, ''), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || (el.textContent.indexOf('+') !== -1 ? '+' : '');
    const duration = parseInt(el.getAttribute('data-duration'), 10) || 1200; // default 1200ms

    // start: if data-start provided use it, otherwise random start between 0 and ~40% of target
    let start = 0;
    const explicitStart = el.getAttribute('data-start');
    if (explicitStart) {
      start = parseInt(explicitStart.replace(/\D/g, ''), 10) || 0;
    } else {
      const maxStart = Math.max(1, Math.floor(target * 0.4));
      start = Math.floor(Math.random() * maxStart);
    }
    if (start >= target) start = Math.floor(target * 0.1);

    animateValue(el, start, target, duration, suffix);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target); // only once
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => {
      // initial display
      c.textContent = c.getAttribute('data-initial') || '0';
      io.observe(c);
    });
  });
})();
