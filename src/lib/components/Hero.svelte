<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import Statue from './statue/Statue.svelte'
  import { heroStatue } from '$lib/utils/shapes'

  const BODY = `I am a software engineer. I learn by wonder. A book, a cultural convention, a problem I was not looking for. That curiosity goes into everything I build. I am Mexican and Japanese, and both show up in my work. What sets me apart is care. I do not put my name on things I would not stand behind.`

  let section = $state<HTMLElement | null>(null)
  let line1   = $state<HTMLElement | null>(null)
  let line2   = $state<HTMLElement | null>(null)

  onMount(async () => {
    if (!browser) return
    const { gsap } = await import('gsap')
    gsap.from([line1, line2], {
      opacity: 0, y: 100, duration: 1,
      ease: 'power4.out', stagger: 0.12, delay: 0.2,
    })
  })
</script>

<section bind:this={section} id="hero" class="relative border-b border-edge py-20 pt-32 md:pt-20">
  <div class="container">

    <!-- row 1: meta -->
    <span class="label col-1-2">Portfolio — {new Date().getFullYear()}</span>
    <span class="label col-3-4 justify-self-end text-muted max-md:hidden">Sydney, Australia · 33°S · 151°E</span>

    <!-- row 2: divider -->
    <div class="row-divider"></div>

    <!-- row 3: display name -->
    <div class="col-full name-wrap py-2 overflow-hidden">
      <div bind:this={line1} class="name-line text-left">A<em class="ch">K</em>I</div>
      <div bind:this={line2} class="name-line text-right line-sato">SA<em class="ch-outline">T</em>O</div>
    </div>

    <!-- row 4: divider -->
    <div class="row-divider"></div>

    <!-- row 5: cta | statue+text -->
    <div class="col-1-2 flex flex-col gap-4 pt-2">
      <span class="label">Engineering · Sydney, Australia</span>
    </div>
    <div class="col-3-4 max-md:hidden">
      <Statue
        def={heroStatue}
        bodyText={BODY}
        textFont="19px Inter, sans-serif"
        textLineH={30}
        textColor="#9a948d"
        textWidth={560}
        textHeight={heroStatue.h}
        trigger={section ?? undefined}
      />
    </div>

  </div>
</section>

<style>
  .container { row-gap: 0; }

  .name-line {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(5rem, 19.5vw, 22rem);
    line-height: 0.88;
    text-transform: uppercase;
    font-weight: normal;
    color: var(--text);
  }
  .line-sato {
    color: transparent;
    -webkit-text-stroke: 1.5px var(--accent);
  }

  .ch         { font-style: normal; color: var(--rust); -webkit-text-stroke: 0; }
  .ch-outline { font-style: normal; -webkit-text-stroke: 1.5px var(--red); }

  .cta {
    display: inline-block;
    border: 1px solid var(--border);
    padding: 0.5rem 1.4rem;
    color: var(--muted);
    transition: border-color 0.2s, color 0.2s;
  }
  .cta:hover { border-color: var(--accent); color: var(--accent); }
</style>
