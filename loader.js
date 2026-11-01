/* K_24 Electrical: 3D loading screen. Shows at least 2.4 seconds, then fades out. */
(function () {
  var MIN = 2400, MAX = 6000;
  try { if (sessionStorage.getItem('k24-loaded')) return; } catch (e) {}
  var root = document.documentElement;
  var css =
    'html.k24l{overflow:hidden}html.k24l body{visibility:hidden}' +
    '#k24-load{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;background:radial-gradient(circle at 50% 40%,#10213f 0,#0a0f1a 65%);transition:opacity .6s ease,visibility .6s}' +
    '#k24-load::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(56,189,248,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.08) 1px,transparent 1px);background-size:44px 44px}' +
    '#k24-load.out{opacity:0;visibility:hidden}' +
    '.k24-scene{position:relative;width:260px;height:260px;perspective:900px;display:flex;align-items:center;justify-content:center}' +
    '.k24-stage{position:relative;width:100%;height:100%;transform-style:preserve-3d;display:flex;align-items:center;justify-content:center;animation:k24sway 3.2s ease-in-out infinite}' +
    '.k24-stage img{position:relative;width:180px;height:auto;transform:translateZ(40px);filter:drop-shadow(0 0 6px rgba(255,255,255,.7)) drop-shadow(0 0 22px rgba(56,189,248,.7))}' +
    '.k24-ring{position:absolute;border-radius:50%;border:2px solid rgba(56,189,248,.75);box-shadow:0 0 14px rgba(56,189,248,.5)}' +
    '.k24-r1{width:240px;height:240px;animation:k24a 3s linear infinite}' +
    '.k24-r2{width:200px;height:200px;border-color:rgba(251,146,60,.8);box-shadow:0 0 14px rgba(251,146,60,.4);animation:k24b 2.4s linear infinite}' +
    '.k24-r3{width:160px;height:160px;border-color:rgba(47,139,255,.8);animation:k24c 4s linear infinite}' +
    '@keyframes k24sway{0%,100%{transform:rotateY(-22deg) rotateX(6deg)}50%{transform:rotateY(22deg) rotateX(-4deg)}}' +
    '@keyframes k24a{from{transform:rotateX(72deg) rotateZ(0)}to{transform:rotateX(72deg) rotateZ(360deg)}}' +
    '@keyframes k24b{from{transform:rotateY(72deg) rotateZ(0)}to{transform:rotateY(72deg) rotateZ(-360deg)}}' +
    '@keyframes k24c{from{transform:rotateX(55deg) rotateY(35deg) rotateZ(0)}to{transform:rotateX(55deg) rotateY(35deg) rotateZ(360deg)}}' +
    '.k24-bar{position:relative;width:min(260px,70vw);height:4px;background:rgba(255,255,255,.12);border-radius:4px;overflow:hidden}' +
    '.k24-bar i{position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#2f8bff,#38bdf8);animation:k24fill 2.4s ease-out forwards}' +
    '@keyframes k24fill{to{width:100%}}' +
    '.k24-t{position:relative;color:#9db0c9;font:600 .8rem/1 system-ui,sans-serif;letter-spacing:.2em}' +
    '@media(prefers-reduced-motion:reduce){.k24-stage,.k24-ring{animation:none}.k24-ring{display:none}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);
  root.classList.add('k24l');

  var d = document.createElement('div');
  d.id = 'k24-load';
  d.setAttribute('role', 'status');
  d.setAttribute('aria-label', 'Loading K_24 Electrical');
  d.innerHTML = '<div class="k24-scene"><div class="k24-stage"><span class="k24-ring k24-r1"></span><span class="k24-ring k24-r2"></span><span class="k24-ring k24-r3"></span><img src="logo.png" alt=""></div></div><div class="k24-bar"><i></i></div><div class="k24-t">LOADING</div>';
  root.appendChild(d);

  var t0 = Date.now(), hidden = false;
  function hide() {
    if (hidden) return;
    hidden = true;
    root.classList.remove('k24l');
    d.classList.add('out');
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 700);
    try { sessionStorage.setItem('k24-loaded', '1'); } catch (e) {}
  }
  function ready() { setTimeout(hide, Math.max(0, MIN - (Date.now() - t0))); }
  if (document.readyState === 'complete') ready();
  else window.addEventListener('load', ready);
  setTimeout(hide, MAX);
})();
