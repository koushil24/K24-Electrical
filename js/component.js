(function(){
var root=document.getElementById('cd');
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function slug(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
var id=new URLSearchParams(location.search).get('id')||'';
Promise.all([fetch('data/components.json').then(function(r){if(!r.ok)throw 0;return r.json()}),fetch('data/pcb/components-extra.json').then(function(r){return r.ok?r.json():{sym:{},pkg:{},items:[]}}).catch(function(){return{sym:{},pkg:{},items:[]}}),fetch('data/pcb/details.json').then(function(r){if(!r.ok)throw 0;return r.json()})]).then(function(r){
 var D=r[0],E=r[1],X=r[2];D.items=D.items.concat(E.items||[]);for(var k in E.sym)D.sym[k]=E.sym[k];for(var j in E.pkg)D.pkg[j]=E.pkg[j];
 var it=D.items.filter(function(i){return slug(i.n)===id})[0];
 if(!it){bad('Component not found.');return}
 var L=X.lessons[id],M=X.methods[it.n]||[];render(D,it,L,M,X)
}).catch(function(){bad('Could not load the lesson. Refresh and try again.')});
function bad(m){root.textContent='';root.appendChild(el('p','',m));var a=el('a','btn s','Back to components');a.href='components.html';root.appendChild(a)}
function render(D,it,L,M,X){
 document.title=it.n+' | PCB LAB | K_24 Electrical';root.textContent='';
 var cr=el('p','crumbs'),a1=el('a','','PCB LAB');a1.href='pcb-lab.html';var a2=el('a','','Components');a2.href='components.html';cr.appendChild(a1);cr.appendChild(document.createTextNode(' / '));cr.appendChild(a2);cr.appendChild(document.createTextNode(' / '+it.n));root.appendChild(cr);
 root.appendChild(el('h1','',it.n));
 var tg=el('div','tags');[it.cat].concat(it.pk.some(function(p){return p.t==='THT'})?['Through-hole']:[],it.pk.some(function(p){return p.t==='SMD'})?['SMD']:[],M).forEach(function(t){tg.appendChild(el('span','tag',t))});root.appendChild(tg);
 var sy=el('div','cd-sym');sy.innerHTML='<svg viewBox="-4 -30 68 60" role="img" aria-label="'+it.n+' symbol">'+D.sym[it.sym]+'</svg>';root.appendChild(sy);
 function H(t){root.appendChild(el('h2','',t))}
 function P(t){root.appendChild(el('p','',t))}
 function U(a,o){var u=el(o?'ol':'ul');a.forEach(function(x){u.appendChild(el('li','',x))});root.appendChild(u)}
 if(!L){H('Basic information');P('A detailed lesson for this component is not written yet.');H('Typical ratings');U(it.typ);H('Markings and codes');P(it.mark);H('How to test');P(it.test)}
 else{
  H('What it does');P(L.does);H('Working principle');P(L.principle);
  H('Circuit symbol and appearance');P('The symbol is shown above. The drawings below show the through-hole and SMD packages.');
  var pg=el('div','cpk');it.pk.forEach(function(p){var f=el('div','pkc'),iv=el('div','pki');iv.innerHTML=(D.pkg[p.k]||'').replace('role="img"','role="img" aria-label="'+p.n+' package"');f.appendChild(iv);f.appendChild(el('b','',p.n+' ('+p.t+')'));if(p.s)f.appendChild(el('span','note',p.s));pg.appendChild(f)});root.appendChild(pg);
  H('Markings and codes');P(it.mark);H('Polarity and pin identification');P(L.polarity);
  H('Typical ratings');U(it.typ);H('Common applications');U(L.apps);
  H('How to test with a multimeter');U(L.steps,true);
  H('Expected behaviour');U(L.expect);H('Common faulty readings');U(L.faulty);
  H('In circuit and out of circuit');P(L.incircuit);
  H('Common failure symptoms');U(L.symptoms);
  H('Troubleshooting example');root.appendChild(el('div','box',L.example));
  H('Safety');root.appendChild(el('div','box warn',L.safety));
  H('References');U(L.refs);root.appendChild(el('p','note','Company procedures and the manufacturer datasheet override the typical values here. Meter readings can be misleading in circuit, and a multimeter cannot fully test every component.'))}
 var ids=Object.keys(X.lessons),ix=ids.indexOf(slug(it.n)),pgr=el('div','pager');
 [ix-1,ix+1].forEach(function(k,n){var s=D.items.filter(function(i){return slug(i.n)===ids[k]})[0];if(!ids[k]||!s){pgr.appendChild(el('span'));return}var a=el('a','',(n?s.n+' \u2192':'\u2190 '+s.n));a.href='component.html?id='+ids[k];pgr.appendChild(a)});root.appendChild(pgr);
 var rel=D.items.filter(function(i){return i.cat===it.cat&&i.n!==it.n&&X.lessons[slug(i.n)]}).slice(0,4);
 if(rel.length){H('Related lessons');var u=el('ul');rel.forEach(function(i){var li=el('li'),a=el('a','',i.n);a.href='component.html?id='+slug(i.n);li.appendChild(a);u.appendChild(li)});root.appendChild(u)}
 var b=el('a','btn s g','Back to all components');b.href='components.html';b.style.marginTop='20px';root.appendChild(b)}
})();
