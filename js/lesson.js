const id = new URLSearchParams(location.search).get('id') || 'charge-and-current';
const root = document.getElementById('lesson');

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function heading(t) { root.appendChild(el('h2', '', t)); }
function list(items, ordered) {
  const l = el(ordered ? 'ol' : 'ul');
  items.forEach(t => l.appendChild(el('li', '', t)));
  root.appendChild(l);
}
function getDone() {
  try { return JSON.parse(localStorage.getItem('k24-done') || '[]'); }
  catch (e) { return []; }
}
function setDone(a) {
  try { localStorage.setItem('k24-done', JSON.stringify(a)); } catch (e) {}
}

fetch('data/lessons.json')
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(data => {
    const i = data.lessons.findIndex(l => l.id === id);
    if (i < 0) { root.textContent = 'Lesson not found.'; return; }
    render(data.lessons[i], data.lessons[i - 1], data.lessons[i + 1]);
  })
  .catch(() => { root.textContent = 'Could not load the lesson. Refresh and try again.'; });

function render(L, prev, next) {
  document.title = L.title + ' | K_24 Electrical';
  root.textContent = '';

  const crumbs = el('div', 'crumbs');
  const home = el('a', '', 'Home'); home.href = 'index.html';
  crumbs.append(home, ' / ' + L.level);
  root.appendChild(crumbs);
  root.appendChild(el('h1', '', L.title));
  const tags = el('div', 'tags');
  tags.appendChild(el('span', 'tag', L.level));
  L.tags.forEach(t => tags.appendChild(el('span', 'tag', t)));
  root.appendChild(tags);

  heading('Prerequisites'); root.appendChild(el('p', '', L.prereq));
  heading('Learning objectives'); list(L.objectives);
  heading('Plain-language explanation');
  L.explain.forEach(p => root.appendChild(el('p', '', p)));
  heading('Technical definition');
  root.appendChild(el('div', 'box', L.definition));

  heading('Formulas');
  L.formulas.forEach(f => {
    const b = el('div', 'box');
    b.appendChild(el('div', 'formula', f.f));
    b.appendChild(el('div', 'note', f.note));
    root.appendChild(b);
  });

  heading('Worked example');
  const ex = el('div', 'box');
  ex.appendChild(el('p', '', L.example.question));
  const ol = el('ol');
  L.example.steps.forEach(s => ol.appendChild(el('li', '', s)));
  ex.appendChild(ol);
  ex.appendChild(el('p', '', 'Answer: ' + L.example.answer));
  root.appendChild(ex);

  heading('Practical applications'); list(L.applications);
  heading('Common mistakes'); list(L.mistakes);
  heading('Safety note'); root.appendChild(el('div', 'box warn', L.safety));

  heading('Quick quiz');
  L.quiz.forEach((q, n) => {
    const box = el('div', 'q');
    box.appendChild(el('strong', '', (n + 1) + '. ' + q.q));
    const why = el('p', 'why');
    q.options.forEach((o, k) => {
      const b = el('button', 'opt', o);
      b.type = 'button';
      b.addEventListener('click', () => {
        box.querySelectorAll('.opt').forEach(x => x.disabled = true);
        b.classList.add(k === q.answer ? 'right' : 'wrong');
        if (k !== q.answer) box.querySelectorAll('.opt')[q.answer].classList.add('right');
        why.textContent = (k === q.answer ? 'Correct. ' : 'Not quite. ') + q.why;
      });
      box.appendChild(b);
    });
    box.appendChild(why);
    root.appendChild(box);
  });

  heading('Revision summary'); list(L.summary);

  const done = el('button', 'done-btn');
  done.type = 'button';
  function paint() {
    const on = getDone().includes(L.id);
    done.textContent = on ? '\u2713 Lesson completed' : 'Mark lesson complete';
    done.classList.toggle('on', on);
  }
  done.addEventListener('click', () => {
    let d = getDone();
    d = d.includes(L.id) ? d.filter(x => x !== L.id) : d.concat(L.id);
    setDone(d); paint();
  });
  paint();
  root.appendChild(done);
  root.appendChild(el('p', 'note', 'Progress is saved only in this browser on this device.'));

  const pager = el('div', 'pager');
  [[prev, '\u2190 '], [next, ' \u2192']].forEach(([x, arrow], idx) => {
    if (!x) { pager.appendChild(el('span')); return; }
    const a = el('a', '', idx === 0 ? arrow + x.title : x.title + arrow);
    a.href = 'lesson.html?id=' + x.id;
    pager.appendChild(a);
  });
  root.appendChild(pager);
}
