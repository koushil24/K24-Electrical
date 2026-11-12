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
var CC=[['black','#111111',0,1,null,null],['brown','#8B4513',1,10,1,100],['red','#dd3333',2,100,2,50],['orange','#ff8800',3,1e3,null,15],['yellow','#eeee00',4,1e4,null,25],['green','#22aa22',5,1e5,0.5,null],['blue','#2266cc',6,1e6,0.25,10],['violet','#8822cc',7,1e7,0.1,5],['grey','#888888',8,1e8,0.05,null],['white','#eeeeee',9,1e9,null,null],['gold','#d4af37',null,0.1,5,null],['silver','#c0c0c0',null,0.01,10,null]];
function cby(n){return CC.filter(function(c){return c[0]===n})[0]}
function fmtV(v,u){var p=[[1e9,'G'],[1e6,'M'],[1e3,'k'],[1,''],[1e-3,'m'],[1e-6,'µ'],[1e-9,'n'],[1e-12,'p']];for(var i=0;i<p.length;i++){if(Math.abs(v)>=p[i][0]*0.9999999){return String(Number((v/p[i][0]).toPrecision(4)))+' '+p[i][1]+u}}return String(Number(v.toPrecision(4)))+' '+u}
function resSvg(cols){
 var s='<svg viewBox="0 0 300 100" role="img" aria-label="Resistor with colour bands"><line class="ln" x1="10" y1="50" x2="60" y2="50"/><line class="ln" x1="240" y1="50" x2="290" y2="50"/><rect class="ln" x="60" y="26" width="180" height="48" rx="18" style="fill:#d8c9a3;stroke:var(--acc)"/>';
 var n=cols.length,xs=n===4?[88,112,136,196]:n===5?[84,104,124,144,200]:[80,98,116,134,152,206];
 cols.forEach(function(c,i){s+='<rect x="'+xs[i]+'" y="26" width="12" height="48" style="fill:'+c+';stroke:#555;stroke-width:1"/>'});
 return s+'</svg>'}
function sel(opts,val){var s=document.createElement('select');s.style.cssText='width:100%;padding:10px;margin-top:4px;background:var(--bg);color:var(--text);border:1px solid var(--line);border-radius:8px;font-size:1rem';opts.forEach(function(o){var op=document.createElement('option');op.value=o[1];op.textContent=o[0];s.appendChild(op)});if(val!==undefined)s.value=val;return s}
function fld(label,node){var l=el('label','fld',label);l.appendChild(node);return l}
window.k24Codes={
 res:function(c){c=String(c).trim().toUpperCase();var m,v,st,t;
  if((m=c.match(/^(\d{2})([ZYXSABHCDEF])$/))&&+m[1]>=1&&+m[1]<=96){var E=[100,102,105,107,110,113,115,118,121,124,127,130,133,137,140,143,147,150,154,158,162,165,169,174,178,182,187,191,196,200,205,210,215,221,226,232,237,243,249,255,261,267,274,280,287,294,301,309,316,324,332,340,348,357,365,374,383,392,402,412,422,432,442,453,464,475,487,499,511,523,536,549,562,576,590,604,619,634,649,665,681,698,715,732,750,768,787,806,825,845,866,887,909,931,953,976],M={Z:0.001,Y:0.01,X:0.1,S:0.1,A:1,B:10,H:10,C:100,D:1000,E:1e4,F:1e5};
   v=E[+m[1]-1]*M[m[2]];return{v:v,tol:'usually ±1 %',steps:['EIA-96 code: the two digits '+m[1]+' select '+E[+m[1]-1]+' from the E96 table','The letter '+m[2]+' is the multiplier × '+M[m[2]],E[+m[1]-1]+' × '+M[m[2]]+' = '+fmtV(v,'Ω')]}}
  if(/^\d*R\d*$/.test(c)&&c.length>1){v=parseFloat(c.replace('R','.'));if(isNaN(v))return null;return{v:v,tol:'usually ±1 % to ±5 %',steps:['R acts as the decimal point: '+c+' = '+c.replace('R','.')+' Ω']}}
  if(/^\d{3}$/.test(c)){v=parseInt(c.slice(0,2))*Math.pow(10,+c[2]);return{v:v,tol:'usually ±5 %',steps:['First two digits '+c.slice(0,2)+', multiplier 10^'+c[2],c.slice(0,2)+' × 10^'+c[2]+' = '+fmtV(v,'Ω')]}}
  if(/^\d{4}$/.test(c)){v=parseInt(c.slice(0,3))*Math.pow(10,+c[3]);return{v:v,tol:'usually ±1 %',steps:['First three digits '+c.slice(0,3)+', multiplier 10^'+c[3],c.slice(0,3)+' × 10^'+c[3]+' = '+fmtV(v,'Ω')]}}
  return null},
 cap:function(c){c=String(c).trim();var T={F:'±1 %',G:'±2 %',J:'±5 %',K:'±10 %',M:'±20 %',Z:'+80 % / −20 %'},m,pf,tol='',st;
  if((m=c.toUpperCase().match(/^(\d{2,3})([FGJKMZ])?$/))){tol=m[2]?T[m[2]]:'';
   if(m[1].length===2){pf=parseInt(m[1]);st=['Two digits: the value is in picofarads directly',m[1]+' pF']}
   else{var d=m[1].slice(0,2),x=+m[1][2],mul=x===8?0.01:x===9?0.1:Math.pow(10,x);pf=parseInt(d)*mul;st=['First two digits '+d+', third digit is the multiplier ('+(x===8?'× 0.01':x===9?'× 0.1':'× 10^'+x)+')',d+' × '+mul+' pF = '+fmtV(pf*1e-12,'F')]}
   return{v:pf*1e-12,tol:tol,steps:st}}
  if((m=c.match(/^(\d*)([pPnNuUµ])(\d*)([FGJKMZ])?$/))&&(m[1]||m[3])){var mp={p:1e-12,n:1e-9,u:1e-6,'µ':1e-6}[m[2].toLowerCase()];var num=parseFloat((m[1]||'0')+'.'+(m[3]||'0'));return{v:num*mp,tol:m[4]?T[m[4]]:'',steps:['The letter '+m[2]+' marks the decimal point and the unit prefix',(m[1]||'0')+'.'+(m[3]||'0')+' '+m[2].toLowerCase().replace('u','µ')+'F']}}
  return null},
 ind:function(c){c=String(c).trim().toUpperCase();var v;
  if(/^\d{3}$/.test(c)){v=parseInt(c.slice(0,2))*Math.pow(10,+c[2]);return{v:v*1e-6,tol:'',steps:['SMD inductor codes are in microhenries: '+c.slice(0,2)+' × 10^'+c[2]+' = '+v+' µH']}}
  if(/^\d*R\d*$/.test(c)&&c.length>1){v=parseFloat(c.replace('R','.'));return{v:v*1e-6,tol:'',steps:['R is the decimal point, value in µH: '+v+' µH']}}
  return null}};
function colour(){
 var p=el('section','tp');p.id='t-color';p.hidden=true;var Lc=el('div','tl2'),Rv=el('div','vz card');
 Lc.appendChild(el('h2','','Resistor colour code'));Lc.appendChild(el('p','note','Pick the colours to get the value, or type a value to get the colours.'));
 Lc.appendChild(el('div','fx','Value = (digits) × multiplier   ±tolerance'));
 var nb=sel([['4 bands',4],['5 bands',5],['6 bands (with temperature coefficient)',6]],4),box=el('div'),res=el('div','res'),st=el('ol','steps');
 Lc.appendChild(fld('Number of bands',nb));Lc.appendChild(box);Lc.appendChild(res);Lc.appendChild(st);
 var dig=CC.filter(function(c){return c[2]!==null}),d1=dig.filter(function(c){return c[2]>0}),mul=CC,tl=CC.filter(function(c){return c[4]!==null}),tc=CC.filter(function(c){return c[5]!==null});
 function opts(a){return a.map(function(c){return[c[0],c[0]]})}
 var S=[];
 function build(){box.textContent='';S=[];var n=+nb.value,nd=n===4?2:3;
  for(var i=0;i<nd;i++){var s=sel(opts(i===0?d1:dig),i===0?'brown':'black');S.push(s);box.appendChild(fld('Digit '+(i+1)+' band',s))}
  var ms=sel(opts(mul),nd===2?'red':'brown');S.push(ms);box.appendChild(fld('Multiplier band',ms));
  var ts=sel(opts(tl),nd===2?'gold':'brown');S.push(ts);box.appendChild(fld('Tolerance band',ts));
  if(n===6){var cs=sel(opts(tc),'brown');S.push(cs);box.appendChild(fld('Temperature coefficient band',cs))}
  S.forEach(function(s){s.onchange=calc});calc()}
 function calc(){var n=+nb.value,nd=n===4?2:3,v=0,i,cols=[];
  for(i=0;i<nd;i++){var c=cby(S[i].value);v=v*10+c[2];cols.push(c[1])}
  var m=cby(S[nd].value),t=cby(S[nd+1].value);cols.push(m[1],t[1]);var tcv=null;
  if(n===6){var q=cby(S[nd+2].value);cols.push(q[1]);tcv=q[5]}
  var val=v*m[3],lo=val*(1-t[4]/100),hi=val*(1+t[4]/100);
  res.className='res';res.textContent=fmtV(val,'Ω')+'  ±'+t[4]+' %\nRange: '+fmtV(lo,'Ω')+' to '+fmtV(hi,'Ω')+(tcv?'\nTemp. coefficient: '+tcv+' ppm/K':'');
  st.textContent='';
  [ 'Digits: '+S.slice(0,nd).map(function(s){return s.value}).join(', ')+' = '+v,'Multiplier: '+m[0]+' = × '+m[3],'Value = '+v+' × '+m[3]+' = '+fmtV(val,'Ω'),'Tolerance: '+t[0]+' = ±'+t[4]+' %'].forEach(function(x){st.appendChild(el('li','',x))});
  Rv.innerHTML=resSvg(cols)}
 nb.onchange=build;build();
 Lc.appendChild(el('h2','','Value to colours'));
 var vin=el('input');vin.type='number';vin.step='any';vin.inputMode='decimal';var un=sel([['Ω',1],['kΩ',1e3],['MΩ',1e6]],1),tol2=sel(tl.map(function(c){return['±'+c[4]+' %',c[0]]}),'gold'),nb2=sel([['4 bands',4],['5 bands',5]],4),r2=el('div','res idle','Enter a value and tap Show bands.'),b2=el('button','btn s','Show bands');b2.type='button';
 Lc.appendChild(fld('Resistance value',vin));Lc.appendChild(fld('Unit',un));Lc.appendChild(fld('Tolerance',tol2));Lc.appendChild(fld('Bands',nb2));Lc.appendChild(b2);Lc.appendChild(r2);
 b2.onclick=function(){var x=Number(vin.value)*Number(un.value),n=+nb2.value,nd=n===4?2:3;
  if(!(x>0)||!isFinite(x)){r2.className='res err';r2.textContent='Enter a value above 0.';return}
  var e=Math.floor(Math.log10(x))-(nd-1),sig=Math.round(x/Math.pow(10,e));if(sig>=Math.pow(10,nd)){sig=Math.round(sig/10);e+=1}
  if(Math.abs(sig*Math.pow(10,e)-x)>x*1e-9){r2.className='res err';r2.textContent='This value cannot be shown with '+n+' bands. Nearest: '+fmtV(sig*Math.pow(10,e),'Ω')+(n===4?'. Try 5 bands.':'.');return}
  if(e<-2||e>9){r2.className='res err';r2.textContent='This value is outside the colour-band range.';return}
  var ds=String(sig).split('').map(Number),cn=[],cols=[];
  ds.forEach(function(d){var c=CC.filter(function(z){return z[2]===d})[0];cn.push(c[0]);cols.push(c[1])});
  var mc=CC.filter(function(z){return z[3]===Number(Math.pow(10,e).toPrecision(12))})[0];
  if(!mc){r2.className='res err';r2.textContent='No multiplier colour for this value.';return}
  var tcc=cby(tol2.value);cn.push(mc[0],tcc[0]);cols.push(mc[1],tcc[1]);
  r2.className='res';r2.textContent=fmtV(x,'Ω')+' ±'+tcc[4]+' %\nBands: '+cn.join(', ');Rv.innerHTML=resSvg(cols)};
 p.appendChild(Lc);p.appendChild(Rv);host.appendChild(p);return p}
function codes(){
 var p=el('section','tp');p.id='t-smd';p.hidden=true;var Lc=el('div','tl2'),Rv=el('div','vz card');
 Lc.appendChild(el('h2','','SMD and capacitor code decoder'));Lc.appendChild(el('p','note','Decode the marking on a surface-mount resistor, a capacitor or an SMD inductor.'));
 var ty=sel([['SMD resistor (103, 4R7, 1002, 01C)','res'],['Capacitor (104, 22, 4n7, 475K)','cap'],['SMD inductor (100, 4R7)','ind']],'res'),inp=el('input');inp.type='text';inp.autocomplete='off';inp.placeholder='Type the marking';
 var res=el('div','res idle','Type a marking and tap Decode.'),st=el('ol','steps'),b=el('button','btn s','Decode');b.type='button';
 Lc.appendChild(fld('Component type',ty));Lc.appendChild(fld('Marking',inp));Lc.appendChild(b);
 var ex=el('div','acts');[['res','103'],['res','4R7'],['res','1002'],['res','01C'],['cap','104'],['cap','4n7'],['cap','475K'],['ind','100']].forEach(function(e){var x=el('button','chip',e[1]);x.type='button';x.onclick=function(){ty.value=e[0];inp.value=e[1];run()};ex.appendChild(x)});
 Lc.appendChild(el('p','note','Examples (tap one):'));Lc.appendChild(ex);Lc.appendChild(res);Lc.appendChild(st);
 var mb=el('div','box warn');mb.appendChild(el('b','','Note: '));mb.appendChild(document.createTextNode('Tolerance and voltage are usually printed elsewhere or in the datasheet. SMD ceramic capacitors are often unmarked, so measure them with a capacitance meter.'));Lc.appendChild(mb);
 function run(){var r=window.k24Codes[ty.value](inp.value);st.textContent='';
  if(!r){res.className='res err';res.textContent='Not a recognised '+(ty.value==='res'?'resistor':ty.value==='cap'?'capacitor':'inductor')+' marking.';return}
  var u=ty.value==='res'?'Ω':ty.value==='cap'?'F':'H';res.className='res';res.textContent=fmtV(r.v,u)+(r.tol?'  ('+r.tol+')':'');
  r.steps.forEach(function(s){st.appendChild(el('li','',s))});
  Rv.innerHTML='<svg viewBox="0 0 300 120" role="img" aria-label="SMD chip marking"><rect x="90" y="38" width="120" height="44" rx="4" style="fill:'+(ty.value==='cap'?'#a68b5b':'#222')+';stroke:#777"/><rect x="82" y="38" width="16" height="44" style="fill:#c0c0c0"/><rect x="202" y="38" width="16" height="44" style="fill:#c0c0c0"/>'+(ty.value==='cap'?'':'<text x="150" y="67" text-anchor="middle" style="fill:#fff;font:700 20px monospace">'+inp.value.toUpperCase().replace(/[<>&]/g,'')+'</text>')+'<text x="150" y="108" text-anchor="middle" class="mu">'+(ty.value==='cap'?'Capacitor chips are often unmarked':'Marking on the chip')+'</text></svg>'}
 b.onclick=run;inp.onkeydown=function(e){if(e.key==='Enter')run()};
 Rv.innerHTML='<p class="note">The chip drawing appears here after you decode.</p>';
 p.appendChild(Lc);p.appendChild(Rv);host.appendChild(p);return p}

var list=T.map(function(t){return{id:t.id,name:t.name,mk:function(){return build(t)}}});
list.push({id:'wave',name:'Waveform explorer',mk:wave});list.push({id:'color',name:'Resistor colour code',mk:colour});list.push({id:'smd',name:'SMD and capacitor codes',mk:codes});
function show(id){
 list.forEach(function(t){if(!panels[t.id]&&t.id===id)panels[t.id]=t.mk();if(panels[t.id])panels[t.id].hidden=t.id!==id;btns[t.id].className='chip'+(t.id===id?' on':'');btns[t.id].setAttribute('aria-selected',t.id===id)});
 try{history.replaceState(null,'','#t-'+id)}catch(e){}}
list.forEach(function(t){var b=el('button','chip',t.name.replace(' (single-phase)',''));b.type='button';b.setAttribute('role','tab');b.onclick=function(){show(t.id)};tabs.appendChild(b);btns[t.id]=b});
var h=(location.hash||'').replace('#t-','');show(btns[h]?h:'ohm');
window.addEventListener('hashchange',function(){var x=(location.hash||'').replace('#t-','');if(btns[x])show(x)});
})();
