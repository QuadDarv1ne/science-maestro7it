"use client";

/**
 * Lightweight confetti burst using Canvas.
 * No external dependencies — pure DOM + requestAnimationFrame.
 * Triggered by calling the exported `confetti()` function.
 *
 * Particles use the current theme's --accent color so they match
 * whichever theme is active.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  shape: "rect" | "circle";
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let raf = 0;
let cleanupTimer: ReturnType<typeof setTimeout> | null = null;

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9999;";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
}

function cleanupCanvas() {
  if (canvas) {
    canvas.remove();
    canvas = null;
    ctx = null;
  }
  window.removeEventListener("resize", resize);
  cleanupTimer = null;
}

function resize() {
  if (!canvas) return;
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function getThemeColors(): string[] {
  const root = getComputedStyle(document.documentElement);
  const accent = root.getPropertyValue("--accent").trim() || "#f7a224";
  const primary = root.getPropertyValue("--primary").trim() || "#d97706";
  const from = root.getPropertyValue("--theme-gradient-from").trim() || accent;
  const via = root.getPropertyValue("--theme-gradient-via").trim() || primary;
  const to = root.getPropertyValue("--theme-gradient-to").trim() || primary;
  // Filter out empty values
  return [accent, primary, from, via, to].filter(
    (c, i, arr) => c && arr.indexOf(c) === i
  );
}

function draw() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  const now = performance.now();
  particles = particles.filter((p) => p.life > 0);

  for (const p of particles) {
    p.vy += 0.25; // gravity
    p.vx *= 0.99; // air resistance
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.life -= 1;

    const alpha = Math.min(1, p.life / 30);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;

    if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (particles.length > 0) {
    raf = requestAnimationFrame(draw);
  } else {
    cancelAnimationFrame(raf);
    raf = 0;
    if (!cleanupTimer) {
      cleanupTimer = setTimeout(cleanupCanvas, 2000);
    }
  }
}

interface ConfettiOptions {
  x?: number;
  y?: number;
  count?: number;
  spread?: number;
  velocity?: number;
}

/**
 * Trigger a confetti burst at the given coordinates (defaults to center).
 */
export function confetti(options: ConfettiOptions = {}) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  ensureCanvas();
  if (!ctx) return;

  const x = options.x ?? window.innerWidth / 2;
  const y = options.y ?? window.innerHeight / 2;
  const count = options.count ?? 40;
  const spread = options.spread ?? Math.PI * 2;
  const velocity = options.velocity ?? 8;

  const colors = getThemeColors();

  const newParticles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.random() - 0.5) * spread - Math.PI / 2;
    const speed = velocity * (0.5 + Math.random() * 0.8);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const maxLife = 90 + Math.random() * 50;
    newParticles.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      size: 7 + Math.random() * 7,
      color,
      life: maxLife,
      maxLife,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    });
  }
  particles.push(...newParticles);

  if (cleanupTimer) {
    clearTimeout(cleanupTimer);
    cleanupTimer = null;
  }
  if (!raf) {
    raf = requestAnimationFrame(draw);
  }
}

/**
 * Trigger confetti from the bounding rect of a DOM element
 * (useful for "copy" buttons).
 */
export function confettiFromElement(el: Element | null, count = 30) {
  if (!el) {
    confetti({ count });
    return;
  }
  const rect = el.getBoundingClientRect();
  confetti({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    count,
    spread: Math.PI * 1.5,
    velocity: 6,
  });
}
