<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  let section  = $state<HTMLElement | null>(null)
  let line1    = $state<HTMLElement | null>(null)
  let line2    = $state<HTMLElement | null>(null)

  onMount(async () => {
    if (!browser) return
    const { gsap } = await import('gsap')
    gsap.from([line1, line2], {
      opacity: 0, y: 80, duration: 1,
      ease: 'power4.out', stagger: 0.1, delay: 0.15,
    })
  })
</script>

<section id="contact" bind:this={section} class="relative border-b border-edge overflow-hidden ghost-contact min-h-screen flex flex-col">
  <div class="container pt-20">

    <!-- label row -->
    <span class="label col-1-2">04 — Contact</span>
    <div class="row-divider"></div>

    <!-- typographic display -->
    <div class="col-full name-wrap py-4 overflow-hidden">
      <div bind:this={line1} class="display-line">GET I<em class="ch">N</em></div>
      <div bind:this={line2} class="display-line line-touch">T<em class="ch-outline">O</em>UCH</div>
    </div>

    <div class="row-divider col-full"></div>

  </div>

  <!-- contact info pinned to bottom -->
  <div class="container mt-auto pb-16 pt-8">
    <div class="col-1-2 flex flex-col gap-1">
      <span class="label">Email</span>
      <a href="mailto:carlosakisato@gmail.com"
        class="text-ink hover:text-accent transition-colors duration-200">
        carlosakisato@gmail.com
      </a>
    </div>
    <div class="col-3 flex flex-col gap-1">
      <span class="label">GitHub</span>
      <a href="https://github.com/akisato49" target="_blank" rel="noreferrer"
        class="text-ink hover:text-accent transition-colors duration-200">
        github.com/akisato49
      </a>
    </div>
    <div class="col-4 flex flex-col gap-1">
      <span class="label">Location</span>
      <span class="text-ink">Sydney, Australia</span>
      <span class="label">33°S · 151°E</span>
    </div>
  </div>

</section>

<style>
  /* ghost number */
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

  /* typographic display — mirrors hero sizing */
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

  .line-touch {
    color: transparent;
    -webkit-text-stroke: 1.5px var(--accent);
  }

  .ch         { font-style: normal; color: var(--rust); -webkit-text-stroke: 0; }
  .ch-outline { font-style: normal; -webkit-text-stroke: 1.5px var(--red); }
</style>
