/**
 * Seamless ticker driven by requestAnimationFrame.
 *
 * Fixes vs original:
 *  - x += halfWidth  (not x = 0) to preserve sub-pixel offset -> no lag on reset
 *  - dynamically clones content until it covers 3x viewport width -> always full-width
 */
(function () {
  const strip = document.querySelector('.ticker-strip');
  const inner = document.querySelector('.ticker-inner');
  if (!inner || !strip) return;

  const SPEED = 0.4; // px per frame (~24px/s at 60fps)
  let x = 0;
  let halfWidth = 0;
  let rafId = null;

  function step() {
    x -= SPEED;
    if (x <= -halfWidth) {
      x += halfWidth; // sub-pixel-safe seamless reset
    }
    inner.style.transform = 'translateX(' + x + 'px)';
    rafId = requestAnimationFrame(step);
  }

  function init() {
    // Original items (HTML already has 2 copies, so halfWidth = scrollWidth / 2)
    halfWidth = inner.scrollWidth / 2;

    // Clone more if one copy doesn't cover the strip width
    if (halfWidth < strip.offsetWidth + 1) {
      var origItems = Array.prototype.slice.call(inner.children);
      while (inner.scrollWidth / 2 < strip.offsetWidth + 1) {
        origItems.forEach(function (el) {
          inner.appendChild(el.cloneNode(true));
        });
      }
      halfWidth = inner.scrollWidth / 2;
    }

    if (rafId) cancelAnimationFrame(rafId);
    x = 0;
    rafId = requestAnimationFrame(step);
  }

  // Only wait for images that haven't loaded yet
  var images = Array.prototype.slice.call(inner.querySelectorAll('img'));
  var pending = images.filter(function (img) { return !img.complete; });

  if (pending.length === 0) {
    init();
    return;
  }

  var loaded = 0;
  pending.forEach(function (img) {
    function done() {
      loaded++;
      if (loaded >= pending.length) init();
    }
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
})();