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

  // nav: mark the section in view, in BOTH navs. Several links can point at the
  // same section, so the map is keyed by section and every link to it lights up.
  (function(){
    var links=[].slice.call(document.querySelectorAll('.botnav a, .nav-links a'));
    if(!links.length)return;
    var map=[],byId={};
    links.forEach(function(a){
      var href=a.getAttribute('href')||'';
      var id=href.replace(/^\/?#/,'');
      if(!id||id===href)return;                 // not an in-page link
      var el=document.getElementById(id);
      if(!el)return;                            // section lives on another page
      if(!byId[id]){byId[id]={el:el,links:[]};map.push(byId[id]);}
      byId[id].links.push(a);
    });
    // a case study only has #contact, and its Work item is marked active in the
    // markup: with nothing to track, leave that alone
    if(map.length<2)return;
    map.sort(function(x,y){return (x.el.compareDocumentPosition(y.el)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1;});
    var cur=null;
    function upd(){
      var line=innerHeight*0.34,found=null;
      map.forEach(function(m){ if(m.el.getBoundingClientRect().top<=line)found=m; });
      if(!found)found=map[0];
      if(scrollY+innerHeight>=document.documentElement.scrollHeight-4)found=map[map.length-1];
      if(found===cur)return;
      cur=found;
      map.forEach(function(m){
        var on=m===found;
        m.links.forEach(function(a){
          a.classList.toggle('active',on);
          if(on)a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current');
        });
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
