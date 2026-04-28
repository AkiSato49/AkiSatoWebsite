import type { AsciiTheme } from './ascii'

export interface FragmentDef {
  id:            string
  // final position inside statue container (px)
  x: number; y: number; w: number; h: number
  // CSS clip-path
  clip:          string
  // entrance offsets (px / deg)
  fromX:         number
  fromY:         number
  fromR:         number  // rotation degrees
  // stagger 0-1 (1 = last)
  order:         number
}

export interface StatueDef {
  w:       number   // container width
  h:       number   // container height
  theme:   AsciiTheme
  frags:   FragmentDef[]
}

// ─── Hero: 8 horizontal slabs ────────────────────────────────
const HW = 250, HH = 440
export const heroStatue: StatueDef = {
  w: HW, h: HH, theme: 'hero',
  frags: [
    { id:'h0', x:8,  y:0,   w:HW-10, h:58, clip:'polygon(0% 5%, 100% 0%, 98% 100%, 2% 96%)',   fromX:-420, fromY:-60,  fromR:-9,  order:0   },
    { id:'h1', x:4,  y:55,  w:HW-4,  h:56, clip:'polygon(1% 0%, 99% 3%, 100% 97%, 0% 100%)',    fromX: 420, fromY:-40,  fromR: 7,  order:0.1 },
    { id:'h2', x:10, y:108, w:HW-14, h:60, clip:'polygon(3% 2%, 97% 0%, 100% 100%, 0% 98%)',    fromX:-420, fromY:-20,  fromR:-6,  order:0.2 },
    { id:'h3', x:2,  y:165, w:HW-6,  h:58, clip:'polygon(0% 0%, 100% 4%, 96% 96%, 4% 100%)',    fromX: 420, fromY: 0,   fromR: 8,  order:0.3 },
    { id:'h4', x:6,  y:220, w:HW-8,  h:56, clip:'polygon(2% 3%, 98% 0%, 100% 98%, 0% 100%)',    fromX:-420, fromY: 20,  fromR:-7,  order:0.4 },
    { id:'h5', x:0,  y:273, w:HW-4,  h:58, clip:'polygon(0% 0%, 100% 2%, 98% 100%, 2% 97%)',    fromX: 420, fromY: 40,  fromR: 5,  order:0.5 },
    { id:'h6', x:8,  y:328, w:HW-12, h:56, clip:'polygon(4% 1%, 96% 0%, 100% 100%, 0% 96%)',    fromX:-420, fromY: 60,  fromR:-8,  order:0.6 },
    { id:'h7', x:2,  y:381, w:HW-4,  h:59, clip:'polygon(0% 4%, 100% 0%, 98% 96%, 2% 100%)',    fromX: 420, fromY: 80,  fromR: 6,  order:0.7 },
  ]
}

// ─── About: 8 wedge/disc fragments ───────────────────────────
const AW = 280, AH = 280
const cx = AW / 2, cy = AH / 2, r = 130

function wedge(i: number, total: number): FragmentDef {
  const a0 = (i / total) * 360
  const a1 = ((i + 1) / total) * 360
  const toRad = (d: number) => (d * Math.PI) / 180
  const x0 = cx + r * Math.cos(toRad(a0))
  const y0 = cy + r * Math.sin(toRad(a0))
  const x1 = cx + r * Math.cos(toRad(a1))
  const y1 = cy + r * Math.sin(toRad(a1))
  const mid = (a0 + a1) / 2
  const dist = 260
  return {
    id: `a${i}`,
    x: 0, y: 0, w: AW, h: AH,
    clip: `polygon(${cx}px ${cy}px, ${x0.toFixed(1)}px ${y0.toFixed(1)}px, ${x1.toFixed(1)}px ${y1.toFixed(1)}px)`,
    fromX: dist * Math.cos(toRad(mid)),
    fromY: dist * Math.sin(toRad(mid)),
    fromR: (i % 2 === 0 ? 1 : -1) * (25 + i * 5),
    order: i / 8,
  }
}
export const aboutStatue: StatueDef = {
  w: AW, h: AH, theme: 'about',
  frags: Array.from({ length: 8 }, (_, i) => wedge(i, 8))
}

// ─── Projects: two columns of falling blocks ─────────────────
const PW = 270, PH = 400
export const projectsStatue: StatueDef = {
  w: PW, h: PH, theme: 'projects',
  frags: [
    // left column
    { id:'p0', x:0,   y:0,   w:120, h:90,  clip:'polygon(0% 0%, 100% 3%, 97% 100%, 0% 97%)',   fromX:-20, fromY:-450, fromR:-10, order:0   },
    { id:'p1', x:0,   y:96,  w:120, h:88,  clip:'polygon(2% 0%, 98% 2%, 100% 98%, 0% 100%)',    fromX:-20, fromY:-450, fromR: 8,  order:0.1 },
    { id:'p2', x:0,   y:190, w:120, h:90,  clip:'polygon(0% 3%, 100% 0%, 98% 97%, 2% 100%)',    fromX:-20, fromY:-450, fromR:-6,  order:0.2 },
    { id:'p3', x:0,   y:286, w:120, h:114, clip:'polygon(1% 0%, 99% 2%, 100% 100%, 0% 98%)',    fromX:-20, fromY:-450, fromR: 9,  order:0.3 },
    // right column
    { id:'p4', x:148, y:0,   w:122, h:90,  clip:'polygon(0% 3%, 100% 0%, 100% 97%, 3% 100%)',   fromX: 20, fromY:-450, fromR: 11, order:0.15 },
    { id:'p5', x:148, y:96,  w:122, h:88,  clip:'polygon(3% 0%, 97% 3%, 100% 100%, 0% 98%)',    fromX: 20, fromY:-450, fromR:-8,  order:0.25 },
    { id:'p6', x:148, y:190, w:122, h:90,  clip:'polygon(0% 0%, 100% 2%, 97% 100%, 2% 96%)',    fromX: 20, fromY:-450, fromR: 7,  order:0.35 },
    { id:'p7', x:148, y:286, w:122, h:114, clip:'polygon(2% 2%, 98% 0%, 100% 98%, 0% 100%)',    fromX: 20, fromY:-450, fromR:-10, order:0.45 },
  ]
}

// ─── Inspirations: 3×3 grid snapping in ──────────────────────
const IW = 270, IH = 270
const cell = 82, gap = 12

function gridCell(col: number, row: number): FragmentDef {
  const i = row * 3 + col
  const cx2 = col * (cell + gap)
  const cy2 = row * (cell + gap)
  const angle = (Math.random() > 0.5 ? 1 : -1) * (30 + i * 7)
  const dx = (col - 1) * 280
  const dy = (row - 1) * 280
  return {
    id: `i${i}`,
    x: cx2, y: cy2, w: cell, h: cell,
    clip: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    fromX: dx, fromY: dy, fromR: angle,
    order: i / 9,
  }
}
// ─── Touch: wide slabs that fill the TOUCH display line ───────────────────
const TTW = 1200, TTH = 310
export const touchStatue: StatueDef = {
  w: TTW, h: TTH, theme: 'contact',
  frags: [
    { id:'t0', x:0, y:0,   w:TTW, h:58, clip:'polygon(0% 0%, 100% 3%, 97% 100%, 0% 97%)',  fromX:-520, fromY:0, fromR:-6,  order:0    },
    { id:'t1', x:0, y:62,  w:TTW, h:58, clip:'polygon(2% 0%, 98% 2%, 100% 97%, 0% 100%)',  fromX: 520, fromY:0, fromR: 5,  order:0.2  },
    { id:'t2', x:0, y:124, w:TTW, h:58, clip:'polygon(0% 3%, 100% 0%, 98% 97%, 2% 100%)',  fromX:-520, fromY:0, fromR:-5,  order:0.4  },
    { id:'t3', x:0, y:186, w:TTW, h:58, clip:'polygon(1% 0%, 99% 2%, 100% 100%, 0% 98%)',  fromX: 520, fromY:0, fromR: 6,  order:0.6  },
    { id:'t4', x:0, y:252, w:TTW, h:58, clip:'polygon(0% 2%, 100% 0%, 99% 98%, 1% 100%)',  fromX:-520, fromY:0, fromR:-4,  order:0.8  },
  ]
}

// ─── Contact: horizontal slabs flying in from sides ──────────────────────
const CTW = 240, CTH = 330
export const contactStatue: StatueDef = {
  w: CTW, h: CTH, theme: 'contact',
  frags: [
    { id:'ct0', x:0, y:0,   w:CTW, h:52, clip:'polygon(0% 0%, 100% 3%, 97% 100%, 0% 97%)',   fromX:-380, fromY:0, fromR:-8,  order:0    },
    { id:'ct1', x:0, y:57,  w:CTW, h:52, clip:'polygon(2% 0%, 98% 2%, 100% 97%, 0% 100%)',   fromX: 380, fromY:0, fromR: 7,  order:0.15 },
    { id:'ct2', x:0, y:114, w:CTW, h:52, clip:'polygon(0% 3%, 100% 0%, 98% 97%, 2% 100%)',   fromX:-380, fromY:0, fromR:-6,  order:0.3  },
    { id:'ct3', x:0, y:171, w:CTW, h:52, clip:'polygon(1% 0%, 99% 2%, 100% 100%, 0% 98%)',   fromX: 380, fromY:0, fromR: 9,  order:0.45 },
    { id:'ct4', x:0, y:228, w:CTW, h:52, clip:'polygon(0% 0%, 100% 2%, 98% 100%, 2% 97%)',   fromX:-380, fromY:0, fromR:-7,  order:0.6  },
    { id:'ct5', x:0, y:278, w:CTW, h:52, clip:'polygon(3% 1%, 97% 0%, 100% 100%, 0% 96%)',   fromX: 380, fromY:0, fromR: 6,  order:0.75 },
  ]
}

export const inspirationsStatue: StatueDef = {
  w: IW, h: IH, theme: 'inspirations',
  frags: [0,1,2].flatMap(row => [0,1,2].map(col => gridCell(col, row)))
}
