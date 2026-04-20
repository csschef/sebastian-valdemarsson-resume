/**
 * Ticker — sets animation-duration based on measured set width.
 *
 * Structure (HTML): .ticker-track > .ticker-set × 2
 *
 * Why this works without jumps:
 *   - .ticker-set has padding-right equal to the gap value.
 *   - Each set's offsetWidth therefore includes the trailing gap.
 *   - .ticker-track width = 2 × setWidth (exactly).
 *   - translateX(-50%) = exactly one setWidth → seamless loop, guaranteed.
 *   - CSS handles the loop boundary — no JS timing involved.
 */
(function () {
  var SPEED = 60; // px per second

  var track = document.querySelector('.ticker-track');
  var set   = document.querySelector('.ticker-set');
  if (!track || !set) return;

  function start() {
    var duration = set.offsetWidth / SPEED;
    track.style.animationDuration = duration.toFixed(3) + 's';
  }

  // Ensure images are loaded so offsetWidth is accurate
  var images  = Array.from(set.querySelectorAll('img'));
  var pending = images.filter(function (img) { return !img.complete; });

  if (pending.length === 0) {
    start();
  } else {
    var loaded = 0;
    pending.forEach(function (img) {
      function done() { if (++loaded >= pending.length) start(); }
      img.addEventListener('load',  done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  }
}());