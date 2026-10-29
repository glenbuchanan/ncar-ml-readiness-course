
(function () {
  'use strict';
  var S = null;
  try { if (window.parent && window.parent !== window && window.parent.MLSCORM) S = window.parent.MLSCORM; } catch (e) { S = null; }
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var pages = all('.lesson-page');
  var lessonTitle = document.title;   // the <title> as rendered: the lesson's name, kept as the suffix of every page title below
  function pageId(el) { return el.id.replace(/^page_/, ''); }
  function show(id) {
    var target = null;
    pages.forEach(function (p) { var on = pageId(p) === id; p.style.display = on ? '' : 'none'; if (on) target = p; });
    if (!target) return false;
    var head = target.querySelector('h3.sub_head');
    document.title = head ? head.textContent.replace(/\s+/g, ' ').trim() + ' \u2014 ' + lessonTitle : lessonTitle;
    all('#menu a').forEach(function (a) { a.classList.remove('menu_here'); });
    all('#menu ul ul').forEach(function (ul) { ul.style.display = 'none'; });
    var link = document.querySelector('#menu a[href="#page_' + id + '"]');
    if (link) {
      link.classList.add('menu_here');
      var node = link.parentNode;
      while (node && node.id !== 'menu') { if (node.tagName === 'UL') node.style.display = 'block'; node = node.parentNode; }
    }
    window.scrollTo(0, 0);
    if (S) S.visit(id);
    return true;
  }
  function route() {
    var id = (location.hash || '').replace(/^#(page_)?/, '');
    if (!id && S && S.bookmark()) id = S.bookmark();
    if (!id || !show(id)) show(pageId(pages[0]));
  }
  var navbar = document.querySelector('.navbar-fixed-top');
  var clearance = ((navbar && navbar.offsetHeight) || 51) + 12;
  all('.lesson-page, section.page[id^="page_"]').forEach(function (p) { p.style.scrollMarginTop = clearance + 'px'; });
  document.documentElement.style.scrollPaddingTop = clearance + 'px';
  if (pages.length) { window.addEventListener('hashchange', route); route(); }

  var sections = pages.length ? [] : all('section.page[id^="page_"]');
  if (sections.length && S) {
    var seen = {};
    function sawSection(el) {
      var id = pageId(el);
      if (seen[id]) return;
      seen[id] = true;
      S.visit(id);
    }
    function inView(el) {
      var r = el.getBoundingClientRect(), h = window.innerHeight || document.documentElement.clientHeight;
      return r.bottom > 0 && r.top < h;
    }
    if (typeof IntersectionObserver === 'function') {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { sawSection(e.target); io.unobserve(e.target); } });
      }, { threshold: 0 });
      sections.forEach(function (el) { io.observe(el); });
    } else {
      var poll = function () { sections.forEach(function (el) { if (!seen[pageId(el)] && inView(el)) sawSection(el); }); };
      window.addEventListener('scroll', poll); window.addEventListener('resize', poll); window.addEventListener('load', poll);
      poll();
    }
  }

  function dropTemplateModals() {
    var qp = document.getElementById('quiz-prompt');
    if (qp && qp.children.length) { qp.innerHTML = ''; qp.setAttribute('data-ml-template-modals', 'removed'); }
    ['userQuiz', 'userSurvey'].forEach(function (id) { var m = document.getElementById(id); if (m && m.parentNode) m.parentNode.removeChild(m); });
  }
  dropTemplateModals();
  window.addEventListener('load', dropTemplateModals);
  (function () {
    var qp = document.getElementById('quiz-prompt');
    if (qp && typeof MutationObserver === 'function') new MutationObserver(dropTemplateModals).observe(qp, { childList: true });
  })();

  all('.question-wrap.radio .submit-button, .question-wrap.checkboxes .submit-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.question-wrap');
      if (!wrap || wrap.getAttribute('data-ml-reported')) return;
      var inputs = all('input[type=radio], input[type=checkbox]', wrap);
      var checked = inputs.filter(function (i) { return i.checked; });
      if (!checked.length) return;                       // defaults.js shows "Please make a selection."
      wrap.setAttribute('data-ml-reported', '1');
      var response = checked.map(function (i) { return i.value; }).sort();
      var correct = all('.response-group-item.correct input', wrap).map(function (i) { return i.value; }).sort();
      var rec = { id: inputs[0].name, type: 'choice', response: response, correct: correct,
                  result: response.join(',') === correct.join(',') ? 'correct' : 'wrong' };
      if (S) S.interaction(rec);
    });
  });

  all('.question-wrap .submit-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.question-wrap');
      if (!wrap) return;
      window.setTimeout(function () {
        var ans = wrap.querySelector('.answer');
        if (!ans || getComputedStyle(ans).display === 'none') return;   // "Please make a selection." — nothing revealed
        if (!ans.hasAttribute('tabindex')) ans.setAttribute('tabindex', '-1');
        ans.focus({ preventScroll: false });
      }, 0);
    });
  });
})();
