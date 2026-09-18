const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

/* Starfield: two canvas layers, far (static) and near (twinkle) */
function paint(canvas, count, maxR, alpha){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  const c = canvas.getContext('2d');
  c.scale(dpr, dpr);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < count; i++){
    const x = Math.random() * innerWidth;
    const y = Math.random() * innerHeight;
    const r = Math.random() * maxR + 0.25;
    const a = (Math.random() * 0.6 + 0.4) * alpha;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = 'rgba(' + (Math.random() > 0.85 ? '178,222,255' : '255,255,255') + ',' + a + ')';
    c.fill();
  }
}
function sky(){
  paint(document.getElementById('stars'), Math.round(innerWidth * innerHeight / 5200), 0.8, 0.55);
  paint(document.getElementById('stars2'), Math.round(innerWidth * innerHeight / 22000), 1.3, 0.9);
}
sky();
let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(sky, 220); });

/* Slow parallax on the near star layer */
const near = document.getElementById('stars2');
addEventListener('scroll', () => {
  near.style.transform = 'translate3d(0,' + (scrollY * -0.04) + 'px,0)';
}, { passive: true });

/* Scroll reveal */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('section, .fx').forEach(el => io.observe(el));

/* Category filter on the project grid */
const fbar=document.querySelector('.filters');
if(fbar){
  fbar.addEventListener('click',e=>{
    const b=e.target.closest('.f'); if(!b) return;
    fbar.querySelectorAll('.f').forEach(x=>x.classList.toggle('is-on',x===b));
    const f=b.dataset.f;
    document.querySelectorAll('.card').forEach(c=>{
      const show = f==='all' || c.dataset.cat===f;
      c.classList.toggle('is-off',!show);
    });
  });
}
