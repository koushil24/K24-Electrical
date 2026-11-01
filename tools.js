function fmt(n){return String(Number(n.toPrecision(6)))}
var T=[
{id:'ohm',n:"Ohm's law",hint:'Fill any two fields and leave one empty.',partial:true,f:[['V','Voltage V (volts)'],['I','Current I (amps)'],['R','Resistance R (ohms)']],
 run:function(x){var e=Object.keys(x).filter(function(k){return isNaN(x[k])});
  if(e.length!==1)return 'Fill exactly two fields.';
  if(e[0]==='V')return 'V = I × R = '+fmt(x.I*x.R)+' V';
  if(e[0]==='I'){if(x.R===0)return 'R must not be 0.';return 'I = V / R = '+fmt(x.V/x.R)+' A'}
  if(x.I===0)return 'I must not be 0.';return 'R = V / I = '+fmt(x.V/x.I)+' Ω'}},
{id:'power',n:'Power and energy',hint:'DC or single-phase resistive load.',f:[['V','Voltage (volts)'],['I','Current (amps)'],['h','Time (hours)']],
 run:function(x){var p=x.V*x.I;return 'Power P = V × I = '+fmt(p)+' W\nEnergy = P × t = '+fmt(p*x.h/1000)+' kWh'}},
{id:'three',n:'Three-phase power',hint:'Balanced load. Use line voltage and line current.',f:[['VL','Line voltage (volts)'],['IL','Line current (amps)'],['pf','Power factor (0 to 1)']],
 run:function(x){if(x.pf<=0||x.pf>1)return 'Power factor must be above 0 and at most 1.';
  var s=Math.sqrt(3)*x.VL*x.IL,p=s*x.pf,q=s*Math.sqrt(1-x.pf*x.pf);
  return 'S = √3 × VL × IL = '+fmt(s/1000)+' kVA\nP = S × pf = '+fmt(p/1000)+' kW\nQ = '+fmt(q/1000)+' kvar'}},
{id:'xfmr',n:'Transformer turns ratio',hint:'Ideal transformer, no losses.',f:[['Vp','Primary voltage (volts)'],['Np','Primary turns'],['Ns','Secondary turns']],
 run:function(x){if(x.Np<=0||x.Ns<=0)return 'Turns must be above 0.';
  return 'Secondary voltage = Vp × Ns / Np = '+fmt(x.Vp*x.Ns/x.Np)+' V\nTurns ratio Np : Ns = '+fmt(x.Np/x.Ns)+' : 1'}},
{id:'react',n:'Reactance',hint:'Ideal inductor and capacitor at one frequency.',f:[['f','Frequency (Hz)'],['L','Inductance (mH)'],['C','Capacitance (µF)']],
 run:function(x){if(x.f<=0||x.L<=0||x.C<=0)return 'All values must be above 0.';
  var w=2*Math.PI*x.f;return 'XL = 2πfL = '+fmt(w*x.L/1000)+' Ω\nXC = 1 / (2πfC) = '+fmt(1/(w*x.C*1e-6))+' Ω'}},
{id:'vdrop',n:'Voltage drop (single-phase)',hint:'Uses the resistance per km of your cable from its datasheet. Ignores reactance.',f:[['I','Current (amps)'],['r','Conductor resistance (ohm per km)'],['len','One-way length (km)'],['V','Supply voltage (volts)']],
 run:function(x){if(x.V<=0)return 'Supply voltage must be above 0.';
  var d=2*x.I*x.r*x.len;return 'Drop = 2 × I × r × length = '+fmt(d)+' V\nPercentage = '+fmt(d/x.V*100)+' %'}}
];
var host=document.getElementById('tools');
T.forEach(function(t){
 var c=document.createElement('section');c.className='card';c.id='t-'+t.id;
 var h=document.createElement('h2');h.textContent=t.n;
 var p=document.createElement('p');p.className='note';p.textContent=t.hint;
 c.appendChild(h);c.appendChild(p);
 var ins={};
 t.f.forEach(function(f){var l=document.createElement('label');l.className='fld';l.textContent=f[1];
  var i=document.createElement('input');i.type='number';i.step='any';i.inputMode='decimal';l.appendChild(i);c.appendChild(l);ins[f[0]]=i});
 var b=document.createElement('button');b.type='button';b.className='btn';b.textContent='Calculate';
 var o=document.createElement('div');o.className='out';o.setAttribute('aria-live','polite');
 b.onclick=function(){
  var x={},bad=false,empty=false;
  Object.keys(ins).forEach(function(k){var v=ins[k].value.trim();
   if(v===''){x[k]=NaN;empty=true}else{x[k]=Number(v);if(!isFinite(x[k])||x[k]<0)bad=true}});
  var r;
  if(bad)r='Enter numbers that are 0 or greater.';
  else if(empty&&!t.partial)r='Fill in every field.';
  else r=t.run(x);
  o.textContent=r;o.className='out'+(/^(Fill|Enter|Power factor|Turns|All|Supply|R must|I must)/.test(r)?' err':'');
 };
 c.appendChild(b);c.appendChild(o);host.appendChild(c);
});
var w=document.createElement('section');w.className='card';w.id='t-wave';
w.innerHTML='<h2>Waveform explorer</h2><p class="note">Sine wave over a 40 ms window.</p><label class="fld">Peak voltage Vm (volts)<input id="vm" type="range" min="10" max="400" value="325"></label><label class="fld">Frequency (Hz)<input id="fq" type="range" min="10" max="100" value="50"></label><canvas id="cv" width="600" height="220" aria-label="Sine wave"></canvas><div class="out" id="wo" aria-live="polite"></div>';
host.appendChild(w);
function draw(){
 var vm=+document.getElementById('vm').value,f=+document.getElementById('fq').value;
 var cv=document.getElementById('cv'),g=cv.getContext('2d'),cs=getComputedStyle(document.documentElement);
 g.clearRect(0,0,600,220);g.strokeStyle=cs.getPropertyValue('--line');g.beginPath();g.moveTo(0,110);g.lineTo(600,110);g.stroke();
 g.strokeStyle=cs.getPropertyValue('--acc');g.lineWidth=2;g.beginPath();
 for(var px=0;px<=600;px++){var t=px/600*0.04,y=110-Math.sin(2*Math.PI*f*t)*(vm/400)*95;px?g.lineTo(px,y):g.moveTo(px,y)}
 g.stroke();
 document.getElementById('wo').textContent='Vm = '+vm+' V, f = '+f+' Hz\nRMS = Vm / √2 = '+fmt(vm/Math.SQRT2)+' V\nPeriod = 1 / f = '+fmt(1000/f)+' ms';
}
document.getElementById('vm').oninput=draw;document.getElementById('fq').oninput=draw;draw();
if(location.hash){var e=document.querySelector(location.hash);if(e)e.scrollIntoView()}
