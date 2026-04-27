<script lang="ts">
  import { onMount } from 'svelte'
  import { generateAsciiGrid, randomChar, type AsciiTheme } from '$lib/utils/ascii'
  import type { FragmentDef } from '$lib/utils/shapes'

  let {
    def,
    theme,
    containerW,
    containerH,
  }: {
    def:        FragmentDef
    theme:      AsciiTheme
    containerW: number
    containerH: number
  } = $props()

  let el   = $state<HTMLDivElement | null>(null)
  let grid = $state('')
  let hovered = $state(false)

  const TEXTURES = [
    '/textures/Texture 01.jpg', '/textures/Texture 02.jpg',
    '/textures/Texture 03.jpg', '/textures/Texture 04.jpg',
    '/textures/Texture 05.jpg', '/textures/Texture 06.jpg',
    '/textures/Texture 07.jpg', '/textures/Texture 08.jpg',
    '/textures/Texture 09.jpg', '/textures/Texture 10.jpg',
  ]

  // unique seed per fragment for texture variation
  const seed    = def.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const hue     = 28 + (seed % 12) - 6
  const lit     = 22 + (seed % 8)
  const texture = TEXTURES[seed % TEXTURES.length]

  $effect(() => {
    grid = generateAsciiGrid(def.w, def.h, theme)
  })

  async function sprayParticles() {
    if (typeof window === 'undefined') return
    const { gsap } = await import('gsap')
    if (!el) return

    const rect = el.getBoundingClientRect()
    const count = 4

    for (let i = 0; i < count; i++) {
      const span = document.createElement('span')
      span.textContent = randomChar(theme)
      span.style.cssText = `
        position:fixed;
        left:${rect.left + Math.random() * rect.width}px;
        top:${rect.top + Math.random() * rect.height}px;
        font-family:monospace;
        font-size:${10 + Math.random() * 8}px;
        color:hsl(${hue}deg,8%,${50 + Math.random() * 30}%);
        pointer-events:none;
        z-index:999;
        white-space:nowrap;
        opacity:1;
      `
      document.body.appendChild(span)

      const angle  = Math.random() * Math.PI * 2
      const dist   = 40 + Math.random() * 120
      gsap.to(span, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rotation: (Math.random() - 0.5) * 360,
        opacity: 0,
        duration: 0.6 + Math.random() * 0.6,
        ease: 'power2.out',
        delay: Math.random() * 0.15,
        onComplete: () => span.remove(),
      })
    }
  }

  function onEnter() {
    hovered = true
    sprayParticles()
  }
  function onLeave() { hovered = false }

  // expose el for parent GSAP
  export function getEl() { return el }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={el}
  class="fragment"
  class:hovered
  onmouseenter={onEnter}
  onmouseleave={onLeave}
  style="
    left:{def.x}px;
    top:{def.y}px;
    width:{def.w}px;
    height:{def.h}px;
    clip-path:{def.clip};
    --hue:{hue};
    --lit:{lit};
    --tex:url('{texture}');
  "
>
  <!-- concrete layer -->
  <div class="concrete-face" style="opacity:{hovered ? 0 : 1}"></div>

  <!-- ASCII layer -->
  <pre class="ascii-face" style="opacity:{hovered ? 1 : 0}">{grid}</pre>
</div>

<style>
  .fragment {
    position: absolute;
    cursor: crosshair;
    isolation: isolate;
    transform-origin: center center;
  }

  .concrete-face,
  .ascii-face {
    position: absolute;
    inset: 0;
    transition: opacity 0.35s ease;
  }

  /* ── Concrete ── */
  .concrete-face {
    background-image: var(--tex);
    background-size: cover;
    background-position: center;
    filter: saturate(0.15) brightness(0.55) sepia(0.3);
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.08),
      inset -1px -1px 0 rgba(0,0,0,0.3);
  }

  /* ── ASCII ── */
  .ascii-face {
    font-family: 'Courier New', monospace;
    font-size: 10px;
    line-height: 14px;
    color: hsl(var(--hue)deg 10% 65%);
    overflow: hidden;
    white-space: pre;
    padding: 2px;
    background: hsl(var(--hue)deg 6% 12%);
    letter-spacing: 0.05em;
  }
</style>
