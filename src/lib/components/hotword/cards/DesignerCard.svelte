<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  const W = 232, H = 188
  const GAP = 3
  const LABELS = ['grid', 'type', 'space', 'motion', 'system', 'colour']
  const COUNT = 6

  interface Block { x:number; y:number; w:number; h:number; label:string; filled:boolean }

  let blocks = $state<Block[]>([])
  let els: (HTMLDivElement|null)[] = Array(COUNT).fill(null)
  let timer: ReturnType<typeof setInterval>|null = null
  let gsapRef: any = null

  function layout(): {x:number;y:number;w:number;h:number}[] {
    const cols = Math.random() > 0.45 ? 2 : 3
    // random column widths
    const widths: number[] = []
    let rem = W
    for (let c = 0; c < cols - 1; c++) {
      const w = Math.floor(rem * (0.28 + Math.random() * 0.35))
      widths.push(w); rem -= w + GAP
    }
    widths.push(Math.max(rem, 30))

    // distribute COUNT blocks across cols
    const perCol: number[] = []
    let left = COUNT
    for (let c = 0; c < cols - 1; c++) {
      const n = Math.max(1, Math.min(left - (cols - c - 1), Math.round(COUNT / cols) + (Math.random()>.5?1:0)))
      perCol.push(n); left -= n
    }
    perCol.push(Math.max(1, left))

    const positions: {x:number;y:number;w:number;h:number}[] = []
    for (let c = 0; c < cols; c++) {
      const x = widths.slice(0,c).reduce((a,b)=>a+b+GAP, 0)
      const w = widths[c]
      const n = perCol[c]
      let y = 0
      for (let r = 0; r < n; r++) {
        const avail = H - y - (n - r - 1) * (22 + GAP)
        const h = r === n-1 ? H - y : Math.max(22, Math.floor(avail * (0.3 + Math.random() * 0.55)))
        positions.push({ x, y, w, h: Math.min(h, H - y) })
        y += h + GAP
      }
    }
    return positions
  }

  function applyLayout() {
    if (!gsapRef) return
    const pos = layout()
    pos.forEach((p, i) => {
      const el = els[i]
      if (!el) return
      gsapRef.to(el, { left: p.x, top: p.y, width: p.w, height: p.h, duration: 0.65, ease: 'power3.inOut' })
    })
  }

  onMount(async () => {
    const mod = await import('gsap')
    gsapRef = mod.gsap
    const pos = layout()
    blocks = pos.map((p, i) => ({ ...p, label: LABELS[i % LABELS.length], filled: Math.random() > 0.4 }))
    // set initial positions via gsap after DOM ready
    await new Promise(r => setTimeout(r, 0))
    timer = setInterval(applyLayout, 1800)
  })

  onDestroy(() => { if (timer) clearInterval(timer) })
</script>

<div class="dc" style="width:{W}px; height:{H}px;">
  {#each blocks as block, i}
    <div
      bind:this={els[i]}
      class="block"
      class:filled={block.filled}
      style="left:{block.x}px; top:{block.y}px; width:{block.w}px; height:{block.h}px;"
    >
      {#if block.label && block.h > 30}
        <span class="bl">{block.label}</span>
      {/if}
    </div>
  {/each}
</div>

<style>
  .dc { position:relative; overflow:hidden; }

  .block {
    position: absolute;
    border: 1px solid var(--border);
    background: var(--surface);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
    display: flex;
    align-items: flex-end;
    padding: 5px 6px;
    transition: border-color 0.3s;
  }

  .block.filled {
    background-color: var(--concrete);
    border-color: var(--border);
  }

  .bl {
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    font-family: var(--font);
    line-height: 1;
  }
</style>
