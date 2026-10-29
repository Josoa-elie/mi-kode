(function () {
  var wrap = document.querySelector('.ci-wrap');
  if (!wrap) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var items = Array.prototype.slice.call(wrap.querySelectorAll('[data-ci]'));
  wrap.classList.add('ci-anim');

  function play() {
    items.forEach(function (el) {
      setTimeout(function () { el.classList.add('ci-in'); }, +el.getAttribute('data-ci'));
      var out = el.getAttribute('data-ci-out');
      if (out) setTimeout(function () { el.classList.add('ci-out'); }, +out);
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); play(); }
    }, { threshold: 0.4 });
    io.observe(wrap);
  } else {
    play();
  }
})();
