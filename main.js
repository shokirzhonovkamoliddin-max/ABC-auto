(function () {
  var body = document.body;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Missing photos should not leave broken-image icons in the layout.
     Add the named assets listed in RASMLAR.txt to show the real images. */
  $$('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.classList.add('image-missing');
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
    }, { once: true });
  });

  /* Burger menyu (hamma sahifada) */
  function drawer(open) {
    body.classList.toggle('drawer-open', open);
    var d = document.getElementById('drawer'), b = document.querySelector('.burger');
    if (d) d.setAttribute('aria-hidden', !open);
    if (b) b.setAttribute('aria-expanded', open);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.burger')) return drawer(true);
    if (e.target.closest('[data-drawer-close]') || e.target.closest('.drawer a')) drawer(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') drawer(false); });

  /* Komplektatsiyalar: ochish/yopish */
  $$('.trim-head').forEach(function (h) {
    h.addEventListener('click', function () {
      var open = h.parentNode.classList.toggle('open');
      h.setAttribute('aria-expanded', open);
    });
  });

  /* Spetspredlojeniya: yoqish/o'chirish va jami chegirma */
  var cards = $$('.sw-card'), sum = document.getElementById('sum');
  function total() {
    var s = 0;
    cards.forEach(function (c) { if (c.classList.contains('on')) s += +c.dataset.sum; });
    if (sum) sum.textContent = Math.min(s, 500000).toLocaleString('ru-RU') + ' ₽';
  }
  cards.forEach(function (c) {
    var sw = c.querySelector('.sw');
    sw.addEventListener('click', function () {
      var on = c.classList.toggle('on');
      sw.setAttribute('aria-pressed', on);
      total();
    });
  });

  /* Rang tanlash */
  $$('.dot').forEach(function (d) {
    d.addEventListener('click', function () {
      $$('.dot').forEach(function (x) { x.classList.remove('on'); });
      d.classList.add('on');
      var n = document.getElementById('color-name');
      if (n) n.textContent = d.dataset.name;
    });
  });

  /* Model sahifasi tablari */
  var tabs = $$('.model-tabs a');
  tabs.forEach(function (a) {
    a.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      a.classList.add('active');
    });
  });

  /* Galereya: Экстерьер / Интерьер, strelkalar, kichik rasmlar */
  var gal = document.querySelector('.gal');
  if (gal) {
    var main = gal.querySelector('.gal-main'), thumbs = $$('.gal-thumbs button', gal), cur = 0, set = 'ext';
    var list = function () { return thumbs.filter(function (t) { return t.dataset.set === set; }); };
    var show = function (i) {
      var l = list();
      cur = (i + l.length) % l.length;
      main.style.backgroundImage = l[cur].style.backgroundImage;
      thumbs.forEach(function (t) { t.classList.toggle('on', t === l[cur]); });
    };
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () { show(list().indexOf(t)); });
    });
    gal.querySelector('.prev').addEventListener('click', function () { show(cur - 1); });
    gal.querySelector('.next').addEventListener('click', function () { show(cur + 1); });
    $$('.gal-tabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        set = b.dataset.set;
        $$('.gal-tabs button').forEach(function (x) { x.classList.toggle('active', x === b); });
        thumbs.forEach(function (t) { t.hidden = t.dataset.set !== set; });
        show(0);
      });
    });
    thumbs.forEach(function (t) { t.hidden = t.dataset.set !== set; });
    show(0);
  }

  /* Strelkalar: data-scroll bor qatorni suradi */
  $$('.arrows').forEach(function (a) {
    var s = a.closest('.section'), t = s && s.querySelector('[data-scroll]');
    if (!t) return;
    $$('button', a).forEach(function (b, k) {
      b.addEventListener('click', function () {
        t.scrollBy({ left: (k ? 1 : -1) * t.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  });
})();
