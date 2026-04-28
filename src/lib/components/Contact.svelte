<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'
  import StatueFragment from './statue/StatueFragment.svelte'
  import { touchStatue } from '$lib/utils/shapes'

  let section        = $state<HTMLElement | null>(null)
  let line1          = $state<HTMLElement | null>(null)
  let touchContainer = $state<HTMLElement | null>(null)

  let cleanup: (() => void) | null = null

  onMount(async () => {
    if (!browser) return
    const { gsap }          = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(line1, { opacity: 0, y: 60, duration: 1, ease: 'power4.out', delay: 0.1 })

    if (!touchContainer) return
    const els = Array.from(touchContainer.querySelectorAll<HTMLElement>('.fragment'))

    touchStatue.frags.forEach((frag, i) => {
      gsap.set(els[i], { x: frag.fromX, y: frag.fromY, rotation: frag.fromR, opacity: 0 })
    })

    const sorted = [...touchStatue.frags].sort((a, b) => a.order - b.order)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top -10%',
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
  class="ghost-contact relative border-b border-edge min-h-screen flex flex-col overflow-hidden">

  <!-- everything in one container, label at top, content centered -->
  <div class="flex-1 flex flex-col justify-center">
    <div class="container pt-20 pb-16">

      <!-- label row -->
      <span class="label col-1-2">04 — Contact</span>
      <div class="row-divider col-3-4"></div>

      <!-- GET IN -->
      <div class="col-full overflow-hidden" bind:this={line1}>
        <div class="display-line">GET I<em class="ch">N</em></div>
      </div>

      <!-- TOUCH mobile: plain outlined text -->
      <div class="col-full display-line line-touch md:hidden">TOUCH</div>

      <!-- TOUCH desktop: fragments masked to letter shapes -->
      <div class="col-full touch-line max-md:hidden" aria-label="TOUCH">

        <!-- SVG mask definition -->
        <svg class="clip-def" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <mask id="touch-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="400">
              <rect x="0" y="0" width="1200" height="400" fill="black"/>
              <text class="clip-text" x="0" y="0.88em" fill="white">TOUCH</text>
            </mask>
          </defs>
        </svg>

        <div bind:this={touchContainer} class="touch-container"
          style="width:{touchStatue.w}px; height:{touchStatue.h}px;
                 mask:url(#touch-mask); -webkit-mask:url(#touch-mask);">
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

      <!-- divider -->
      <div class="row-divider col-full" style="margin-top: 2rem"></div>

      <!-- contact links — same grid, attached below typography -->
      <div class="col-1-2 flex flex-col gap-1 pt-6 max-md:col-full">
        <span class="label">Email</span>
        <a href="mailto:carlosakisato@gmail.com"
          class="text-ink hover:text-accent transition-colors duration-200">
          carlosakisato@gmail.com
        </a>
      </div>
      <div class="col-3 flex flex-col gap-1 pt-6 max-md:col-full">
        <span class="label">GitHub</span>
        <a href="https://github.com/akisato49" target="_blank" rel="noreferrer"
          class="text-ink hover:text-accent transition-colors duration-200">
          github.com/akisato49
        </a>
      </div>
      <div class="col-4 flex flex-col gap-1 pt-6 max-md:col-full">
        <span class="label">Location</span>
        <span class="text-ink">Sydney, Australia · 33°S · 151°E</span>
      </div>

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
  .line-touch { color: transparent; -webkit-text-stroke: 1.5px var(--accent); }

  /* clip-path definition — zero-size, invisible */
  .clip-def {
    position: absolute;
    width: 0; height: 0;
    overflow: visible;
    pointer-events: none;
  }
  .clip-text {
    font-family: '1797', Impact, 'Arial Narrow', sans-serif;
    font-size: clamp(4.5rem, 14vw, 16rem);
    font-weight: normal;
    letter-spacing: -0.01em;
  }

  .touch-line { position: relative; margin-top: 0.25rem; }

  .touch-container {
    position: relative;
    max-width: 100%;
    overflow: visible;
  }
</style>
