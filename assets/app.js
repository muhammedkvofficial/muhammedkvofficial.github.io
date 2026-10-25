  // theme toggle
  (function(){
    var btn=document.getElementById('themeBtn'),root=document.documentElement;
    if(!btn)return;
    btn.addEventListener('click',function(){
      var cur=root.getAttribute('data-theme');
      if(!cur)cur=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
      root.setAttribute('data-theme',cur==='dark'?'light':'dark');
    });
  })();

  // nav shadow on scroll
  (function(){
    var nav=document.getElementById('nav');
    var on=function(){nav.classList.toggle('stuck',window.scrollY>12);};
    on();addEventListener('scroll',on,{passive:true});
  })();

  // reveal on scroll
  (function(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver'in window)){els.forEach(function(e){e.classList.add('in')});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.14,rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){io.observe(e);});
  })();

  // count up
  (function(){
    var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
    document.querySelectorAll('[data-count]').forEach(function(el){
      var target=+el.getAttribute('data-count');
      if(reduce){el.textContent=target;return;}
      var io=new IntersectionObserver(function(en){
        if(en[0].isIntersecting){
          var s=null;
          requestAnimationFrame(function run(t){if(!s)s=t;var p=Math.min((t-s)/900,1);el.textContent=Math.round(p*target);if(p<1)requestAnimationFrame(run);});
          io.disconnect();
        }
      },{threshold:.6});
      io.observe(el);
    });
  })();

  // bottom nav: mark the section currently in view
  (function(){
    var nav=document.querySelector('.botnav');
    if(!nav)return;
    var links=[].slice.call(nav.querySelectorAll('a'));
    var pairs=[];
    links.forEach(function(a){
      var el=document.getElementById(a.getAttribute('href').slice(1));
      if(el)pairs.push({a:a,el:el});
    });
    if(!pairs.length)return;
    var cur=null;
    function upd(){
      var line=innerHeight*0.34,found=null;
      pairs.forEach(function(p){ if(p.el.getBoundingClientRect().top<=line)found=p; });
      // above the first section (the hero) light the first item rather than nothing,
      // so the bar never looks inert on load
      if(!found)found=pairs[0];
      // once the page bottom is reached the last section wins, however short it is
      if(scrollY+innerHeight>=document.documentElement.scrollHeight-4)found=pairs[pairs.length-1];
      if(found===cur)return;
      cur=found;
      pairs.forEach(function(p){
        var on=p===found;
        p.a.classList.toggle('active',on);
        if(on)p.a.setAttribute('aria-current','true'); else p.a.removeAttribute('aria-current');
      });
    }
    addEventListener('scroll',upd,{passive:true});
    addEventListener('resize',upd,{passive:true});
    upd();
  })();

  // services: tap to flip where there is no hover to do it
  (function(){
    if(!matchMedia('(hover:none)').matches)return;
    var cards=[].slice.call(document.querySelectorAll('.dm'));
    cards.forEach(function(c){
      c.setAttribute('role','button');
      c.setAttribute('aria-expanded','false');
      var toggle=function(e){
        e.preventDefault();
        var open=!c.classList.contains('is-flipped');
        cards.forEach(function(o){o.classList.remove('is-flipped');o.setAttribute('aria-expanded','false');});
        if(open){c.classList.add('is-flipped');c.setAttribute('aria-expanded','true');}
      };
      c.addEventListener('click',toggle);
      c.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '||e.key==='Spacebar')toggle(e);
      });
    });
  })();

  // hero: emblem drifts toward the pointer
  (function(){
    if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    if(matchMedia('(hover:none)').matches)return;
    var stage=document.querySelector('.hero-stage'),face=document.querySelector('.hero-face');
    if(!stage||!face)return;
    stage.addEventListener('mousemove',function(e){
      var r=stage.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      face.style.transform='translate3d('+(x*-20).toFixed(1)+'px,'+(y*-15).toFixed(1)+'px,0) rotate('+(x*1.4).toFixed(2)+'deg)';
    },{passive:true});
    stage.addEventListener('mouseleave',function(){face.style.transform='';},{passive:true});
  })();

  // footer year
  var yr=document.getElementById('yr');
  if(yr)yr.textContent=new Date().getFullYear();
