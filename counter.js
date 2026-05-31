/**
 * counter.js — drop-in replacement for counterapi.com/c.js
 * Hydrates <div class="counterapi"> elements using the self-hosted
 * Cloudflare Worker at counter.avikalp.workers.dev
 */
(function () {
  'use strict';

  var WORKER_BASE = 'https://counter.avikalp.workers.dev';

  function abbreviate(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  function hydrateCounters(root) {
    root = root || document;
    var els = root.querySelectorAll
      ? root.querySelectorAll('.counterapi')
      : document.querySelectorAll('.counterapi');

    Array.prototype.forEach.call(els, function (el) {
      // Skip already-hydrated elements (safe to call multiple times)
      if (el.getAttribute('data-hydrated')) return;
      el.setAttribute('data-hydrated', 'true');

      var ns = el.getAttribute('ns');
      var key = el.getAttribute('key');
      if (!ns || !key) return;

      var action = el.getAttribute('action') || 'view'; // view | views | vote
      var readOnly =
        el.getAttribute('readOnly') === 'true' ||
        el.getAttribute('readonly') === 'true';
      var startNumber = parseInt(el.getAttribute('startNumber') || '0', 10);
      var label = el.getAttribute('label') || '';
      var abbrev = el.getAttribute('abbreviate') === 'true';
      var unique = el.getAttribute('unique') === 'true';

      var type = action === 'vote' ? 'vote' : 'views';
      var url = WORKER_BASE + '/api/' + ns + '/' + type + '/' + key;
      var params = [];

      if (readOnly) {
        params.push('readOnly=true');
      } else if (unique && type === 'views') {
        // Only count unique visitors using localStorage
        var storageKey = 'counter_unique_' + ns + '_' + key;
        try {
          if (localStorage.getItem(storageKey)) {
            params.push('readOnly=true');
          } else {
            localStorage.setItem(storageKey, '1');
          }
        } catch (e) {
          // Private browsing — fall through, count normally
        }
      }

      if (params.length) url += '?' + params.join('&');

      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var count = (data.value || 0) + startNumber;
          var display = abbrev ? abbreviate(count) : count.toString();
          if (label) display += '\u00a0' + label; // non-breaking space
          el.textContent = display;
        })
        .catch(function () {
          el.textContent = '\u2013'; // en-dash on error
        });
    });
  }

  // Expose globally so blog.js can call after dynamic content injection
  window.hydrateCounters = hydrateCounters;

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { hydrateCounters(); });
  } else {
    hydrateCounters();
  }
})();
