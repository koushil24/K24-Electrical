(function(){
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
var list=document.getElementById('cl'),q=document.getElementById('cq'),cat=document.getElementById('cc'),ct=document.getElementById('ct'),cn=document.getElementById('cn'),D,type='All';
fetch('data/components.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
 D=d;var cs=['All categories'];d.items.forEach(function(i){if(cs.indexOf(i.cat)<0)cs.push(i.cat)});
 cs.forEach(function(c){var o=el('option','',c);o.value=c;cat.appendChild(o)});
 ['All','Through-hole','SMD'].forEach(function(t){var b=el('button','chip'+(t===type?' on':''),t);b.type='button';b.onclick=function(){type=t;[].forEach.call(ct.children,function(x){x.className='chip'+(x.textContent===t?' on':'')});draw()};ct.appendChild(b)});
 q.oninput=draw;cat.onchange=draw;draw();
 if(location.hash){var e=document.getElementById(location.hash.slice(1));if(e){e.open=true;e.scrollIntoView()}}
}).catch(function(){cn.textContent='Could not load the components. Refresh and try again.'});
function draw(){
 list.textContent='';var s=q.value.trim().toLowerCase(),n=0;
 D.items.forEach(function(it,ix){
  var tt=it.pk.map(function(p){return p.n+' '+p.t+' '+p.s}).join(' ');
  var hay=(it.n+' '+it.cat+' '+tt+' '+it.typ.join(' ')+' '+it.mark).toLowerCase();
  if(s&&hay.indexOf(s)<0)return;
  if(cat.value!=='All categories'&&it.cat!==cat.value)return;
  if(type==='Through-hole'&&!it.pk.some(function(p){return p.t==='THT'}))return;
  if(type==='SMD'&&!it.pk.some(function(p){return p.t==='SMD'}))return;
  n++;var dt=el('details','cmp');dt.id='c'+ix;
  var sm=el('summary');var sy=el('span','csym');sy.innerHTML='<svg viewBox="-4 -30 68 60" role="img" aria-label="'+it.n+' symbol">'+D.sym[it.sym]+'</svg>';sm.appendChild(sy);
  var tx=el('span','ctx');tx.appendChild(el('b','',it.n));tx.appendChild(el('span','tag',it.cat));
  if(it.pk.some(function(p){return p.t==='THT'}))tx.appendChild(el('span','tag','THT'));
  if(it.pk.some(function(p){return p.t==='SMD'}))tx.appendChild(el('span','tag','SMD'));
  sm.appendChild(tx);dt.appendChild(sm);
  var bd=el('div','cbody'),pg=el('div','cpk');
  it.pk.forEach(function(p){if(type==='Through-hole'&&p.t!=='THT')return;if(type==='SMD'&&p.t!=='SMD')return;var f=el('div','pkc');var iv=el('div','pki');iv.innerHTML=D.pkg[p.k].replace('role="img"','role="img" aria-label="'+p.n+' package"');f.appendChild(iv);f.appendChild(el('b','',p.n+' ('+p.t+')'));if(p.s)f.appendChild(el('span','note',p.s));pg.appendChild(f)});
  bd.appendChild(pg);
  function sec(h,a){bd.appendChild(el('h3','',h));if(Array.isArray(a)){var u=el('ul');a.forEach(function(x){u.appendChild(el('li','',x))});bd.appendChild(u)}else bd.appendChild(el('p','',a))}
  sec('Typical ratings and notes',it.typ);sec('Markings and codes',it.mark);sec('How to test',it.test);
  if(it.note){var w=el('div','box warn');w.appendChild(el('b','','Note: '));w.appendChild(document.createTextNode(it.note));bd.appendChild(w)}
  dt.appendChild(bd);list.appendChild(dt)});
 cn.textContent=n+' of '+D.items.length+' components shown. Tap one to see packages, markings and tests.';
 if(!n)cn.textContent='No components match. Try a different search or filter.'}
})();
