/**
 * Seamless ticker driven by requestAnimationFrame.
 * Resets position the instant we've scrolled exactly one "copy"
 * of the content — no CSS animation restart lag.
 */
(function () {
  const inner = document.querySelector('.ticker-inner');
  if (!inner) return;

  const SPEED = 0.3; // px per frame (~36px/s at 60 fps)
  let x = 0;
  let halfWidth = 0;
  let rafId = null;

  function step() {
    x -= SPEED;
    // Reset when we've scrolled exactly one full copy (first half = second half)
    if (x <= -halfWidth) {
      x = 0;
    }
    inner.style.transform = `translateX(${x}px)`;
    rafId = requestAnimationFrame(step);
  }

  function init() {
    // Measure after images have had a chance to load
    halfWidth = inner.scrollWidth / 2;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
  }

  // Start after all images in the ticker are loaded
  const images = inner.querySelectorAll('img');
  let loaded = 0;

  if (images.length === 0) {
    init();
    return;
  }

  function onLoad() {
    loaded++;
    if (loaded >= images.length) {
      init();
    }
  }

  images.forEach((img) => {
    if (img.complete) {
      onLoad();
    } else {
      img.addEventListener('load', onLoad);
      img.addEventListener('error', onLoad); // count errors too so we never stall
    }
  });
})();
