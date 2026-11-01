(function(){
function fmt(n){return String(Number(n.toPrecision(5)))}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var PA='M40,30 H260 V130 H40 Z';
function loop(I,lab){
 var d='',n=I>0&&isFinite(I);
 if(n){var s=Math.max(.7,Math.min(8,8/Math.max(I,.5)));
  if(reduce)d='<circle cx="150" cy="30" r="5" class="dot"/>';
  else for(var i=0;i<4;i++)d+='<circle r="5" class="dot"><animateMotion dur="'+s+'s" begin="-'+(s*i/4)+'s" repeatCount="indefinite" path="'+PA+'"/></circle>'}
 return '<svg viewBox="0 0 300 170" role="img" aria-label="Circuit with current flowing"><path class="ln" d="'+PA+'"/><rect x="25" y="70" width="30" height="20" class="bg"/><line class="ln" x1="28" y1="76" x2="52" y2="76"/><line class="ln" x1="36" y1="86" x2="44" y2="86"/><rect x="120" y="20" width="60" height="20" class="bg"/><polyline class="ln" points="122,30 130,20 140,40 150,20 160,40 170,20 178,30"/>'+d+'<text x="150" y="160" text-anchor="middle" class="mu">'+(lab||'Current flows round the loop')+'</text></svg>'}
function tri(k){
 function L(c,x,y){return '<text data-k="'+c+'" x="'+x+'" y="'+y+'" text-anchor="middle"'+(k===c?' class="on"':'')+'>'+c+'</text>'}
 return '<svg class="tri" viewBox="0 0 300 190" role="img" aria-label="Ohm law triangle"><polygon class="ln" points="150,12 22,176 278,176"/><line class="ln" x1="88" y1="108" x2="212" y2="108"/><line class="ln" x1="150" y1="108" x2="150" y2="176"/>'+L('V',150,88)+L('I',86,160)+L('R',214,160)+'</svg><p class="note">Tap V, I or R to make it the unknown.</p>'}
function ptri(P,Q,S,ph){
 var sc=Math.min(220/P,100/Math.max(Q,P*.05)),w=P*sc,h=Q*sc,x0=30,y0=145;
 return '<svg viewBox="0 0 300 180" role="img" aria-label="Power triangle"><polygon class="ln" points="'+x0+','+y0+' '+(x0+w)+','+y0+' '+(x0+w)+','+(y0-h)+'"/><text x="'+(x0+w/2)+'" y="'+(y0+20)+'" text-anchor="middle">P = '+fmt(P)+' kW</text><text x="'+(x0+w)+'" y="'+(y0-h-8)+'" text-anchor="end">Q = '+fmt(Q)+' kvar</text><text x="10" y="18" class="mu">S = '+fmt(S)+' kVA (slanted side)</text><text x="'+(x0+30)+'" y="'+(y0-6)+'" class="mu">φ = '+fmt(ph)+'°</text></svg>'}
function xf(Vp,Vs,Np,Ns){
 var m=Ns<Np?'Step-down':Ns>Np?'Step-up':'1 : 1';
 var cl='',i;for(i=0;i<5;i++){cl+='<path class="ln" d="M105,'+(45+i*18)+' q-20,9 0,18"/><path class="ln" d="M195,'+(45+i*18)+' q20,9 0,18"/>'}
 return '<svg viewBox="0 0 300 175" role="img" aria-label="Transformer diagram"><rect class="ln" x="120" y="30" width="60" height="110"/><line class="ln" x1="60" y1="45" x2="105" y2="45"/><line class="ln" x1="60" y1="135" x2="105" y2="135"/><line class="ln" x1="195" y1="45" x2="240" y2="45"/><line class="ln" x1="195" y1="135" x2="240" y2="135"/>'+cl+'<text x="150" y="20" text-anchor="middle">'+m+'</text><text x="70" y="160" text-anchor="middle">Vp = '+fmt(Vp)+' V</text><text x="230" y="160" text-anchor="middle">Vs = '+fmt(Vs)+' V</text><text x="70" y="30" text-anchor="middle" class="mu">Np = '+fmt(Np)+'</text><text x="230" y="30" text-anchor="middle" class="mu">Ns = '+fmt(Ns)+'</text></svg>'}
function rx(XL,XC,f0){
 var m=Math.max(XL,XC),a=XL/m*220,b=XC/m*220,d=Math.abs(XL-XC)/m,s=d<.02?'Close to resonance':XL>XC?'Net inductive':'Net capacitive';
 return '<svg viewBox="0 0 300 160" role="img" aria-label="Reactance bars"><text x="10" y="22" class="mu">XL = '+fmt(XL)+' Ω</text><rect class="tk" x="10" y="28" width="220" height="18" rx="4"/><rect class="fl" x="10" y="28" width="'+a+'" height="18" rx="4"/><text x="10" y="76" class="mu">XC = '+fmt(XC)+' Ω</text><rect class="tk" x="10" y="82" width="220" height="18" rx="4"/><rect class="fl2" x="10" y="82" width="'+b+'" height="18" rx="4"/><text x="10" y="128">'+s+'</text><text x="10" y="148" class="mu">Resonant frequency f0 = '+fmt(f0)+' Hz</text></svg>'}
function vb(pct,V){
 var w=Math.min(pct,10)/10*240;
 return '<svg viewBox="0 0 300 120" role="img" aria-label="Voltage drop bar"><text x="30" y="26" class="mu">Drop as % of supply (bar full at 10 %)</text><rect class="tk" x="30" y="36" width="240" height="22" rx="5"/><rect class="fl2" x="30" y="36" width="'+w+'" height="22" rx="5"/><text x="30" y="86">'+fmt(pct)+' % of '+fmt(V)+' V</text><text x="30" y="106" class="mu">Check the limit in your applicable standard.</text></svg>'}
var T=[
{id:'ohm',name:"Ohm's law",hint:'Fill any two fields, leave one empty.',formula:'V = I × R   |   I = V / R   |   R = V / I',partial:true,
 f:[['V','Voltage V (volts)'],['I','Current I (amps)'],['R','Resistance R (ohms)']],ex:{V:230,I:'',R:46},vz0:function(){return tri('')},
 mist:'Using mA or kΩ without converting to A and Ω. Applying the law to non-ohmic parts such as diodes.',
 run:function(x){var e=Object.keys(x).filter(function(k){return isNaN(x[k])});
  if(e.length!==1)return{err:'Fill exactly two fields and leave one empty.'};
  var V=x.V,I=x.I,R=x.R,u=e[0];
  if(u==='V'){V=I*R;return{main:'V = '+fmt(V)+' V',steps:['V = I × R','V = '+fmt(I)+' × '+fmt(R)+' = '+fmt(V)+' V'],viz:tri('V')+loop(I,'I = '+fmt(I)+' A')}}
  if(u==='I'){if(R===0)return{err:'R must not be 0.'};I=V/R;return{main:'I = '+fmt(I)+' A',steps:['I = V / R','I = '+fmt(V)+' / '+fmt(R)+' = '+fmt(I)+' A'],viz:tri('I')+loop(I,'I = '+fmt(I)+' A')}}
  if(I===0)return{err:'I must not be 0.'};R=V/I;return{main:'R = '+fmt(R)+' Ω',steps:['R = V / I','R = '+fmt(V)+' / '+fmt(I)+' = '+fmt(R)+' Ω'],viz:tri('R')+loop(I,'I = '+fmt(I)+' A')}}},
{id:'power',name:'Power and energy',hint:'DC or single-phase resistive load.',formula:'P = V × I   |   E = P × t',
 f:[['V','Voltage (volts)'],['I','Current (amps)'],['h','Time (hours)']],ex:{V:230,I:5,h:3},
 mist:'Mixing W and kW. Forgetting to use hours. P = V × I is real power only for DC or resistive loads; AC loads also need power factor.',
 run:function(x){var p=x.V*x.I,e=p*x.h/1000;return{main:'P = '+fmt(p)+' W\nE = '+fmt(e)+' kWh',steps:['P = V × I = '+fmt(x.V)+' × '+fmt(x.I)+' = '+fmt(p)+' W','E = P × t = '+fmt(p/1000)+' kW × '+fmt(x.h)+' h = '+fmt(e)+' kWh'],viz:loop(x.I,'I = '+fmt(x.I)+' A')}}},
{id:'three',name:'Three-phase power',hint:'Balanced load. Use line voltage and line current.',formula:'S = √3 × VL × IL   |   P = S × pf   |   Q = S × sinφ',
 f:[['VL','Line voltage (volts)'],['IL','Line current (amps)'],['pf','Power factor (0 to 1)']],ex:{VL:415,IL:100,pf:0.8},
 mist:'Using phase voltage instead of line voltage. Forgetting the power factor. Confusing kVA (apparent) with kW (real).',
 run:function(x){if(x.pf<=0||x.pf>1)return{err:'Power factor must be above 0 and at most 1.'};
  var S=Math.sqrt(3)*x.VL*x.IL/1000,P=S*x.pf,Q=S*Math.sqrt(1-x.pf*x.pf),ph=Math.acos(x.pf)*180/Math.PI;
  return{main:'S = '+fmt(S)+' kVA\nP = '+fmt(P)+' kW\nQ = '+fmt(Q)+' kvar',steps:['S = √3 × '+fmt(x.VL)+' × '+fmt(x.IL)+' = '+fmt(S)+' kVA','P = S × pf = '+fmt(S)+' × '+fmt(x.pf)+' = '+fmt(P)+' kW','Q = S × sinφ = '+fmt(Q)+' kvar'],viz:ptri(P,Q,S,ph)}}},
{id:'xfmr',name:'Transformer turns ratio',hint:'Ideal transformer, no losses.',formula:'Vs = Vp × Ns / Np',
 f:[['Vp','Primary voltage (volts)'],['Np','Primary turns'],['Ns','Secondary turns']],ex:{Vp:11000,Np:1000,Ns:35},
 mist:'Real transformers have losses, so the loaded output is a little lower. Mixing up primary and secondary turns.',
 run:function(x){if(x.Np<=0||x.Ns<=0)return{err:'Turns must be above 0.'};var Vs=x.Vp*x.Ns/x.Np;
  return{main:'Vs = '+fmt(Vs)+' V\nRatio Np : Ns = '+fmt(x.Np/x.Ns)+' : 1',steps:['Vs = Vp × Ns / Np','Vs = '+fmt(x.Vp)+' × '+fmt(x.Ns)+' / '+fmt(x.Np)+' = '+fmt(Vs)+' V'],viz:xf(x.Vp,Vs,x.Np,x.Ns)}}},
{id:'react',name:'Reactance',hint:'Ideal inductor and capacitor at one frequency.',formula:'XL = 2πfL   |   XC = 1 / (2πfC)',
 f:[['f','Frequency (Hz)'],['L','Inductance (mH)'],['C','Capacitance (µF)']],ex:{f:50,L:100,C:100},
 mist:'Entering mH or µF without converting. XL rises with frequency while XC falls.',
 run:function(x){if(x.f<=0||x.L<=0||x.C<=0)return{err:'All values must be above 0.'};
  var w=2*Math.PI*x.f,XL=w*x.L/1000,XC=1/(w*x.C*1e-6),f0=1/(2*Math.PI*Math.sqrt(x.L/1000*x.C*1e-6));
  return{main:'XL = '+fmt(XL)+' Ω\nXC = '+fmt(XC)+' Ω',steps:['XL = 2π × '+fmt(x.f)+' × '+fmt(x.L/1000)+' H = '+fmt(XL)+' Ω','XC = 1 / (2π × '+fmt(x.f)+' × '+fmt(x.C*1e-6)+' F) = '+fmt(XC)+' Ω','f0 = 1 / (2π√(LC)) = '+fmt(f0)+' Hz'],viz:rx(XL,XC,f0)}}},
{id:'vdrop',name:'Voltage drop (single-phase)',hint:'Use the conductor resistance per km from the cable datasheet. Ignores reactance.',formula:'Drop = 2 × I × r × length',
 f:[['I','Current (amps)'],['r','Resistance (ohm per km)'],['len','One-way length (km)'],['V','Supply voltage (volts)']],ex:{I:20,r:1.83,len:0.05,V:230},
 mist:'Forgetting the return conductor (the factor 2). Using a length in metres instead of km. Check the allowed limit in your applicable standard.',
 run:function(x){if(x.V<=0)return{err:'Supply voltage must be above 0.'};var d=2*x.I*x.r*x.len,p=d/x.V*100;
  return{main:'Drop = '+fmt(d)+' V\n'+fmt(p)+' % of supply',steps:['Drop = 2 × I × r × length','Drop = 2 × '+fmt(x.I)+' × '+fmt(x.r)+' × '+fmt(x.len)+' = '+fmt(d)+' V','Percent = '+fmt(d)+' / '+fmt(x.V)+' × 100 = '+fmt(p)+' %'],viz:vb(p,x.V)}}}
];
var tabs=document.getElementById('tabs'),host=document.getElementById('tp'),panels={},btns={};
function build(t){
 var p=el('section','tp');p.id='t-'+t.id;p.hidden=true;
 var L=el('div','tl2'),R=el('div','vz card');
 L.appendChild(el('h2','',t.name));L.appendChild(el('p','note',t.hint));L.appendChild(el('div','fx',t.formula));
 var ins={};
 t.f.forEach(function(f){var l=el('label','fld',f[1]);var i=el('input');i.type='number';i.step='any';i.inputMode='decimal';l.appendChild(i);L.appendChild(l);ins[f[0]]=i});
 var a=el('div','acts'),c=el('button','btn s','Calculate'),e=el('button','btn s g','Try an example'),z=el('button','btn s g','Clear');
 [c,e,z].forEach(function(b){b.type='button';a.appendChild(b)});L.appendChild(a);
 var res=el('div','res idle','Enter values, or tap Try an example.');res.setAttribute('aria-live','polite');
 var st=el('ol','steps'),mb=el('div','box warn');mb.appendChild(el('b','','Common mistakes: '));mb.appendChild(document.createTextNode(t.mist));
 L.appendChild(res);L.appendChild(st);L.appendChild(mb);
 function idle(){res.className='res idle';res.textContent='Enter values, or tap Try an example.';st.textContent='';R.innerHTML=t.vz0?t.vz0():'<p class="note">The diagram appears here after you calculate.</p>'}
 function calc(){
  var x={},bad=false,empty=false;
  Object.keys(ins).forEach(function(k){var v=ins[k].value.trim();if(v===''){x[k]=NaN;empty=true}else{x[k]=Number(v);if(!isFinite(x[k])||x[k]<0)bad=true}});
  var r;if(bad)r={err:'Enter numbers that are 0 or greater.'};else if(empty&&!t.partial)r={err:'Fill in every field.'};else r=t.run(x);
  st.textContent='';
  if(r.err){res.className='res err';res.textContent=r.err;return}
  res.className='res';res.textContent=r.main;
  r.steps.forEach(function(s){st.appendChild(el('li','',s))});R.innerHTML=r.viz}
 c.onclick=calc;
 e.onclick=function(){Object.keys(ins).forEach(function(k){ins[k].value=t.ex[k]===undefined?'':t.ex[k]});calc()};
 z.onclick=function(){Object.keys(ins).forEach(function(k){ins[k].value=''});idle()};
 R.addEventListener('click',function(ev){var k=ev.target.getAttribute&&ev.target.getAttribute('data-k');if(k&&ins[k]){ins[k].value='';ins[k].focus();calc()}});
 idle();p.appendChild(L);p.appendChild(R);host.appendChild(p);return p}
function wave(){
 var p=el('section','tp');p.id='t-wave';p.hidden=true;
 var L=el('div','tl2'),R=el('div','vz card');
 L.appendChild(el('h2','','Waveform explorer'));L.appendChild(el('p','note','A sine wave over a 40 ms window.'));L.appendChild(el('div','fx','Vrms = Vm / √2   |   T = 1 / f'));
 var l1=el('label','fld','Peak voltage Vm (volts)'),vm=el('input');vm.type='range';vm.min=10;vm.max=400;vm.value=325;l1.appendChild(vm);
 var l2=el('label','fld','Frequency (Hz)'),fq=el('input');fq.type='range';fq.min=10;fq.max=100;fq.value=50;l2.appendChild(fq);
 var a=el('div','acts'),e=el('button','btn s g','Try an example');e.type='button';a.appendChild(e);
 var res=el('div','res');res.setAttribute('aria-live','polite');var mb=el('div','box warn');mb.appendChild(el('b','','Common mistakes: '));mb.appendChild(document.createTextNode('Mixing up peak and RMS values. A "230 V" supply is an RMS value; its peak is about 325 V.'));
 [l1,l2,a,res,mb].forEach(function(n){L.appendChild(n)});
 var cv=el('canvas');cv.width=600;cv.height=260;cv.setAttribute('aria-label','Sine wave with RMS lines');R.appendChild(cv);
 function draw(){
  var V=+vm.value,f=+fq.value,g=cv.getContext('2d'),cs=getComputedStyle(document.documentElement),rms=V/Math.SQRT2;
  g.clearRect(0,0,600,260);g.lineWidth=1;g.strokeStyle=cs.getPropertyValue('--line');g.beginPath();g.moveTo(0,130);g.lineTo(600,130);g.stroke();
  var k=(V/400)*110;g.setLineDash([6,5]);g.strokeStyle=cs.getPropertyValue('--warm');g.beginPath();g.moveTo(0,130-rms/V*k);g.lineTo(600,130-rms/V*k);g.moveTo(0,130+rms/V*k);g.lineTo(600,130+rms/V*k);g.stroke();g.setLineDash([]);
  g.lineWidth=2.5;g.strokeStyle=cs.getPropertyValue('--acc');g.beginPath();
  for(var px=0;px<=600;px++){var y=130-Math.sin(2*Math.PI*f*(px/600*.04))*k;px?g.lineTo(px,y):g.moveTo(px,y)}g.stroke();
  res.className='res';res.textContent='Vm = '+V+' V, f = '+f+' Hz\nVrms = Vm / √2 = '+fmt(rms)+' V\nPeriod T = 1 / f = '+fmt(1000/f)+' ms\n(dashed lines show ±Vrms)'}
 vm.oninput=draw;fq.oninput=draw;e.onclick=function(){vm.value=325;fq.value=50;draw()};
 draw();p.appendChild(L);p.appendChild(R);host.appendChild(p);return p}
var list=T.map(function(t){return{id:t.id,name:t.name,mk:function(){return build(t)}}});
list.push({id:'wave',name:'Waveform explorer',mk:wave});
function show(id){
 list.forEach(function(t){if(!panels[t.id]&&t.id===id)panels[t.id]=t.mk();if(panels[t.id])panels[t.id].hidden=t.id!==id;btns[t.id].className='chip'+(t.id===id?' on':'');btns[t.id].setAttribute('aria-selected',t.id===id)});
 try{history.replaceState(null,'','#t-'+id)}catch(e){}}
list.forEach(function(t){var b=el('button','chip',t.name.replace(' (single-phase)',''));b.type='button';b.setAttribute('role','tab');b.onclick=function(){show(t.id)};tabs.appendChild(b);btns[t.id]=b});
var h=(location.hash||'').replace('#t-','');show(btns[h]?h:'ohm');
})();
