(function(){
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function slug(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
var G={'axial-res':'Axial','axial-diode':'Axial','axial-glass':'Axial','axial-ind':'Axial','disc':'Radial or disc','mov-disc':'Radial or disc','elec-radial':'Radial or disc','film-box':'Radial or disc','pot':'Radial or disc','ntc':'Radial or disc','led5':'Radial or disc','ptc-disc':'Radial or disc','hc49':'Radial or disc','to92':'TO-92','to220':'TO-220, TO-247, DPAK','to247':'TO-220, TO-247, DPAK','dpak':'TO-220, TO-247, DPAK','sot23':'SOT-23, SOT-223','sot223':'SOT-23, SOT-223','dip':'DIP','dip4':'DIP','soic8':'SOIC, SOP','tqfp':'QFP, QFN','chip-res':'SMD chip','chip-cap':'SMD chip','chip-plain':'SMD chip','smd-led':'SMD chip','smd-inductor':'SMD chip','tant':'SMD chip','sma':'SMD diode','smd-electro':'SMD can'};
var list=document.getElementById('cl'),q=document.getElementById('cq'),cat=document.getElementById('cc'),pt=document.getElementById('cp'),me=document.getElementById('cm'),ct=document.getElementById('ct'),cn=document.getElementById('cn'),D,L={},M={},type='All';
function opt(s,v,t){var o=el('option','',t);o.value=v;s.appendChild(o)}
Promise.all([fetch('data/components.json').then(function(r){if(!r.ok)throw 0;return r.json()}),fetch('data/pcb/components-extra.json').then(function(r){return r.ok?r.json():{sym:{},pkg:{},items:[]}}).catch(function(){return{sym:{},pkg:{},items:[]}}),fetch('data/pcb/details.json').then(function(r){return r.ok?r.json():{methods:{},lessons:{}}}).catch(function(){return{methods:{},lessons:{}}})]).then(function(r){
 D=r[0];var E=r[1];D.items=D.items.concat(E.items||[]);for(var k in E.sym)D.sym[k]=E.sym[k];for(var j in E.pkg)D.pkg[j]=E.pkg[j];L=r[2].lessons||{};M=r[2].methods||{};
 var cs=[],ps=[],ms=[];D.items.forEach(function(i){if(cs.indexOf(i.cat)<0)cs.push(i.cat);i.pk.forEach(function(p){var g=G[p.k]||'Other';if(ps.indexOf(g)<0)ps.push(g)});(M[i.n]||[]).forEach(function(m){if(ms.indexOf(m)<0)ms.push(m)})});
 opt(cat,'','All categories');cs.sort().forEach(function(c){opt(cat,c,c)});opt(pt,'','All package types');ps.sort().forEach(function(c){opt(pt,c,c)});opt(me,'','All test methods');ms.sort().forEach(function(c){opt(me,c,c)});
 ['All','Through-hole','SMD'].forEach(function(t){var b=el('button','chip'+(t===type?' on':''),t);b.type='button';b.onclick=function(){type=t;[].forEach.call(ct.children,function(x){x.className='chip'+(x.textContent===t?' on':'')});draw()};ct.appendChild(b)});
 q.oninput=draw;cat.onchange=draw;pt.onchange=draw;me.onchange=draw;draw();
 if(location.hash){var e=document.getElementById(location.hash.slice(1));if(e){e.open=true;e.scrollIntoView()}}
}).catch(function(){cn.textContent='Could not load the components. Refresh and try again.'});
function draw(){
 list.textContent='';var s=q.value.trim().toLowerCase(),n=0;
 D.items.forEach(function(it,ix){
  var hay=(it.n+' '+it.cat+' '+it.pk.map(function(p){return p.n+' '+p.t+' '+p.s}).join(' ')+' '+it.typ.join(' ')+' '+it.mark).toLowerCase();
  if(s&&hay.indexOf(s)<0)return;
  if(cat.value&&it.cat!==cat.value)return;
  if(pt.value&&!it.pk.some(function(p){return (G[p.k]||'Other')===pt.value}))return;
  if(me.value&&(M[it.n]||[]).indexOf(me.value)<0)return;
  if(type==='Through-hole'&&!it.pk.some(function(p){return p.t==='THT'}))return;
  if(type==='SMD'&&!it.pk.some(function(p){return p.t==='SMD'}))return;
  n++;var dt=el('details','cmp');dt.id='c'+ix;
  var sm=el('summary'),sy=el('span','csym');sy.innerHTML='<svg viewBox="-4 -30 68 60" role="img" aria-label="'+it.n+' symbol">'+D.sym[it.sym]+'</svg>';sm.appendChild(sy);
  var tx=el('span','ctx');tx.appendChild(el('b','',it.n));tx.appendChild(el('span','tag',it.cat));
  if(it.pk.some(function(p){return p.t==='THT'}))tx.appendChild(el('span','tag','THT'));
  if(it.pk.some(function(p){return p.t==='SMD'}))tx.appendChild(el('span','tag','SMD'));
  if(L[slug(it.n)])tx.appendChild(el('span','tag lesson-tag','Lesson'));
  sm.appendChild(tx);dt.appendChild(sm);
  var bd=el('div','cbody'),pg=el('div','cpk');
  it.pk.forEach(function(p){if(type==='Through-hole'&&p.t!=='THT')return;if(type==='SMD'&&p.t!=='SMD')return;var f=el('div','pkc'),iv=el('div','pki');iv.innerHTML=(D.pkg[p.k]||'').replace('role="img"','role="img" aria-label="'+p.n+' package"');f.appendChild(iv);f.appendChild(el('b','',p.n+' ('+p.t+')'));if(p.s)f.appendChild(el('span','note',p.s));pg.appendChild(f)});
  bd.appendChild(pg);
  function sec(h,a){bd.appendChild(el('h3','',h));if(Array.isArray(a)){var u=el('ul');a.forEach(function(x){u.appendChild(el('li','',x))});bd.appendChild(u)}else bd.appendChild(el('p','',a))}
  sec('Typical ratings and notes',it.typ);sec('Markings and codes',it.mark);sec('How to test',it.test);
  if(M[it.n])sec('Test methods',M[it.n].join(', '));
  if(it.note){var w=el('div','box warn');w.appendChild(el('b','','Note: '));w.appendChild(document.createTextNode(it.note));bd.appendChild(w)}
  if(L[slug(it.n)]){var a=el('a','btn s','Open the full lesson');a.href='component.html?id='+slug(it.n);bd.appendChild(a)}
  dt.appendChild(bd);list.appendChild(dt)});
 cn.textContent=n?n+' of '+D.items.length+' components shown. Tap one for packages, markings and tests.':'No components match. Try a different search or filter.'}
})();
