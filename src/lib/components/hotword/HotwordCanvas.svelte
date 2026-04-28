<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  let {
    text       = '',
    font       = '17px Inter, sans-serif',
    lineHeight = 28,
    color      = '#9a948d',
    width      = 400,
    height     = 500,
  }: {
    text?:       string
    font?:       string
    lineHeight?: number
    color?:      string
    width?:      number
    height?:     number
  } = $props()

  // hotword → card component + approximate card dimensions
  const HOTWORDS: Record<string, { Card: Component; w: number; h: number }> = {}

  let canvas      = $state<HTMLCanvasElement|null>(null)
  let pretext:    any = null
  let wordRects   = $state<Record<string, {x:number;y:number;w:number;h:number}>>({})
  let activeWord  = $state<string|null>(null)
  let cardPos     = $state<{x:number;y:number}>({x:0, y:0})
  let leaveTimer: ReturnType<typeof setTimeout>|null = null

  // exclusions: base (from statue fragments) + card exclusion
  let baseExclusions: {x:number;y:number;w:number;h:number}[] = []
  let cardExclusion:  {x:number;y:number;w:number;h:number}|null = null

  function allExclusions() {
    return cardExclusion ? [...baseExclusions, cardExclusion] : baseExclusions
  }

  function draw() {
    if (!canvas || !pretext) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, width, height)
    ctx.font = font

    const { prepareWithSegments, layoutNextLineRange, materializeLineRange } = pretext
    const prepared = prepareWithSegments(text, font)
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = lineHeight
    const newRects: typeof wordRects = {}
    const excls = allExclusions()

    while (y < height) {
      let avail = width
      for (const ex of excls) {
        if (y >= ex.y && y <= ex.y + ex.h) avail = Math.min(avail, ex.x)
      }
      avail = Math.max(avail, 40)

      const range = layoutNextLineRange(prepared, cursor, avail)
      if (range === null) break
      const line = materializeLineRange(prepared, range)

      // find hotwords in this line
      for (const [key] of Object.entries(HOTWORDS)) {
        const idx = line.text.toLowerCase().indexOf(key)
        if (idx >= 0 && !newRects[key]) {
          const before = line.text.slice(0, idx)
          const wx = ctx.measureText(before).width
          const ww = ctx.measureText(line.text.slice(idx, idx + key.length)).width
          newRects[key] = { x: wx, y: y - lineHeight, w: ww, h: lineHeight + 2 }

          // subtle underline
          ctx.fillStyle = activeWord === key ? 'rgba(200,184,154,0.5)' : 'rgba(200,184,154,0.2)'
          ctx.fillRect(wx, y + 3, ww, 1)
        }
      }

      ctx.fillStyle = color
      ctx.fillText(line.text, 0, y)
      cursor = range.end
      y += lineHeight
    }

    wordRects = newRects
  }

  // called by parent (Statue) each GSAP tick
  export function setExclusions(rects: {x:number;y:number;w:number;h:number}[]) {
    baseExclusions = rects
    draw()
  }

  function showCard(word: string, rect: {x:number;y:number;w:number;h:number}) {
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
    const cfg = HOTWORDS[word]
    if (!cfg) return

    // position card to the right of the canvas, vertically near the word
    const cx = width - cfg.w - 4
    const cy = Math.max(0, Math.min(rect.y - cfg.h / 2 + lineHeight, height - cfg.h))
    cardPos = { x: cx, y: cy }

    cardExclusion = { x: cx - 8, y: cy - 4, w: cfg.w + 12, h: cfg.h + 8 }
    activeWord = word
    draw()
  }

  function hideCard() {
    leaveTimer = setTimeout(() => {
      activeWord = null
      cardExclusion = null
      draw()
    }, 120)
  }

  function keepCard() {
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
  }

  onMount(async () => {
    if (!browser) return
    pretext = await import('@chenglou/pretext')
    draw()
  })

  $effect(() => { text; width; height; draw() })
</script>

<div class="hw-wrap" style="width:{width}px; height:{height}px;">
  <canvas bind:this={canvas} {width} {height}></canvas>

  <!-- invisible hotword hit areas -->
  {#each Object.entries(wordRects) as [word, rect]}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="hit"
      style="left:{rect.x}px; top:{rect.y}px; width:{rect.w}px; height:{rect.h}px;"
      onmouseenter={() => showCard(word, rect)}
      onmouseleave={hideCard}
    ></div>
  {/each}

  <!-- active card -->
  {#if activeWord && HOTWORDS[activeWord]}
    {@const cfg = HOTWORDS[activeWord]}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="card-wrap"
      style="left:{cardPos.x}px; top:{cardPos.y}px;"
      onmouseenter={keepCard}
      onmouseleave={hideCard}
    >
      <cfg.Card />
    </div>
  {/if}
</div>

<style>
  .hw-wrap {
    position: relative;
  }

  canvas {
    display: block;
  }

  .hit {
    position: absolute;
    cursor: crosshair;
    z-index: 5;
  }

  .card-wrap {
    position: absolute;
    z-index: 20;
    animation: cardIn 0.22s cubic-bezier(0.16,1,0.3,1) both;
    transform-origin: top left;
  }

  @keyframes cardIn {
    from { opacity:0; transform: scale(0.92) translateY(6px); }
    to   { opacity:1; transform: scale(1)    translateY(0);   }
  }
</style>
