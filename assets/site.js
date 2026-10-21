(function () {
  var URL = 'https://raw.githubusercontent.com/mmnt-writing/mmnt-releases/main/version.json';
  var versions = document.querySelectorAll('.js-version');
  var macs = document.querySelectorAll('.js-dl-mac');
  var wins = document.querySelectorAll('.js-dl-win');
  if (!versions.length && !macs.length) return;

  fetch(URL, { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (info) {
      if (info.version) {
        versions.forEach(function (el) {
          el.textContent = el.getAttribute('data-template').replace('{v}', info.version);
        });
      }
      if (info.macos_url) macs.forEach(function (a) { a.href = info.macos_url; });
      if (info.windows_url) {
        wins.forEach(function (a) { a.href = info.windows_url; a.hidden = false; });
      }
    })
    .catch(function () {});
})();
