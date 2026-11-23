/* Dot-matrix headline.
 *
 * Text is rasterised offscreen, sampled on a fixed grid, and each opaque cell
 * becomes a crisp square dot. Dots spring to their cells, scatter, and
 * reassemble as the wording changes. A fine triangulated mesh drifts behind.
 *
 * Deliberately flat and sharp rather than glowing: the look depends on the
 * grid reading as a grid, which soft sprites destroy.
 *
 * This is the heaviest thing on the site, so it stays out of the way: nothing
 * under prefers-reduced-motion, nothing while scrolled past, nothing in a
 * background tab, and a smaller budget on small screens.
 */
(function () {
  var canvas = document.getElementById('pfx');
  if (!canvas || !canvas.getContext) return;

  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var root = canvas.closest('.pfx-wrap');
  var label = root && root.querySelector('.pfx-live');

  // Short service labels throughout. The earlier "SEO SPECIALIST" and
  // "META ADS EXPERT" phrasings are folded into their short forms, so the
  // cycle reads as one consistent list rather than a mix of two styles.
  var WORDS = [
    'DIGITAL MARKETER',
    'SEO',
    'AEO',
    'SMM',
    'META ADS',
    'GOOGLE ADS',
    'WEB DESIGN',
    'GRAPHIC DESIGN',
    'CREATIVE STRATEGIST'
  ];

  var HOLD = 2600;      // how long a title stays settled
  var SCATTER = 640;    // dispersal before the next title forms

  var BG = '#FDFDFD';
  var DOT = '10,9,9';          // the site ink
  var DOT_ALT = '122,118,117';  // a grey, so the grid has tonal variation
  var MESH = '10,9,9';

  var ctx = canvas.getContext('2d', { alpha: false });
  var dpr = 1, W = 0, H = 0, cx = 0, cy = 0, cell = 10, dotPx = 6;
  var dots = [], nodes = [];
  var word = 0, phase = 'in', phaseAt = 0, raf = 0, running = false;
  var mouse = { x: -9999, y: -9999, on: false };

  function font(px) {
    return '800 ' + px + 'px "Inter Tight",Helvetica,Arial,sans-serif';
  }

  /* ---------- lay the words out on one or two lines, whichever reads
       bigger in the box ---------- */
  function layout(oc, text, maxW, maxH) {
    var words = text.split(' ');
    oc.font = font(100);
    var full = oc.measureText(text).width || 1;
    var one = Math.min(100 * maxW / full, maxH);

    if (words.length < 2) return { lines: [text], px: one };

    // split at the point that balances the two line widths
    var best = null;
    for (var i = 1; i < words.length; i++) {
      var a = words.slice(0, i).join(' ');
      var b = words.slice(i).join(' ');
      var wa = oc.measureText(a).width, wb = oc.measureText(b).width;
      var diff = Math.abs(wa - wb);
      if (!best || diff < best.diff) best = { a: a, b: b, w: Math.max(wa, wb), diff: diff };
    }
    var two = Math.min(100 * maxW / best.w, maxH / 2.18);
    return two > one
      ? { lines: [best.a, best.b], px: two }
      : { lines: [text], px: one };
  }

  /* ---------- sample the type onto the grid ---------- */
  function cellsFor(text) {
    var off = document.createElement('canvas');
    off.width = W; off.height = H;
    var oc = off.getContext('2d');
    oc.fillStyle = '#fff';
    oc.textAlign = 'center';
    oc.textBaseline = 'middle';

    var L = layout(oc, text, W * 0.84, H * 0.62);
    var px = Math.max(26, Math.min(L.px, 210));
    oc.font = font(px);

    var lh = px * 1.06;
    var top = cy - (L.lines.length - 1) * lh / 2;
    for (var i = 0; i < L.lines.length; i++) oc.fillText(L.lines[i], cx, top + i * lh);

    var data = oc.getImageData(0, 0, W, H).data;
    var out = [];
    // walk the grid, not the pixels: one dot per cell is what makes it a
    // matrix rather than a cloud
    for (var y = cell >> 1; y < H; y += cell) {
      for (var x = cell >> 1; x < W; x += cell) {
        if (data[((y | 0) * W + (x | 0)) * 4 + 3] > 120) out.push(x, y);
      }
    }
    return out;
  }

  function budget() {
    return matchMedia('(max-width: 760px)').matches ? 2800 : 5200;
  }

  function assign(text) {
    var pts = cellsFor(text);
    var total = pts.length / 2;
    var count = Math.min(budget(), total);
    var stride = Math.max(1, Math.floor(total / count));

    var i = 0, p = 0;
    for (; p < total && i < count; p += stride, i++) {
      var d = dots[i];
      if (!d) {
        d = dots[i] = {
          x: cx + (Math.random() - 0.5) * W,
          y: cy + (Math.random() - 0.5) * H,
          vx: 0, vy: 0,
          alt: Math.random() < 0.16,
          a: 0.55 + Math.random() * 0.45,
          k: 0.07 + Math.random() * 0.05
        };
      }
      d.tx = pts[p * 2];
      d.ty = pts[p * 2 + 1];
      d.live = true;
    }
    for (; i < dots.length; i++) dots[i].live = false;
  }

  function scatter() {
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var a = Math.random() * Math.PI * 2;
      var s = 3 + Math.random() * 8;
      d.vx += Math.cos(a) * s;
      d.vy += Math.sin(a) * s;
    }
  }

  function buildNodes() {
    nodes.length = 0;
    var small = matchMedia('(max-width: 760px)').matches;
    var n = small ? 26 : 62;
    for (var i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        ring: Math.random() < 0.06
      });
    }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W / 2; cy = H / 2;

    cell = W < 480 ? 5 : W < 760 ? 6 : W < 1100 ? 8 : 10;
    dotPx = W < 480 ? 3 : W < 760 ? 4 : W < 1100 ? 4 : 5;

    buildNodes();
    assign(WORDS[word]);
  }

  /* ---------- mesh ---------- */
  function drawMesh() {
    var i, j, a, b, dx, dy, d2;
    var LINK = W < 700 ? 20000 : 34000;
    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
    }
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = a.x - b.x; dy = a.y - b.y;
        d2 = dx * dx + dy * dy;
        if (d2 < LINK) {
          ctx.strokeStyle = 'rgba(' + MESH + ',' + (0.16 * (1 - d2 / LINK)).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      if (a.ring) {
        ctx.strokeStyle = 'rgba(' + MESH + ',0.3)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, 5, 0, 6.2832);
        ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(' + MESH + ',0.3)';
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
      }
    }
  }

  /* ---------- frame ---------- */
  function draw(now) {
    raf = requestAnimationFrame(draw);
    if (!phaseAt) phaseAt = now;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    drawMesh();

    var elapsed = now - phaseAt;
    if (phase === 'in' && elapsed > HOLD) {
      phase = 'out'; phaseAt = now; scatter();
    } else if (phase === 'out' && elapsed > SCATTER) {
      phase = 'in'; phaseAt = now;
      word = (word + 1) % WORDS.length;
      assign(WORDS[word]);
      if (label) label.textContent = WORDS[word];
    }

    var half = dotPx / 2, i, d, dx, dy, d2;
    for (i = 0; i < dots.length; i++) {
      d = dots[i];
      if (!d.live && phase === 'in') continue;

      if (phase === 'in') {
        d.vx += (d.tx - d.x) * d.k;
        d.vy += (d.ty - d.y) * d.k;
      }
      d.vx *= 0.80; d.vy *= 0.80;

      if (mouse.on) {
        dx = d.x - mouse.x; dy = d.y - mouse.y;
        d2 = dx * dx + dy * dy;
        if (d2 < 11000 && d2 > 0.01) {
          var f = (1 - d2 / 11000) * 2.4;
          var inv = 1 / Math.sqrt(d2);
          d.vx += dx * inv * f;
          d.vy += dy * inv * f;
        }
      }

      d.x += d.vx; d.y += d.vy;

      ctx.fillStyle = 'rgba(' + (d.alt ? DOT_ALT : DOT) + ',' + d.a + ')';
      // round to whole pixels so the squares stay crisp rather than blurring
      ctx.fillRect((d.x - half) | 0, (d.y - half) | 0, dotPx, dotPx);
    }
  }

  function start() {
    if (running) return;
    running = true;
    phaseAt = 0;
    raf = requestAnimationFrame(draw);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  /* ---------- static frame, for reduced motion ---------- */
  function paintStatic() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    drawMesh();
    var half = dotPx / 2;
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      if (!d.live) continue;
      ctx.fillStyle = 'rgba(' + (d.alt ? DOT_ALT : DOT) + ',' + d.a + ')';
      ctx.fillRect((d.tx - half) | 0, (d.ty - half) | 0, dotPx, dotPx);
    }
  }

  function boot() {
    resize();
    if (label) label.textContent = WORDS[0];

    // the webfont decides the letterforms, so re-sample once it lands
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (!W) return;
        assign(WORDS[word]);
        if (reduce.matches) paintStatic();
      });
    }

    if (reduce.matches) { paintStatic(); return; }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es[0].isIntersecting ? start() : stop();
      }, { threshold: 0.05 }).observe(canvas);
    } else {
      start();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (!reduce.matches) start();
    });

    canvas.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    }, { passive: true });
    canvas.addEventListener('pointerleave', function () { mouse.on = false; }, { passive: true });

    var t;
    addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        resize();
        if (reduce.matches) paintStatic();
      }, 180);
    }, { passive: true });

    reduce.addEventListener('change', function () {
      if (reduce.matches) { stop(); paintStatic(); } else start();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
