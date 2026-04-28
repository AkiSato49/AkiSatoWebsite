<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import Statue from './statue/Statue.svelte'
  import { contactStatue } from '$lib/utils/shapes'

  let section = $state<HTMLElement | null>(null)
  let line1   = $state<HTMLElement | null>(null)

  onMount(async () => {
    if (!browser) return
    const { gsap } = await import('gsap')
    gsap.from(line1, { opacity: 0, y: 60, duration: 1, ease: 'power4.out', delay: 0.1 })
  })
</script>

<section id="contact" bind:this={section} class="relative py-20 pt-32 md:pt-20 border-b border-edge overflow-hidden ghost-contact">
  <div class="container">

    <span class="label col-1-2">04 — Contact</span>
    <div class="row-divider"></div>

    <!-- left col -->
    <div class="col-1-2 flex flex-col gap-8 self-start pt-[1.8rem]">
      <div bind:this={line1} style="overflow:hidden">
        <h2>Get in<br/>touch</h2>
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <span class="label">Email</span>
          <a href="mailto:carlosakisato@gmail.com"
            class="text-ink hover:text-accent transition-colors duration-200">
            carlosakisato@gmail.com
          </a>
        </div>
        <div class="flex flex-col gap-1">
          <span class="label">GitHub</span>
          <a href="https://github.com/akisato49" target="_blank" rel="noreferrer"
            class="text-ink hover:text-accent transition-colors duration-200">
            github.com/akisato49
          </a>
        </div>
        <div class="flex flex-col gap-1">
          <span class="label">Location</span>
          <span class="text-ink">Sydney, Australia · 33°S · 151°E</span>
        </div>
      </div>
    </div>

    <!-- right col: statue -->
    <div class="col-3-4 self-start pt-[1.8rem] max-md:hidden">
      <Statue
        def={contactStatue}
        bodyText=""
        textFont="1px sans-serif"
        textLineH={1}
        textColor="transparent"
        textWidth={1}
        textHeight={contactStatue.h}
        trigger={section ?? undefined}
      />
    </div>

  </div>
</section>

<style>
  .container { row-gap: 3rem; }

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
</style>
