<script lang="ts">
  import { onMount } from 'svelte'

  const COLS = 5
  const ROWS = 5
  // one "free" cell that breaks the grid intentionally
  const FREE = { col: 3, row: 2 }

  let lines  = $state<{ type:'h'|'v'; pos:number }[]>([])
  let ready  = $state(false)

  onMount(async () => {
    const { gsap } = await import('gsap')
    // reveal grid lines one by one
    const all: typeof lines = []
    for (let i = 0; i <= ROWS; i++) all.push({ type:'h', pos: i })
    for (let i = 0; i <= COLS; i++) all.push({ type:'v', pos: i })
    lines = all

    await new Promise(r => setTimeout(r, 80))
    ready = true
  })
</script>

<div class="jc">
  <div class="grid-box">
    <!-- SVG grid -->
    <svg class="grid-svg" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      {#each Array(ROWS + 1) as _, i}
        <line
          x1="0" y1={i * 30}
          x2="150" y2={i * 30}
          class="gl" class:ready
          style="transition-delay:{i * 0.04}s"
        />
      {/each}
      {#each Array(COLS + 1) as _, i}
        <line
          x1={i * 30} y1="0"
          x2={i * 30} y2="150"
          class="gl" class:ready
          style="transition-delay:{(i + ROWS) * 0.04}s"
        />
      {/each}

      <!-- the one free element -->
      <rect
        x={FREE.col * 30 + 3}
        y={FREE.row * 30 + 3}
        width="54" height="54"
        class="free-rect" class:ready
      />
    </svg>
  </div>

  <div class="jc-foot">
    <span class="label" style="font-size:0.52rem; color:var(--muted)">Japan · structure opens space</span>
  </div>
</div>

<style>
  .jc {
    width: 196px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 10px;
  }

  .grid-box {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }

  .grid-svg { width: 100%; height: 100%; }

  .gl {
    stroke: var(--border);
    stroke-width: 0.8;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .gl.ready { opacity: 1; }

  .free-rect {
    fill: var(--accent);
    opacity: 0;
    transition: opacity 0.4s 0.55s;
  }
  .free-rect.ready { opacity: 0.85; }

  .jc-foot {
    margin-top: 8px;
    padding-top: 6px;
    border-top: 1px solid var(--border);
  }
</style>
