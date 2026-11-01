var id=new URLSearchParams(location.search).get('id')||'charge-and-current';
var root=document.getElementById('lesson');
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function hd(t){root.appendChild(el('h2','',t))}
function ls(a){var u=el('ul');a.forEach(function(t){u.appendChild(el('li','',t))});root.appendChild(u)}
function gd(){try{return JSON.parse(localStorage.getItem('k24-done')||'[]')}catch(e){return[]}}
function sd(a){try{localStorage.setItem('k24-done',JSON.stringify(a))}catch(e){}}
fetch('lessons.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
 var i=d.lessons.findIndex(function(l){return l.id===id});
 if(i<0){root.textContent='Lesson not found. Go back to Learn.';return}
 render(d.lessons[i],d.lessons[i-1],d.lessons[i+1]);
}).catch(function(){root.textContent='Could not load the lesson. Refresh and try again.'});
function render(L,prev,next){
 document.title=L.title+' | K_24 Electrical';root.textContent='';
 root.appendChild(el('div','crumbs','Learn / '+L.level));
 root.appendChild(el('h1','',L.title));
 var tg=el('div','tags');[L.level].concat(L.tags).forEach(function(t){tg.appendChild(el('span','tag',t))});root.appendChild(tg);
 hd('Prerequisites');root.appendChild(el('p','',L.prereq));
 hd('Learning objectives');ls(L.objectives);
 hd('Plain-language explanation');L.explain.forEach(function(p){root.appendChild(el('p','',p))});
 hd('Technical definition');root.appendChild(el('div','box',L.definition));
 hd('Formulas');L.formulas.forEach(function(f){var b=el('div','box');b.appendChild(el('div','formula',f.f));b.appendChild(el('div','note',f.note));root.appendChild(b)});
 hd('Worked example');var ex=el('div','box');ex.appendChild(el('p','',L.example.question));
 var ol=el('ol');L.example.steps.forEach(function(s){ol.appendChild(el('li','',s))});ex.appendChild(ol);
 ex.appendChild(el('p','','Answer: '+L.example.answer));root.appendChild(ex);
 hd('Practical applications');ls(L.applications);
 hd('Common mistakes');ls(L.mistakes);
 hd('Safety note');root.appendChild(el('div','box warn',L.safety));
 hd('Quick quiz');
 L.quiz.forEach(function(q,n){var box=el('div','q');box.appendChild(el('strong','',(n+1)+'. '+q.q));var why=el('p','note');
  q.options.forEach(function(o,k){var b=el('button','opt',o);b.type='button';
   b.onclick=function(){var all=box.querySelectorAll('.opt');all.forEach(function(x){x.disabled=true});
    b.classList.add(k===q.answer?'right':'wrong');all[q.answer].classList.add('right');
    why.textContent=(k===q.answer?'Correct. ':'Not quite. ')+q.why};box.appendChild(b)});
  box.appendChild(why);root.appendChild(box)});
 hd('Revision summary');ls(L.summary);
 var dn=el('button','btn g');dn.type='button';
 function paint(){var on=gd().indexOf(L.id)>-1;dn.textContent=on?'\u2713 Lesson completed':'Mark lesson complete'}
 dn.onclick=function(){var d=gd();d=d.indexOf(L.id)>-1?d.filter(function(x){return x!==L.id}):d.concat(L.id);sd(d);paint()};
 paint();root.appendChild(el('p'));root.appendChild(dn);
 root.appendChild(el('p','note','Progress is saved only in this browser on this device.'));
 var pg=el('div','pager');
 [[prev,0],[next,1]].forEach(function(p){if(!p[0]){pg.appendChild(el('span'));return}
  var a=el('a','',p[1]?p[0].title+' \u2192':'\u2190 '+p[0].title);a.href='lesson.html?id='+p[0].id;pg.appendChild(a)});
 root.appendChild(pg);
}
