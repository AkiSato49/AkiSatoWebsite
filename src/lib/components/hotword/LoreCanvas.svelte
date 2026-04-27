<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  type ShapeFn = (y: number) => { x: number; w: number } | null

  let {
    text       = '',
    font       = '11px "Courier New", monospace',
    lineHeight = 17,
    color      = 'rgba(154,148,141,0.4)',
    width      = 500,
    height     = 480,
    shape      = null as ShapeFn | null,
  }: {
    text?:       string
    font?:       string
    lineHeight?: number
    color?:      string
    width?:      number
    height?:     number
    shape?:      ShapeFn | null
  } = $props()

  let canvas  = $state<HTMLCanvasElement | null>(null)
  let pretext: any = null
  let exclusions: { x:number; y:number; w:number; h:number }[] = []

  function draw() {
    if (!canvas || !pretext) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = color
    ctx.font = font

    const { prepareWithSegments, layoutNextLineRange, materializeLineRange } = pretext
    const prepared = prepareWithSegments(text, font)
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = lineHeight

    while (y < height) {
      const seg = shape ? shape(y - lineHeight * 0.4) : { x: 0, w: width }
      if (!seg || seg.w < 8) { y += lineHeight; continue }

      const xStart = seg.x
      const xEnd   = seg.x + seg.w

      // find exclusions overlapping this line
      const ex = exclusions.find(e => y > e.y && y <= e.y + e.h) ?? null

      if (!ex) {
        // ── no exclusion: full segment ──────────────────────
        const avail = xEnd - xStart
        if (avail < 8) { y += lineHeight; continue }
        const range = layoutNextLineRange(prepared, cursor, avail)
        if (range === null) break
        ctx.fillText(materializeLineRange(prepared, range).text, xStart, y)
        cursor = range.end

      } else {
        // ── exclusion splits line into left + right ─────────
        const leftEnd    = Math.min(xEnd, ex.x)
        const rightStart = Math.max(xStart, ex.x + ex.w)
        const leftAvail  = Math.max(0, leftEnd - xStart)
        const rightAvail = Math.max(0, xEnd - rightStart)

        // left piece
        if (leftAvail >= 8) {
          const range = layoutNextLineRange(prepared, cursor, leftAvail)
          if (range === null) break
          ctx.fillText(materializeLineRange(prepared, range).text, xStart, y)
          cursor = range.end
        }

        // right piece — continues from cursor after left
        if (rightAvail >= 8) {
          const range = layoutNextLineRange(prepared, cursor, rightAvail)
          if (range !== null) {
            ctx.fillText(materializeLineRange(prepared, range).text, rightStart, y)
            cursor = range.end
          }
        }
      }

      y += lineHeight
    }
  }

  export function setExclusions(rects: { x:number; y:number; w:number; h:number }[]) {
    exclusions = rects
    draw()
  }

  onMount(async () => {
    if (!browser) return
    pretext = await import('@chenglou/pretext')
    draw()
  })

  $effect(() => { text; width; height; shape; draw() })
</script>

<canvas bind:this={canvas} {width} {height} style="display:block;"></canvas>
