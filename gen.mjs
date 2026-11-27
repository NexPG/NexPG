#!/usr/bin/env node
/**
 * NexPG · cover generator
 *
 *   node gen.mjs   →   assets/cover.svg
 *
 * One 1280×600 canvas: a wide synthwave room — sunset behind venetian
 * blinds, palm silhouettes, a CRT running a NexPG console, desk props.
 *
 * Pure vector: no webfonts, no scripts, no external files.
 */

import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(ROOT, "assets");
mkdirSync(OUT, { recursive: true });

// ── edit me ────────────────────────────────────────────────────────────────
const CFG = {
  name: "NexPG",
  seed: 1984,
};

// ── pixel font 5×7 ─────────────────────────────────────────────────────────
const F5 = Object.fromEntries(
  Object.entries({
    A: "01110,10001,10001,11111,10001,10001,10001",
    B: "11110,10001,10001,11110,10001,10001,11110",
    C: "01110,10001,10000,10000,10000,10001,01110",
    D: "11110,10001,10001,10001,10001,10001,11110",
    E: "11111,10000,10000,11110,10000,10000,11111",
    F: "11111,10000,10000,11110,10000,10000,10000",
    G: "01110,10001,10000,10111,10001,10001,01111",
    H: "10001,10001,10001,11111,10001,10001,10001",
    I: "11111,00100,00100,00100,00100,00100,11111",
    J: "00111,00010,00010,00010,00010,10010,01100",
    K: "10001,10010,10100,11000,10100,10010,10001",
    L: "10000,10000,10000,10000,10000,10000,11111",
    M: "10001,11011,10101,10101,10001,10001,10001",
    N: "10001,11001,10101,10011,10001,10001,10001",
    O: "01110,10001,10001,10001,10001,10001,01110",
    P: "11110,10001,10001,11110,10000,10000,10000",
    Q: "01110,10001,10001,10001,10101,10010,01101",
    R: "11110,10001,10001,11110,10100,10010,10001",
    S: "01111,10000,10000,01110,00001,00001,11110",
    T: "11111,00100,00100,00100,00100,00100,00100",
    U: "10001,10001,10001,10001,10001,10001,01110",
    V: "10001,10001,10001,10001,10001,01010,00100",
    W: "10001,10001,10001,10101,10101,11011,10001",
    X: "10001,10001,01010,00100,01010,10001,10001",
    Y: "10001,10001,01010,00100,00100,00100,00100",
    Z: "11111,00001,00010,00100,01000,10000,11111",
    "0": "01110,10011,10101,10101,10101,11001,01110",
    "1": "00100,01100,00100,00100,00100,00100,01110",
    "2": "01110,10001,00001,00010,00100,01000,11111",
    "3": "11111,00010,00100,00010,00001,10001,01110",
    "4": "00010,00110,01010,10010,11111,00010,00010",
    "5": "11111,10000,11110,00001,00001,10001,01110",
    "6": "00110,01000,10000,11110,10001,10001,01110",
    "7": "11111,00001,00010,00100,01000,01000,01000",
    "8": "01110,10001,10001,01110,10001,10001,01110",
    "9": "01110,10001,10001,01111,00001,00010,01100",
    "(": "00010,00100,00100,00100,00100,00100,00010",
    ")": "01000,00100,00100,00100,00100,00100,01000",
    '"': "01010,01010,00000,00000,00000,00000,00000",
    ">": "10000,01000,00100,00010,00100,01000,10000",
    ":": "00000,00100,00000,00000,00100,00000,00000",
    "!": "00100,00100,00100,00100,00100,00000,00100",
    ",": "00000,00000,00000,00000,00100,00100,01000",
    "'": "00100,00100,00000,00000,00000,00000,00000",
    "_": "00000,00000,00000,00000,00000,00000,11111",
    "/": "00001,00010,00010,00100,01000,01000,10000",
    "-": "00000,00000,00000,11111,00000,00000,00000",
    ".": "00000,00000,00000,00000,00000,01100,01100",
    "@": "01110,10001,10111,10101,10111,10000,01110",
    "#": "01010,01010,11111,01010,11111,01010,01010",
    "~": "00000,00000,01001,10110,00000,00000,00000",
    " ": "00000,00000,00000,00000,00000,00000,00000",

    // lowercase: x-height sits on rows 2–6, ascenders start on row 1
    a: "00000,00000,01110,00001,01111,10001,01111",
    b: "10000,10000,11110,10001,10001,10001,11110",
    c: "00000,00000,01110,10001,10000,10001,01110",
    d: "00001,00001,01111,10001,10001,10001,01111",
    e: "00000,00000,01110,10001,11111,10000,01110",
    f: "00110,01001,01000,11100,01000,01000,01000",
    g: "00000,00000,01110,10001,01111,00001,01110",
    h: "10000,10000,11110,10001,10001,10001,10001",
    i: "00100,00000,01100,00100,00100,00100,01110",
    j: "00010,00000,00110,00010,00010,10010,01100",
    k: "10000,10000,10010,10100,11000,10100,10010",
    l: "01100,00100,00100,00100,00100,00100,01110",
    m: "00000,00000,11010,10101,10101,10101,10101",
    n: "00000,00000,11110,10001,10001,10001,10001",
    o: "00000,00000,01110,10001,10001,10001,01110",
    p: "00000,00000,11110,10001,11110,10000,10000",
    q: "00000,00000,01111,10001,01111,00001,00001",
    r: "00000,00000,10110,11001,10000,10000,10000",
    s: "00000,00000,01111,10000,01110,00001,11110",
    t: "01000,01000,11100,01000,01000,01001,00110",
    u: "00000,00000,10001,10001,10001,10011,01101",
    v: "00000,00000,10001,10001,10001,01010,00100",
    w: "00000,00000,10001,10001,10101,10101,01010",
    x: "00000,00000,10001,01010,00100,01010,10001",
    y: "00000,00000,10001,10001,01111,00001,01110",
    z: "00000,00000,11111,00010,00100,01000,11111",
  }).map(([k, v]) => [k, v.split(",")]),
);

function layout(text, font, gapCols = 1, upper = true) {
  const ref = font.A ?? Object.values(font)[0];
  const HGT = ref.length;
  const WID = ref[0].length;
  const rects = [];
  let cx = 0;
  for (const raw of upper ? text.toUpperCase() : text) {
    const g = font[raw] ?? font[" "];
    for (let row = 0; row < HGT; row++) {
      let start = -1;
      for (let col = 0; col <= WID; col++) {
        const on = col < WID && g[row][col] === "1";
        if (on && start < 0) start = col;
        if (!on && start >= 0) {
          rects.push([cx + start, row, col - start]);
          start = -1;
        }
      }
    }
    cx += WID + gapCols;
  }
  return { rects, w: cx - gapCols, h: HGT };
}

function pixels(lay, s, x, y, attrs = "", dx = 0, dy = 0) {
  const body = lay.rects
    .map(
      ([gx, gy, gw]) =>
        `<rect x="${gx * s}" y="${gy * s}" width="${gw * s}" height="${s}"/>`,
    )
    .join("");
  return `<g transform="translate(${Math.round(x + dx)} ${Math.round(y + dy)})" shape-rendering="crispEdges" ${attrs}>${body}</g>`;
}

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ── the room ───────────────────────────────────────────────────────────────
const DESK = 432;

/** Feathery palm frond pointing right. */
function frond(L, droop, n = 12, thick = 1) {
  const top = [];
  const bot = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = t * L;
    const y = droop * t * t;
    const env = Math.sin(Math.PI * Math.min(1, t * 1.06));
    const w = 15 * env * thick * (i % 2 ? 0.35 : 1);
    top.push([x, y - w]);
    bot.push([x, y + w * 0.7]);
  }
  const pts = top.concat(bot.reverse());
  return `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`;
}

function palm(x, baseY, height, lean, scale = 1, fill = "#170513") {
  const topX = x + lean;
  const topY = baseY - height;
  const tw = 12 * scale;
  const trunk = `<path d="M${x - tw * 1.5} ${baseY}C${x - tw * 0.2} ${baseY - height * 0.55} ${topX - tw * 1.2} ${topY + height * 0.3} ${topX - tw * 0.7} ${topY}L${topX + tw * 0.7} ${topY}C${topX + tw * 1.2} ${topY + height * 0.28} ${x + tw * 0.6} ${baseY - height * 0.45} ${x + tw * 1.5} ${baseY}Z"/>`;
  const angles = [-184, -169, -154, -139, -124, -109, -94, -79, -64, -49, -34, -19, -4];
  const fronds = angles
    .map((a, i) => {
      const L = (116 + Math.abs(Math.sin(a * 2.1)) * 46 + (i % 3) * 9) * scale;
      // keep the arch pointing down in world space, whatever the frond angle
      const droop = 46 * Math.cos((a * Math.PI) / 180) * scale;
      return `<path d="${frond(L, droop, 15, 0.85)}" transform="translate(${topX} ${topY}) rotate(${a})"/>`;
    })
    .join("");
  return `<g fill="${fill}">${trunk}<ellipse cx="${topX}" cy="${topY}" rx="${16 * scale}" ry="${12 * scale}"/>${fronds}</g>`;
}

function scene() {
  const GREEN = "#7dffb2";
  const W = 1280;
  const CX = (W - 600) / 2; // the original 600×600 composition, centred

  // the joke: the classic call flipped inside out — HELLO WORLD is the
  // function, "PRINT!" is its argument — run from a NexPG admin console
  const cmdA = layout("HELLO WORLD(", F5);
  const cmdB = layout('"PRINT!")', F5);
  const out = layout("PRINT!", F5);
  const prompt = layout(`${CFG.name}@console:~#`, F5, 1, false);
  const CMD_X = 103;
  const CMD_Y = 214;
  const CMD_S = 2;
  const STR_X = CMD_X + 12 * 6 * CMD_S;
  const OUT_X = 103;
  const OUT_Y = 244;
  const PROMPT_X = 103;
  const PROMPT_Y = 304;

  const sky = `<rect width="${W}" height="${DESK}" fill="url(#sc_sky)"/>`;

  const sun = `
    <circle cx="${CX + 462}" cy="238" r="300" fill="url(#sc_bloom)"/>
    <circle cx="${CX + 462}" cy="238" r="140" fill="url(#sc_sun)"/>`;

  // palms outside the window: two framing the wide room, one behind the CRT
  const palms = [
    palm(-6, 476, 300, 62, 1, "#1a0616"),
    palm(1000, 476, 310, -56, 1.02, "#1a0616"),
  ].join("");

  // venetian blinds: the window shows through the gaps at full brightness,
  // the slats themselves are solid — that is what makes the sun read
  const SLAT = 10;
  const GAP = 8;
  const PERIOD = SLAT + GAP;
  const gaps = [];
  for (let y = -PERIOD; y < DESK; y += PERIOD) gaps.push([y + SLAT, GAP]);

  const slats = gaps
    .map(
      ([y]) =>
        `<rect x="0" y="${y - SLAT}" width="${W}" height="${SLAT}" fill="#1b0515"/>`,
    )
    .join("");
  const slatGlow = gaps
    .map(
      ([y]) =>
        `<rect x="0" y="${y - 2.2}" width="${W}" height="2.2" fill="#ffb07a" opacity=".4"/>`,
    )
    .join("");
  const gapMask = gaps
    .map(
      ([y, h]) =>
        `<rect x="0" y="${y}" width="${W}" height="${h}" fill="#fff"/>`,
    )
    .join("");

  const cords = [160, 480, 800, 1120]
    .map(
      (x) =>
        `<rect x="${x}" width="1.5" height="${DESK}" fill="#0b0208" opacity=".45"/>`,
    )
    .join("");

  const frame = `
    <rect x="0" y="${DESK - 10}" width="${W}" height="10" fill="#10030d"/>
    <rect x="0" y="${DESK - 10}" width="${W}" height="2" fill="#ffb066" opacity=".35"/>`;

  const desk = `
    <rect x="0" y="${DESK}" width="${W}" height="${600 - DESK}" fill="url(#sc_desk)"/>
    <rect x="0" y="${DESK}" width="${W}" height="${600 - DESK}" fill="url(#sc_pool)"/>
    <rect x="0" y="${DESK}" width="${W}" height="3" fill="#ffd0a0" opacity=".22"/>
    <ellipse cx="${CX + 330}" cy="446" rx="320" ry="60" fill="#ff7a3a" opacity=".16" filter="url(#sc_b18)"/>
    <ellipse cx="${CX + 206}" cy="478" rx="150" ry="30" fill="#00ff99" opacity=".12" filter="url(#sc_b18)"/>
    <ellipse cx="270" cy="500" rx="230" ry="46" fill="#ff6a3a" opacity=".1" filter="url(#sc_b18)"/>
    <rect x="0" y="580" width="${W}" height="1.5" fill="#ff9a5a" opacity=".14"/>`;

  const monitor = `
    <ellipse cx="240" cy="${DESK + 20}" rx="180" ry="18" fill="#000" opacity=".55" filter="url(#sc_b10)"/>
    <path d="M203 410L277 410L297 452H183Z" fill="#b18e72"/>
    <rect x="166" y="445" width="148" height="10" rx="4" fill="#dcc0a0"/>

    <rect x="60" y="132" width="360" height="278" rx="16" fill="url(#sc_body)"/>
    <rect x="61.5" y="133.5" width="357" height="275" rx="15" fill="none" stroke="#fff4de" stroke-opacity=".5" stroke-width="1.5"/>
    <rect x="60" y="360" width="360" height="50" rx="16" fill="url(#sc_shade)"/>

    <rect x="78" y="150" width="324" height="236" rx="12" fill="#a5856a"/>
    <rect x="78" y="150" width="324" height="236" rx="12" fill="url(#sc_well)"/>
    <rect x="86" y="158" width="308" height="220" rx="8" fill="#03110c" opacity=".92" filter="url(#sc_b18)"/>

    <g clip-path="url(#sc_screenclip)">
      <rect x="90" y="162" width="300" height="212" fill="url(#sc_crt)"/>
      <rect x="90" y="162" width="300" height="212" fill="url(#sc_crtglow)"/>

      <g filter="url(#sc_b4)" opacity="1">${pixels(cmdA, CMD_S, CMD_X, CMD_Y, `fill="#8dffbf"`)}${pixels(cmdB, CMD_S, STR_X, CMD_Y, `fill="#ff2e88"`)}</g>
      ${pixels(cmdA, CMD_S, CMD_X, CMD_Y, `fill="#e6fff2"`)}
      ${pixels(cmdB, CMD_S, STR_X, CMD_Y, `fill="#ffd6ea"`)}
      <g filter="url(#sc_b4)" opacity=".85">${pixels(out, 4, OUT_X, OUT_Y, `fill="#7dffb2"`)}</g>
      ${pixels(out, 4, OUT_X, OUT_Y, `fill="#d9ffe9"`)}
      ${pixels(prompt, 2, PROMPT_X, PROMPT_Y, `fill="#7dffb2" opacity=".92"`)}
      <rect x="${PROMPT_X + prompt.w * 2 + 6}" y="${PROMPT_Y}" width="12" height="14" fill="${GREEN}">
        <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.48;.52;.96;1" dur="1.15s" repeatCount="indefinite"/>
      </rect>

      <rect x="90" y="162" width="300" height="212" fill="url(#sc_scan)"/>
      <path d="M90 162L268 162L90 330Z" fill="#ffffff" opacity=".03"/>
      <rect x="90" y="162" width="300" height="212" fill="url(#sc_curv)"/>
    </g>

    ${pixels(layout("melon", F5, 1, false), 2, 96, 390, `fill="#7a5f49" opacity=".9"`)}
    <circle cx="392" cy="397" r="2.6" fill="#8bffb0"/>
    <circle cx="392" cy="397" r="7" fill="#8bffb0" opacity=".5" filter="url(#sc_b4)"/>`;

  const kb = `
    <ellipse cx="260" cy="538" rx="170" ry="14" fill="#000" opacity=".4" filter="url(#sc_b10)"/>
    <path d="M146 480H378L412 542H110Z" fill="url(#sc_kb)"/>
    <path d="M146 480H378" stroke="#fff2dc" stroke-opacity=".55" stroke-width="2"/>
    <g clip-path="url(#sc_kbclip)">
      ${[0, 1, 2]
        .map(
          (r) =>
            `<rect x="90" y="${498 + r * 14}" width="380" height="3" fill="#7d6553" opacity=".55"/>`,
        )
        .join("")}
      ${Array.from(
        { length: 22 },
        (_, i) =>
          `<rect x="${104 + i * 18}" y="486" width="2" height="62" fill="#7d6553" opacity=".55"/>`,
      ).join("")}
    </g>
    <path d="M470 512h26c8 0 12 6 12 13s-4 13-12 13h-26c-8 0-13-5-13-13s5-13 13-13z" fill="#cbb094"/>
    <path d="M455 512c-6 0-9-4-9-9v-18" stroke="#8a7663" stroke-width="2" fill="none" opacity=".7"/>`;

  const plant = `
    <ellipse cx="540" cy="544" rx="42" ry="8" fill="#000" opacity=".45" filter="url(#sc_b10)"/>
    <g fill="#245c39">
      <path d="M508 468H566L557 546H517Z" fill="#6f2c21"/>
      <ellipse cx="537" cy="468" rx="29" ry="6" fill="#82372a"/>
      ${[-168, -145, -122, -99, -76, -53, -30, -8]
        .map(
          (a, i) =>
            `<path d="${frond(66 + (i % 3) * 16, 30, 11, 1.05)}" transform="translate(537 468) rotate(${a})"/>`,
        )
        .join("")}
    </g>`;

  // small things on the desk, left and right of the CRT
  const props = `
    <ellipse cx="314" cy="556" rx="44" ry="8" fill="#000" opacity=".45" filter="url(#sc_b10)"/>
    <path d="M284 506h60v31a16 16 0 0 1-16 16h-28a16 16 0 0 1-16-16z" fill="url(#sc_body)"/>
    <path d="M344 514h6a18 18 0 0 1 0 36h-6" fill="none" stroke="#d9bb97" stroke-width="7"/>
    <ellipse cx="314" cy="506" rx="30" ry="8" fill="#2a0d1c"/>
    <ellipse cx="314" cy="504" rx="24" ry="6" fill="#4a1a2b"/>
    <path d="M301 494c-5-9 5-11 0-20M319 492c-5-9 5-11 0-20" stroke="#ffb9a0" stroke-width="2.4" fill="none" opacity=".26"/>

    <g transform="rotate(-5 186 532)">
      <rect x="140" y="508" width="92" height="52" rx="4" fill="#2c1024" stroke="#ff9a5a" stroke-opacity=".22"/>
      <rect x="148" y="515" width="76" height="22" rx="3" fill="#e9cba8" opacity=".9"/>
      <rect x="148" y="542" width="76" height="9" rx="2" fill="#1d0a17"/>
      <circle cx="166" cy="546" r="6" fill="#43202f" stroke="#e9cba8" stroke-opacity=".45"/>
      <circle cx="198" cy="546" r="6" fill="#43202f" stroke="#e9cba8" stroke-opacity=".45"/>
    </g>

    <ellipse cx="1108" cy="552" rx="70" ry="9" fill="#000" opacity=".4" filter="url(#sc_b10)"/>
    <rect x="1052" y="528" width="112" height="13" rx="2" fill="#3a1530" stroke="#ff8a5a" stroke-opacity=".2"/>
    <rect x="1060" y="515" width="96" height="13" rx="2" fill="#4a1a34" stroke="#ff8a5a" stroke-opacity=".2"/>
    <rect x="1056" y="502" width="104" height="13" rx="2" fill="#2c1024" stroke="#ff8a5a" stroke-opacity=".2"/>`;

  const rand = rng(CFG.seed);
  const dust = Array.from({ length: 64 }, () => {
    const x = 20 + rand() * (W - 40);
    const y = 30 + rand() * 390;
    const r = 0.7 + rand() * 1.4;
    const o = 0.08 + rand() * 0.3;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffd9a8" opacity="${o.toFixed(2)}"/>`;
  }).join("");

  return `<defs>
  <clipPath id="sc_sq"><rect width="${W}" height="600"/></clipPath>
  <mask id="sc_gaps" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${DESK}">
    <rect width="${W}" height="${DESK}" fill="#000"/>
    ${gapMask}
  </mask>

  <linearGradient id="sc_sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2b0a3e"/>
    <stop offset=".18" stop-color="#5d1553"/>
    <stop offset=".36" stop-color="#a72c58"/>
    <stop offset=".5" stop-color="#e34d4e"/>
    <stop offset=".66" stop-color="#ff8a45"/>
    <stop offset=".84" stop-color="#ffc06a"/>
    <stop offset="1" stop-color="#ffe0a0"/>
  </linearGradient>
  <radialGradient id="sc_bloom" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ffd88a" stop-opacity=".62"/>
    <stop offset=".4" stop-color="#ff7a3a" stop-opacity=".26"/>
    <stop offset="1" stop-color="#ff4a3a" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="sc_sun" cx=".5" cy=".45" r=".55">
    <stop offset="0" stop-color="#fffdf3"/>
    <stop offset=".45" stop-color="#ffeb9c"/>
    <stop offset=".66" stop-color="#ffc35f"/>
    <stop offset=".85" stop-color="#ff8f45" stop-opacity=".45"/>
    <stop offset="1" stop-color="#ff7a3d" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="sc_warm" cx=".81" cy=".6" r=".62">
    <stop offset="0" stop-color="#ffc07a" stop-opacity=".55"/>
    <stop offset="1" stop-color="#ff9a4a" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="sc_pool" cx=".5" cy="0" r=".85">
    <stop offset="0" stop-color="#ff9a5a" stop-opacity=".3"/>
    <stop offset=".5" stop-color="#ff7a3a" stop-opacity=".11"/>
    <stop offset="1" stop-color="#ff7a3a" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="sc_desk" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4a1733"/>
    <stop offset=".3" stop-color="#28091c"/>
    <stop offset="1" stop-color="#0a0110"/>
  </linearGradient>
  <linearGradient id="sc_body" x1=".2" y1="0" x2=".8" y2="1">
    <stop offset="0" stop-color="#fbead0"/>
    <stop offset=".45" stop-color="#ecd3b2"/>
    <stop offset="1" stop-color="#c2a084"/>
  </linearGradient>
  <linearGradient id="sc_shade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#6d4a33" stop-opacity="0"/>
    <stop offset="1" stop-color="#6d4a33" stop-opacity=".35"/>
  </linearGradient>
  <linearGradient id="sc_well" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3a2318" stop-opacity=".6"/>
    <stop offset=".3" stop-color="#3a2318" stop-opacity="0"/>
    <stop offset="1" stop-color="#3a2318" stop-opacity=".45"/>
  </linearGradient>
  <linearGradient id="sc_crt" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#051a11"/>
    <stop offset=".6" stop-color="#03120c"/>
    <stop offset="1" stop-color="#020b07"/>
  </linearGradient>
  <radialGradient id="sc_crtglow" cx=".45" cy=".5" r=".66">
    <stop offset="0" stop-color="#14ffa2" stop-opacity=".12"/>
    <stop offset="1" stop-color="#14ffa2" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="sc_curv" cx=".5" cy=".5" r=".72">
    <stop offset=".5" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".6"/>
  </radialGradient>
  <linearGradient id="sc_kb" x1=".2" y1="0" x2=".8" y2="1">
    <stop offset="0" stop-color="#eed9bd"/>
    <stop offset="1" stop-color="#a5876b"/>
  </linearGradient>
  <pattern id="sc_scan" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1.4" fill="#000" opacity=".38"/>
  </pattern>

  <clipPath id="sc_screenclip"><rect x="90" y="162" width="300" height="212" rx="6"/></clipPath>
  <clipPath id="sc_kbclip"><path d="M146 480H378L412 542H110Z"/></clipPath>

  <filter id="sc_b4" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="sc_b10" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="sc_b18" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="sc_b30" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="30"/></filter>
  <filter id="sc_grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <radialGradient id="sc_vig" cx=".48" cy=".5" r=".74">
    <stop offset=".45" stop-color="#05000a" stop-opacity="0"/>
    <stop offset="1" stop-color="#05000a" stop-opacity=".7"/>
  </radialGradient>
</defs>

<g clip-path="url(#sc_sq)">
  <g mask="url(#sc_gaps)">${sky}${sun}${palms}</g>
  ${slats}
  ${slatGlow}
  ${cords}
  <rect width="${W}" height="${DESK}" fill="url(#sc_warm)" opacity=".38"/>
  ${frame}
  ${desk}
  ${dust}
  ${props}
  <g transform="translate(${CX - 38} 0)">${monitor}${kb}</g>
  <g transform="translate(${CX} 0)">${plant}</g>
  <rect width="${W}" height="600" filter="url(#sc_grain)" opacity=".05"/>
  <rect width="${W}" height="600" fill="url(#sc_vig)"/>
</g>
<rect x="1" y="1" width="${W - 2}" height="598" fill="none" stroke="#ff3e9d" stroke-opacity=".45" stroke-width="2"/>`;
}

// ── cover ──────────────────────────────────────────────────────────────────
function cover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 600" width="1280" height="600" role="img" aria-label="${CFG.name}">
${scene()}
</svg>
`;
}

for (const f of ["cover-dark.svg", "cover-light.svg", "hero.svg", "strip.svg"]) {
  rmSync(resolve(OUT, f), { force: true });
}
const svg = cover();
writeFileSync(resolve(OUT, "cover.svg"), svg);
console.log(`✓ assets/cover.svg  ${(svg.length / 1024).toFixed(1)} kB`);