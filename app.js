(function(){
var N=[['index.html','Home'],['learn.html','Learn'],['tools.html','Tools']];
var page=location.pathname.split('/').pop()||'index.html';
var root=document.documentElement;
try{var t=localStorage.getItem('k24-theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
var h='<div class="wrap bar"><a href="index.html"><img src="logo.png" alt="K_24 Electrical home"></a><div class="links" id="lk">';
N.forEach(function(n){h+='<a href="'+n[0]+'"'+(page===n[0]?' aria-current="page"':'')+'>'+n[1]+'</a>'});
h+='</div><div class="sbox"><input id="q" type="search" placeholder="Search topics" aria-label="Search topics"><div id="res"></div></div><button class="ib" id="th" aria-label="Switch light or dark theme">&#9788;</button><button class="ib" id="mb" aria-label="Menu" aria-expanded="false">&#9776;</button></div>';
document.getElementById('nav').innerHTML=h;
document.getElementById('th').onclick=function(){
 var n=root.getAttribute('data-theme')==='light'?'dark':'light';
 root.setAttribute('data-theme',n);try{localStorage.setItem('k24-theme',n)}catch(e){}};
var mb=document.getElementById('mb');
mb.onclick=function(){var o=document.getElementById('lk').classList.toggle('open');mb.setAttribute('aria-expanded',o)};
var idx=null,q=document.getElementById('q'),res=document.getElementById('res');
function msg(s){res.textContent='';var d=document.createElement('div');d.textContent=s;res.appendChild(d);res.style.display='block'}
q.addEventListener('input',function(){
 var s=q.value.trim().toLowerCase();
 if(s.length<2){res.style.display='none';return}
 (idx?Promise.resolve(idx):fetch('syllabus.json').then(function(r){return r.json()}).then(function(d){return idx=d}))
 .then(function(d){
  res.textContent='';var n=0;
  d.groups.forEach(function(g){g.topics.forEach(function(tp){
   if(n<8&&(tp.t.toLowerCase().indexOf(s)>-1||g.title.toLowerCase().indexOf(s)>-1)){
    n++;var r=document.createElement('div');
    if(tp.id){var a=document.createElement('a');a.href='lesson.html?id='+tp.id;a.textContent=tp.t;r.appendChild(a)}
    else{r.textContent=tp.t+' (planned)';r.style.color='var(--muted)'}
    res.appendChild(r)}})});
  if(!n)msg('No matches.');else res.style.display='block'})
 .catch(function(){msg('Search could not load.')});
});
document.addEventListener('click',function(e){if(!e.target.closest('.sbox'))res.style.display='none'});
})();
