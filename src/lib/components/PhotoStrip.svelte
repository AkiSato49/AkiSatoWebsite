<script lang="ts">
  import { onMount } from 'svelte'
  import { SHAPES } from '$lib/utils/svgShapes'

  interface Props {
    height?: number   // shard size + strip height px
    speed?:  number   // scroll seconds
    count?:  number   // unique shards before loop repeats
    gap?:    number
  }

  let { height = 130, speed = 40, count = 14, gap = 8 }: Props = $props()

  let trackEl = $state<HTMLElement | null>(null)
  let halfW   = $state(0)

  onMount(() => {
    const measure = () => { if (trackEl) halfW = trackEl.scrollWidth / 2 }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackEl!)
    return () => ro.disconnect()
  })

  // concrete tone variants — matches statue fragment palette
  const TONES = [
    { hue: 28, lit: 22 }, { hue: 31, lit: 24 }, { hue: 26, lit: 20 },
    { hue: 30, lit: 26 }, { hue: 29, lit: 23 }, { hue: 27, lit: 21 },
    { hue: 32, lit: 25 }, { hue: 28, lit: 19 }, { hue: 33, lit: 27 },
  ]

  function hsl(t: { hue: number; lit: number }) {
    return `hsl(${t.hue}deg 8% ${t.lit}%)`
  }

  const uid = Math.random().toString(36).slice(2, 7)

  // build shard list
  const single = Array.from({ length: count }, (_, i) => ({
    shape: SHAPES[i % SHAPES.length],
    tone:  TONES[i % TONES.length],
    id:    `${uid}-${i}`,
  }))

  // duplicate for seamless loop
  const strip = [
    ...single,
    ...single.map((x, i) => ({ ...x, id: `${uid}-b${i}` })),
  ]
</script>

<!-- shared filter + gradient defs (one per strip, referenced by all shards) -->
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="{uid}-f" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="t"/>
      <feColorMatrix type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0"
        in="t" result="n"/>
      <feComposite operator="over" in="n" in2="SourceGraphic"/>
    </filter>
    <linearGradient id="{uid}-g" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%"   stop-color="white" stop-opacity="0.07"/>
      <stop offset="55%"  stop-color="black" stop-opacity="0"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
</svg>

<div class="strip" style="--h:{height}px; --speed:{speed}s; --gap:{gap}px">
  <div class="track" bind:this={trackEl} style={halfW ? `--half:${halfW}px` : ''}>
    {#each strip as item}
      <div class="shard" style="width:{height}px">
        <svg
          viewBox="0 0 96 96"
          xmlns="http://www.w3.org/2000/svg"
          width="100%" height="100%"
        >
          <defs>
            <clipPath id={item.id}>
              {#if item.shape.type === 'path'}
                <path d={item.shape.d} />
              {:else}
                <polygon points={item.shape.points} />
              {/if}
            </clipPath>
          </defs>

          <!-- concrete base with noise texture -->
          <rect x="0" y="0" width="96" height="96"
            fill={hsl(item.tone)}
            clip-path="url(#{item.id})"
            filter="url(#{uid}-f)"
          />
          <!-- gradient overlay -->
          <rect x="0" y="0" width="96" height="96"
            fill="url(#{uid}-g)"
            clip-path="url(#{item.id})"
          />
          <!-- inner shadow line -->
          <rect x="1" y="1" width="94" height="94"
            fill="none"
            stroke="white" stroke-opacity="0.07" stroke-width="1.5"
            clip-path="url(#{item.id})"
          />
        </svg>
      </div>
    {/each}
  </div>
</div>

<style>
  .strip {
    width: 100%;
    height: var(--h);
    overflow: hidden;
    position: relative;
  }

  .track {
    display: flex;
    align-items: center;
    gap: var(--gap);
    height: 100%;
    padding: 0 var(--gap);
    width: max-content;
    animation: scroll var(--speed) linear infinite;
    will-change: transform;
  }
  .track:hover { animation-play-state: paused; }

  .shard { height: 100%; flex-shrink: 0; }

  @keyframes scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(calc(-1 * var(--half, 50%))); }
  }
</style>
