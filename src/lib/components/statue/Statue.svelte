<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'
  import StatueFragment from './StatueFragment.svelte'
  import CanvasText    from './CanvasText.svelte'
  import HotwordCanvas from '../hotword/HotwordCanvas.svelte'
  import type { StatueDef } from '$lib/utils/shapes'

  let {
    def,
    bodyText = '',
    trigger,             // CSS selector or element for ScrollTrigger
    textFont  = '15px Inter, sans-serif',
    textLineH = 24,
    textColor = '#9a948d',
    textWidth     = 340,
    textHeight    = 500,
    statueOffsetX = 0,
    useHotwords   = false,
  }: {
    def:           StatueDef
    bodyText?:     string
    trigger?:      string | HTMLElement
    textFont?:     string
    textLineH?:    number
    textColor?:    string
    textWidth?:     number
    textHeight?:    number
    statueOffsetX?: number
    useHotwords?:   boolean
  } = $props()

  let canvasText      = $state<{ setExclusions: (r: any[]) => void } | null>(null)
  let hotwordCanvas   = $state<{ setExclusions: (r: any[]) => void } | null>(null)
  let statueContainer = $state<HTMLDivElement | null>(null)

  let cleanup: (() => void) | null = null

  onMount(async () => {
    if (!browser) return
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const els = Array.from(
      statueContainer!.querySelectorAll('.fragment')
    ) as HTMLElement[]
    if (!els.length) return

    // set initial state
    def.frags.forEach((frag, i) => {
      gsap.set(els[i], {
        x: frag.fromX,
        y: frag.fromY,
        rotation: frag.fromR,
        opacity: 0,
      })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || statueContainer,
        start: 'top 95%',
        end: 'top 30%',
        scrub: 0.8,
        onUpdate: () => updateCanvas(els),
      },
    })

    // stagger fragments by order
    const sorted = [...def.frags].sort((a, b) => a.order - b.order)
    sorted.forEach(frag => {
      const el = els[def.frags.indexOf(frag)]
      tl.to(
        el,
        {
          x: 0, y: 0, rotation: 0, opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        },
        frag.order * 0.8  // position on timeline 0→0.8
      )
    })

    // refresh after layout settles
    setTimeout(() => ScrollTrigger.refresh(), 300)

    cleanup = () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === (trigger || statueContainer)) st.kill()
      })
    }
  })

  onDestroy(() => cleanup?.())

  function updateCanvas(els: HTMLElement[]) {
    if (!canvasText || !statueContainer) return

    const containerRect = statueContainer.parentElement!.getBoundingClientRect()

    const rects = els.map(el => {
      const r = el.getBoundingClientRect()
      return {
        x: r.left - containerRect.left - statueOffsetX,
        y: r.top  - containerRect.top,
        w: r.width,
        h: r.height,
      }
    }).filter(r => r.x < textWidth) // only those overlapping text column

    canvasText?.setExclusions(rects)
    hotwordCanvas?.setExclusions(rects)
  }
</script>

<div class="statue-layout">
  <!-- left: pretext canvas text -->
  <div class="text-col" style="width:{textWidth}px; height:{textHeight}px;">
    {#if useHotwords}
      <HotwordCanvas
        bind:this={hotwordCanvas}
        text={bodyText}
        font={textFont}
        lineHeight={textLineH}
        color={textColor}
        width={textWidth}
        height={textHeight}
      />
    {:else}
      <CanvasText
        bind:this={canvasText}
        text={bodyText}
        font={textFont}
        lineHeight={textLineH}
        color={textColor}
        width={textWidth}
        height={textHeight}
      />
    {/if}
  </div>

  <!-- right: fragment assembly -->
  <div
    bind:this={statueContainer}
    class="statue-container"
    style="width:{def.w}px; height:{def.h}px;"
  >
    {#each def.frags as frag}
      <StatueFragment
        def={frag}
        theme={def.theme}
        containerW={def.w}
        containerH={def.h}
      />
    {/each}
  </div>
</div>

<style>
  .statue-layout {
    display: flex;
    align-items: flex-start;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .text-col {
    flex: 1;
    min-width: 220px;
    position: relative;
  }

  .statue-container {
    position: relative;
    flex-shrink: 0;
  }
</style>
