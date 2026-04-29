'use client';
import { useRef, useEffect, useMemo } from 'react';

// ─── Grid config ──────────────────────────────────────────────────────────────
const COLS         = 70;
const ROWS         = 50;
const MIN_HEIGHT   = 0.4;
const MAX_HEIGHT   = 0.6;
const BASE_OPACITY = 0.25;
const PARTICLE_PX  = 5;
const MOUSE_LERP   = 0.1;
const COLOR_LERP   = 0.035;  // speed of color transitions (~1.5s)
const TAU          = Math.PI * 2;

const DEFAULT_PARTICLE_COLOR = '#f16f00';
const DEFAULT_BG_COLOR       = '#0A0A0A';

// ─── Utilities ────────────────────────────────────────────────────────────────
function smoothstep(e0, e1, x) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function glslHash(a, b) {
  const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453123;
  return v - Math.floor(v);
}

/** Parse a 6-digit hex color string into an [r, g, b] float array. */
function hexToRgb(hex) {
  const h = (hex || '').replace('#', '');
  if (h.length !== 6) return [241, 111, 0];
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function buildParticles() {
  const list = [];
  for (let col = 0; col < COLS; col++) {
    const seed          = col / (COLS - 1);
    const colHeightRand = glslHash(seed, 1.0);
    const colSpeedRand  = 0.2 + 0.8 * glslHash(seed, 2.0);
    for (let row = 0; row < ROWS; row++) {
      const uvy = row / (ROWS - 1);
      if (uvy >= MAX_HEIGHT) continue;
      list.push({ uvx: seed, uvy, colHeightRand, colSpeedRand });
    }
  }
  return list;
}

export default function Particles() {
  const refs  = useRef([]);
  const mouse = useRef({ x: -1e6, y: -1e6, sx: -1e6, sy: -1e6 });
  const vp    = useRef({ w: 0, h: 0 });

  // Particle color smooth state
  const targetParticle  = useRef(hexToRgb(DEFAULT_PARTICLE_COLOR));
  const currentParticle = useRef(hexToRgb(DEFAULT_PARTICLE_COLOR));

  // Body background color smooth state
  const targetBg  = useRef(hexToRgb(DEFAULT_BG_COLOR));
  const currentBg = useRef(hexToRgb(DEFAULT_BG_COLOR));

  const particles = useMemo(buildParticles, []);

  useEffect(() => {
    // ── Viewport tracking ─────────────────────────────────────────────────
    const updateVP = () => {
      vp.current.w = window.innerWidth;
      vp.current.h = window.innerHeight;
    };
    updateVP();
    const ro = new ResizeObserver(updateVP);
    ro.observe(document.documentElement);

    // ── Section color map ─────────────────────────────────────────────────
    // Built once. Each entry holds the element + pre-parsed RGB arrays so we
    // do zero string parsing inside the hot animation loop.
    const sections = Array.from(
      document.querySelectorAll('[data-particles-color], [data-bg-color]')
    ).map(el => ({
      el,
      particle: hexToRgb(el.dataset.particlesColor || DEFAULT_PARTICLE_COLOR),
      bg:       hexToRgb(el.dataset.bgColor        || DEFAULT_BG_COLOR),
    }));

    // ── Mouse tracking ─────────────────────────────────────────────────────
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    // ── Animation loop ─────────────────────────────────────────────────────
    let raf;
    const t0 = performance.now();

    const frame = (now) => {
      const t  = (now - t0) / 1000;
      const { w, h } = vp.current;
      const ir         = w * 0.13;
      const vpCenter   = h / 2;

      // ── Scroll-position–based section detection ────────────────────────
      // Every frame we find the section whose center is nearest the viewport
      // center. getBoundingClientRect() reads a layout-cached value inside rAF
      // so there is no forced reflow. This is immune to fast scrolling.
      if (sections.length > 0) {
        let closest     = sections[0];
        let closestDist = Infinity;
        for (const sec of sections) {
          const rect   = sec.el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist   = Math.abs(center - vpCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest     = sec;
          }
        }
        targetParticle.current = closest.particle;
        targetBg.current       = closest.bg;
      }

      // Lerp particle color
      const cp = currentParticle.current;
      const tp = targetParticle.current;
      cp[0] += (tp[0] - cp[0]) * COLOR_LERP;
      cp[1] += (tp[1] - cp[1]) * COLOR_LERP;
      cp[2] += (tp[2] - cp[2]) * COLOR_LERP;
      const particleColorStr = `rgb(${Math.round(cp[0])},${Math.round(cp[1])},${Math.round(cp[2])})`;

      // Lerp body background color
      const cb = currentBg.current;
      const tb = targetBg.current;
      cb[0] += (tb[0] - cb[0]) * COLOR_LERP;
      cb[1] += (tb[1] - cb[1]) * COLOR_LERP;
      cb[2] += (tb[2] - cb[2]) * COLOR_LERP;
      document.body.style.backgroundColor =
        `rgb(${Math.round(cb[0])},${Math.round(cb[1])},${Math.round(cb[2])})`;

      // Mouse smooth-follow
      const m = mouse.current;
      m.sx += (m.x - m.sx) * MOUSE_LERP;
      m.sy += (m.y - m.sy) * MOUSE_LERP;

      for (let i = 0; i < particles.length; i++) {
        const el = refs.current[i];
        if (!el) continue;

        const { uvx, uvy, colHeightRand, colSpeedRand } = particles[i];

        const maxH       = MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) *
                           (0.5 + 0.5 * Math.sin(t * colSpeedRand + colHeightRand * TAU));
        const heightMask = 1 - smoothstep(maxH - 0.05, maxH, uvy);

        if (heightMask < 0.001) {
          el.style.opacity = '0';
          continue;
        }

        const pulse = 0.92 + 0.08 * Math.sin(t * 0.8 + uvx * 10.0);
        const dx    = uvx * w - m.sx;
        const dy    = (1 - uvy) * h - m.sy;
        const mi    = 1 - smoothstep(0, ir, Math.sqrt(dx * dx + dy * dy));

        el.style.transform       = `translate(-50%,-50%) scale(${(pulse * heightMask * (1 - mi * 0.9)).toFixed(3)})`;
        el.style.opacity         = (BASE_OPACITY * (1 - mi * 0.5)).toFixed(3);
        el.style.backgroundColor = particleColorStr;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.style.backgroundColor = '';
    };
  }, [particles]);

  return (
    <div
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          style={{
            position:        'absolute',
            left:            `${(p.uvx * 100).toFixed(2)}%`,
            top:             `${((1 - p.uvy) * 100).toFixed(2)}%`,
            width:           PARTICLE_PX,
            height:          PARTICLE_PX,
            borderRadius:    '50%',
            backgroundColor: DEFAULT_PARTICLE_COLOR,
            opacity:         BASE_OPACITY,
            transform:       'translate(-50%,-50%) scale(1)',
          }}
        />
      ))}
    </div>
  );
}

