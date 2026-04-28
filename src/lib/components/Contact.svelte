<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'
  import StatueFragment from './statue/StatueFragment.svelte'
  import { touchStatue } from '$lib/utils/shapes'

  let section       = $state<HTMLElement | null>(null)
  let line1         = $state<HTMLElement | null>(null)
  let touchContainer = $state<HTMLElement | null>(null)

  let cleanup: (() => void) | null = null

  onMount(async () => {
    if (!browser) return
    const { gsap }         = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    // animate GET IN
    gsap.from(line1, { opacity: 0, y: 60, duration: 1, ease: 'power4.out', delay: 0.1 })

    // animate TOUCH fragments
    if (!touchContainer) return
    const els = Array.from(touchContainer.querySelectorAll<HTMLElement>('.fragment'))

    touchStatue.frags.forEach((frag, i) => {
      gsap.set(els[i], { x: frag.fromX, y: frag.fromY, rotation: frag.fromR, opacity: 0 })
    })

    const sorted = [...touchStatue.frags].sort((a, b) => a.order - b.order)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: touchContainer,
        start: 'top 90%',
        end: 'top 20%',
        scrub: 0.8,
      },
    })

    sorted.forEach(frag => {
      const el = els[touchStatue.frags.indexOf(frag)]
      tl.to(el, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, frag.order * 0.8)
    })

    cleanup = () => {
      tl.kill()
      ScrollTrigger.getAll()
        .filter(st => st.vars.trigger === touchContainer)
        .forEach(st => st.kill())
    }
  })

  onDestroy(() => cleanup?.())
</script>

<section id="contact" bind:this={section}
  class="relative border-b border-edge overflow-hidden ghost-contact min-h-screen flex flex-col">

  <div class="container pt-20">

    <!-- label -->
    <span class="label col-1-2">04 — Contact</span>
    <div class="row-divider"></div>

    <!-- GET IN -->
    <div class="col-full overflow-hidden pt-4" bind:this={line1}>
      <div class="display-line">GET I<em class="ch">N</em></div>
    </div>

    <!-- TOUCH — typographical statue -->
    <div class="col-full touch-line">
      <!-- ghost text behind fragments -->
      <div class="touch-ghost" aria-hidden="true">TOUCH</div>
      <!-- fragments -->
      <div bind:this={touchContainer} class="touch-container"
        style="width:{touchStatue.w}px; height:{touchStatue.h}px;">
        {#each touchStatue.frags as frag}
          <StatueFragment
            def={frag}
            theme={touchStatue.theme}
            containerW={touchStatue.w}
            containerH={touchStatue.h}
          />
        {/each}
      </div>
    </div>

    <div class="row-divider col-full mt-4"></div>

  </div>

  <!-- contact info pinned to bottom -->
  <div class="container mt-auto pb-16 pt-8">
    <div class="col-1-2 flex flex-col gap-1 max-md:col-full">
      <span class="label">Email</span>
      <a href="mailto:carlosakisato@gmail.com"
        class="text-ink hover:text-accent transition-colors duration-200">
        carlosakisato@gmail.com
      </a>
    </div>
    <div class="col-3 flex flex-col gap-1 max-md:col-full">
      <span class="label">GitHub</span>
      <a href="https://github.com/akisato49" target="_blank" rel="noreferrer"
        class="text-ink hover:text-accent transition-colors duration-200">
        github.com/akisato49
      </a>
    </div>
    <div class="col-4 flex flex-col gap-1 max-md:col-full">
      <span class="label">Location</span>
      <span class="text-ink">Sydney, Australia · 33°S · 151°E</span>
    </div>
  </div>

</section>

<style>
  .ghost-contact::before {
    content: '04';
    position: absolute;
    left: -1rem; top: 1rem;
    font-family: var(--font-display);
    font-size: clamp(10rem, 22vw, 20rem);
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    opacity: 0.04;
    pointer-events: none;
    line-height: 1;
  }

  .container { row-gap: 0; }

  /* GET IN */
  .display-line {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(4.5rem, 14vw, 16rem);
    line-height: 0.88;
    text-transform: uppercase;
    font-weight: normal;
    color: var(--text);
    letter-spacing: -0.01em;
  }

  .ch { font-style: normal; color: var(--rust); }

  /* TOUCH statue */
  .touch-line {
    position: relative;
    overflow: hidden;
    margin-top: 0.5rem;
  }

  /* ghost text behind fragments */
  .touch-ghost {
    font-family: var(--font-display);
    font-size: clamp(4.5rem, 14vw, 16rem);
    line-height: 0.88;
    text-transform: uppercase;
    font-weight: normal;
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    opacity: 0.18;
    pointer-events: none;
    user-select: none;
    position: absolute;
    left: 0; top: 0;
    white-space: nowrap;
  }

  /* fragment container — clips to container width */
  .touch-container {
    position: relative;
    max-width: 100%;
    overflow: hidden;
  }
</style>
