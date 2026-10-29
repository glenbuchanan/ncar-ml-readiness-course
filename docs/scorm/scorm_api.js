
(function (global) {
  'use strict';
  var REQUIRED_PAGES = global.MLSCORM_REQUIRED_PAGES || [];
  var api = null, initialised = false, finished = false, started = Date.now();
  var state = { visited: [], answers: {}, status: null, location: '', standalone: true };
  var log = [];

  function findAPI(win) {
    var hops = 0;
    while (win && hops < 10) {
      var found = null;
      try { found = win.API; } catch (e) { found = null; }   // a cross-origin frame throws; keep walking
      if (found) return found;
      var up = null;
      try { up = win.parent; } catch (e) { up = null; }
      if (!up || up === win) return null;
      win = up; hops++;
    }
    return null;
  }
  function locate() {
    var a = findAPI(global);
    if (!a) { try { if (global.opener) a = findAPI(global.opener); } catch (e) { a = null; } }
    return a;
  }

  function get(k) {
    if (!api) return '';
    var v = '';
    try { v = String(api.LMSGetValue(k)); } catch (e) { v = ''; }
    log.push(['get', k, v]);
    return v;
  }
  function set(k, v) {
    if (!api) { log.push(['set:standalone', k, String(v)]); return false; }
    var ok = false;
    try { ok = String(api.LMSSetValue(k, String(v))) === 'true'; } catch (e) { ok = false; }
    log.push(['set', k, String(v), ok]);
    if (!ok) { try { var c = String(api.LMSGetLastError()); log.push(['error', c, String(api.LMSGetErrorString(c))]); } catch (e) {} }
    return ok;
  }
  function commit() {
    if (!api) return false;
    var ok = false;
    try { ok = String(api.LMSCommit('')) === 'true'; } catch (e) { ok = false; }
    log.push(['commit', ok]);
    return ok;
  }

  function pad(n, w) { n = String(Math.floor(n)); while (n.length < (w || 2)) n = '0' + n; return n; }
  function timespan(ms) {               // CMITimespan HHHH:MM:SS.SS
    var s = ms / 1000, h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return pad(h, 4) + ':' + pad(m) + ':' + pad(sec) + '.' + pad(Math.floor((sec % 1) * 100));
  }
  function clock() {                    // CMITime HH:MM:SS — no fractional part: the RTE makes '.SS' optional and scorm-again
    var d = new Date();                 // (2.6.5, scorm12 CMITime regex) rejects it with 101 'Incorrect Data Type'
    return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  function saveSuspend() {
    var s = JSON.stringify({ v: state.visited, q: state.answers });
    if (s.length > 4000) s = JSON.stringify({ v: state.visited, q: {} });   // the page list is what resume needs
    set('cmi.suspend_data', s);
  }
  function allVisited() {
    if (!REQUIRED_PAGES.length) return false;
    for (var i = 0; i < REQUIRED_PAGES.length; i++) if (state.visited.indexOf(REQUIRED_PAGES[i]) < 0) return false;
    return true;
  }

  function init() {
    api = locate();
    state.standalone = !api;
    state.status = 'incomplete';
    if (!api) { log.push(['no-api']); return false; }
    var ok = false;
    try { ok = String(api.LMSInitialize('')) === 'true'; } catch (e) { ok = false; }
    log.push(['init', ok]);
    if (!ok) { api = null; state.standalone = true; return false; }
    initialised = true;
    var st = get('cmi.core.lesson_status');
    if (st === '' || st === 'not attempted') { set('cmi.core.lesson_status', 'incomplete'); st = 'incomplete'; }
    state.status = st;
    state.location = get('cmi.core.lesson_location');
    var sd = get('cmi.suspend_data');
    if (sd) {
      try {
        var o = JSON.parse(sd);
        if (o && o.v && o.v.slice) state.visited = o.v.slice();
        if (o && o.q && typeof o.q === 'object') state.answers = o.q;
      } catch (e) {}
    }
    commit();
    return true;
  }

  function visit(id) {
    if (!id) return;
    if (state.visited.indexOf(id) < 0) state.visited.push(id);
    state.location = id;
    set('cmi.core.lesson_location', id);
    saveSuspend();
    if (state.status !== 'completed' && state.status !== 'passed' && allVisited()) {
      set('cmi.core.lesson_status', 'completed');
      state.status = 'completed';
    }
    commit();
  }

  function interaction(o) {   // {id, type, response: ['a','c'], correct: ['a','c'], result: 'correct'|'wrong'}
    if (!o || !o.id) return;
    state.answers[o.id] = o.response.join(',');
    var n = parseInt(get('cmi.interactions._count'), 10);
    if (isNaN(n) || n < 0) n = 0;
    var p = 'cmi.interactions.' + n + '.';
    set(p + 'id', o.id);
    set(p + 'type', o.type || 'choice');
    set(p + 'correct_responses.0.pattern', o.correct.join(','));
    set(p + 'student_response', o.response.join(','));
    set(p + 'result', o.result);
    set(p + 'weighting', '0');
    set(p + 'time', clock());
    saveSuspend();
    commit();
  }

  function finish() {
    if (finished) return;
    finished = true;
    if (!api || !initialised) return;
    set('cmi.core.session_time', timespan(Date.now() - started));
    set('cmi.core.exit', state.status === 'completed' ? '' : 'suspend');
    commit();
    var ok = false;
    try { ok = String(api.LMSFinish('')) === 'true'; } catch (e) { ok = false; }
    log.push(['finish', ok]);
  }

  global.MLSCORM = {
    init: init, visit: visit, interaction: interaction, finish: finish,
    bookmark: function () { return state.location; },
    visited: function () { return state.visited.slice(); },
    answers: function () { return state.answers; },
    status: function () { return state.status; },
    standalone: function () { return state.standalone; },
    required: REQUIRED_PAGES, log: log, _timespan: timespan
  };
  if (global.addEventListener) {
    global.addEventListener('pagehide', finish);
    global.addEventListener('beforeunload', finish);
    global.addEventListener('unload', finish);
  }
})(typeof window !== 'undefined' ? window : this);
