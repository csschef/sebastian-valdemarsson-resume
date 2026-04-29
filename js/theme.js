// English index: Ta bort klickfunktionen på desktop för telefonknappar
function updatePhoneButtonEn() {
    const phoneBtn = document.getElementById('contact-phone');
    if (!phoneBtn) return;
    if (window.innerWidth >= 1024) {
        phoneBtn.removeAttribute('href');
    } else {
        phoneBtn.setAttribute('href', 'tel:+46730426260');
    }
}
function updateFooterPhoneButtonEn() {
    const phoneBtn = document.getElementById('footer-phone');
    if (!phoneBtn) return;
    if (window.innerWidth >= 1024) {
        phoneBtn.removeAttribute('href');
    } else {
        phoneBtn.setAttribute('href', 'tel:+46730426260');
    }
}
if (window.location.pathname.includes('/en/')) {
    window.addEventListener('resize', updatePhoneButtonEn);
    window.addEventListener('DOMContentLoaded', updatePhoneButtonEn);
    window.addEventListener('resize', updateFooterPhoneButtonEn);
    window.addEventListener('DOMContentLoaded', updateFooterPhoneButtonEn);
}
// Ta bort klickfunktionen på desktop för telefonknappen i footern
function updateFooterPhoneButton() {
    const phoneBtn = document.getElementById('footer-phone');
    if (!phoneBtn) return;
    if (window.innerWidth >= 1024) {
        phoneBtn.removeAttribute('href');
    } else {
        phoneBtn.setAttribute('href', 'tel:+46730426260');
    }
}

window.addEventListener('resize', updateFooterPhoneButton);
window.addEventListener('DOMContentLoaded', updateFooterPhoneButton);
// Ta bort klickfunktionen på desktop för telefonknappen
function updatePhoneButton() {
    const phoneBtn = document.getElementById('contact-phone');
    if (!phoneBtn) return;
    if (window.innerWidth >= 1024) {
        phoneBtn.removeAttribute('href');
    } else {
        phoneBtn.setAttribute('href', 'tel:+46730426260');
    }
}

window.addEventListener('resize', updatePhoneButton);
window.addEventListener('DOMContentLoaded', updatePhoneButton);
/**
 * theme.js – Dark / Light mode toggle
 * Saves preference to localStorage under the key 'theme'.
 * Applies [data-theme="dark"] on <html> for dark mode.
 */

(function () {
    const HTML = document.documentElement;
    const BTN  = document.getElementById('theme-toggle');
    const KEY  = 'theme';

    /** Apply a theme ('dark' | 'light') without transition flash */
    function applyTheme(theme, animate) {
        if (!animate) {
            HTML.style.transition = 'none';
        }
        HTML.setAttribute('data-theme', theme);
        if (!animate) {
            // Force reflow, then restore transitions
            HTML.offsetHeight; // eslint-disable-line no-unused-expressions
            HTML.style.transition = '';
        }
    }

    // ── On load: restore saved preference (no animation) ──────────────
    const saved = localStorage.getItem(KEY);
    // Default to light if nothing saved
    applyTheme(saved === 'dark' ? 'dark' : 'light', false);

    // ── Toggle on click ────────────────────────────────────────────────
    BTN.addEventListener('click', function () {
        const isDark = HTML.getAttribute('data-theme') === 'dark';
        const next   = isDark ? 'light' : 'dark';
        applyTheme(next, true);
        localStorage.setItem(KEY, next);
    });

    // ── Keyboard accessibility ─────────────────────────────────────────
    BTN.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            BTN.click();
        }
    });
})();
