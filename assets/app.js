// lightweight interactions: theme toggle and car animation
(function(){
  const themeBtn = document.getElementById('themeToggle');
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
  }

  // simple map car animation - move the #car along the path
  function animateCar(){
    const path = document.getElementById('route');
    const car = document.getElementById('car');
    if(!path || !car) return;
    const pathLength = path.getTotalLength ? path.getTotalLength() : 800;
    let t = 0;
    function step(){
      t += 0.0025; // speed control
      if(t>1) t = 1;
      try{
        const pt = path.getPointAtLength(t*pathLength);
        car.setAttribute('transform', `translate(${pt.x-10},${pt.y-5})`);
      }catch(e){}
      if(t < 1) requestAnimationFrame(step);
    }
    step();
  }
  window.openTracker = function(){
    // start anim and show status
    const mapStatus = document.getElementById('mapStatus');
    if(mapStatus) mapStatus.textContent = 'Live tracking: moving to checkpoint #4';
    animateCar();
  };

  // small init: set theme icon
  if(themeBtn) themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
})();
