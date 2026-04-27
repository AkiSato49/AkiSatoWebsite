<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  let {
    text       = '',
    font       = '16px Inter, sans-serif',
    lineHeight = 26,
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

  // exclusion rects in canvas-local coords: {x,y,w,h}
  // set from parent via setExclusions()
  let exclusions: { x: number; y: number; w: number; h: number }[] = []

  let canvas = $state<HTMLCanvasElement | null>(null)
  let pretext: typeof import('@chenglou/pretext') | null = null

  async function init() {
    if (!browser) return
    pretext = await import('@chenglou/pretext')
    draw()
  }

  function draw() {
    if (!canvas || !pretext) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = color
    ctx.font = font

    const { prepareWithSegments, layoutNextLineRange, materializeLineRange } = pretext

    const prepared = prepareWithSegments(text, font)
    let cursor: { segmentIndex: number; graphemeIndex: number } = {
      segmentIndex: 0,
      graphemeIndex: 0,
    }
    let y = lineHeight

    while (y < height) {
      // find narrowest available width at this y (from exclusions on right side)
      let avail = width
      for (const ex of exclusions) {
        if (y >= ex.y && y <= ex.y + ex.h) {
          // fragment intrudes from right — restrict line width to fragment's left edge
          avail = Math.min(avail, ex.x)
        }
      }
      // clamp to something usable
      avail = Math.max(avail, 40)

      const range = layoutNextLineRange(prepared, cursor, avail)
      if (range === null) break

      const line = materializeLineRange(prepared, range)
      ctx.fillText(line.text, 0, y)
      cursor = range.end
      y += lineHeight
    }
  }

  // called by parent each GSAP tick
  export function setExclusions(
    rects: { x: number; y: number; w: number; h: number }[]
  ) {
    exclusions = rects
    draw()
  }

  onMount(init)

  $effect(() => {
    // redraw when text/size props change
    text; width; height
    draw()
  })
</script>

<canvas
  bind:this={canvas}
  {width}
  {height}
  style="display:block; width:{width}px; height:{height}px;"
></canvas>
