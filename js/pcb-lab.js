(function(){
var RK='k24-pcb-recent',EK='k24-pcb-explored';
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
function get(k){try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}}
function put(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function remember(t,href,id){if(!href)return;var r=get(RK).filter(function(x){return x.href!==href});r.unshift({t:t,href:href});put(RK,r.slice(0,6));if(id){var e=get(EK);if(e.indexOf(id)<0){e.push(id);put(EK,e)}}}
function recent(){var u=document.getElementById('rc');u.textContent='';var r=get(RK);
 if(!r.length){u.appendChild(el('li','pl-empty','Nothing explored yet. Open a card or search result and it will appear here. This list is saved only in this browser.'));return}
 r.forEach(function(x){var li=el('li'),a=el('a','',x.t);a.href=x.href;li.appendChild(a);u.appendChild(li)})}
var D,C=[];
Promise.all([fetch('data/pcb/topics.json').then(function(r){if(!r.ok)throw 0;return r.json()}),fetch('data/components.json').then(function(r){return r.ok?r.json():{items:[]}}).catch(function(){return{items:[]}})]).then(function(res){D=res[0];C=res[1].items||[];build()}).catch(function(){document.getElementById('pg').textContent='Could not load PCB LAB. Refresh and try again.'});
function st(s){return el('span','pl-st '+(s==='live'?'live':'soon'),s==='live'?'AVAILABLE':'COMING SOON')}
function build(){
 var g=document.getElementById('pg');g.textContent='';var live=0;
 D.sections.forEach(function(s,i){if(s.status==='live')live++;
  var c=el(s.status==='live'?'a':'div','pl-card');if(s.status==='live'){c.href=s.href;c.onclick=function(){remember(s.title,s.href,s.id)}}
  var tp=el('div','pl-top');tp.appendChild(el('b','','0'+(i+1)));tp.appendChild(st(s.status));c.appendChild(tp);
  c.appendChild(el('h3','',s.title));c.appendChild(el('p','',s.desc+(s.id==='lib'&&C.length?' Currently '+C.length+' components.':'')));
  var u=el('ul');s.topics.forEach(function(t){u.appendChild(el('li','',t))});c.appendChild(u);g.appendChild(c)});
 var ex=get(EK).filter(function(id){return D.sections.some(function(s){return s.id===id&&s.status==='live'})}).length;
 document.getElementById('ps').textContent=live+' of '+D.sections.length+' PCB LAB sections are available. The rest are being built step by step.';
 document.getElementById('pb').style.width=(live/D.sections.length*100)+'%';
 document.getElementById('pe').textContent='You have explored '+ex+' of '+live+' available section'+(live===1?'':'s')+' on this device. Progress is saved only in this browser.';
 var q=document.getElementById('pq2');q.textContent='';
 D.quick.forEach(function(x){var c=el(x.status==='live'?'a':'div','pl-card');if(x.status==='live'){c.href=x.href;c.onclick=function(){remember(x.t,x.href)}}
  c.appendChild(el('h3','',x.t));c.appendChild(el('p','',x.d));c.appendChild(st(x.status));q.appendChild(c)});
 document.getElementById('start').onclick=function(){remember('Component Library','components.html','lib')};
 recent()}
var q=document.getElementById('pq'),res=document.getElementById('pr');
function row(t,href,tag){var d=el('div');if(href){var a=el('a','',t);a.href=href;a.onclick=function(){remember(t,href)};d.appendChild(a)}else{d.appendChild(el('span','m',t+' (coming soon)'))}if(tag)d.appendChild(el('span','m','  '+tag));return d}
q.addEventListener('input',function(){
 var s=q.value.trim().toLowerCase();res.textContent='';
 if(s.length<2||!D){res.style.display='none';return}
 var n=0;
 C.forEach(function(c,i){if(n<8&&(c.n+' '+c.cat+' '+c.pk.map(function(p){return p.n}).join(' ')).toLowerCase().indexOf(s)>-1){n++;res.appendChild(row(c.n,'components.html#c'+i,'component'))}});
 D.topics.forEach(function(t){if(n<12&&t.t.toLowerCase().indexOf(s)>-1){n++;res.appendChild(row(t.t,t.status==='live'?t.href:''))}});
 if(!n)res.appendChild(el('div','m','No matches. Try a component name such as MOSFET, 0805 or relay.'));
 res.style.display='block'});
document.addEventListener('click',function(e){if(!e.target.closest('.pl-search'))res.style.display='none'});
})();
