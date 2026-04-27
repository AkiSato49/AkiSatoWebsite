<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import Statue from './statue/Statue.svelte'
  import { heroStatue } from '$lib/utils/shapes'

  const BODY = `I build things because wandering across problems is how I think. Software engineer studying at USYD. Mexican and Japanese — two ways of seeing the world that don't cancel each other out. I care about what people feel when they use something I made. That's what drives the craft.`

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

<section bind:this={section} id="hero">
  <div class="container">

    <!-- row 1: meta -->
    <span class="label col-1-2">Portfolio — {new Date().getFullYear()}</span>
    <span class="label col-3-4 meta-r">33°S · 151°E</span>

    <!-- row 2: divider -->
    <div class="row-divider"></div>

    <!-- row 3: display name — full width -->
    <div class="col-full name-wrap" style="overflow:hidden">
      <div bind:this={line1} class="name-line line-aki">A<em class="ch">K</em>I</div>
      <div bind:this={line2} class="name-line line-sato">SA<em class="ch-outline">T</em>O</div>
    </div>

    <!-- row 4: divider -->
    <div class="row-divider"></div>

    <!-- row 5: cta | statue+text -->
    <div class="col-1-2 cta-col">
      <span class="label">Engineering · Sydney</span>
      <a href="/#about" class="cta label">Scroll ↓</a>
    </div>
    <div class="col-3-4">
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
  section {
    position: relative;
    border-bottom: 1px solid var(--border);
    padding: 5rem 0 4rem;
  }

  .container { row-gap: 0; }

  /* row 1 */
  .meta-r { justify-self: end; color: var(--muted); }

  /* divider spacing */
  .row-divider { margin: 1.5rem 0; }

  /* name */
  .name-wrap { padding: 0.5rem 0; }
  .name-line {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(5rem, 19.5vw, 22rem);
    line-height: 0.88;
    text-transform: uppercase;
    font-weight: normal;
    color: var(--text);
  }
  .line-aki  { text-align: left; }
  .line-sato { text-align: right; color: transparent; -webkit-text-stroke: 1.5px var(--accent); }

  .ch         { font-style:normal; color: var(--rust); -webkit-text-stroke:0; }
  .ch-outline { font-style:normal; -webkit-text-stroke: 1.5px var(--red); }

  /* row 5 */
  .cta-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.5rem;
  }
  .cta {
    display: inline-block;
    border: 1px solid var(--border);
    padding: 0.5rem 1.4rem;
    color: var(--muted);
    transition: border-color 0.2s, color 0.2s;
  }
  .cta:hover { border-color: var(--accent); color: var(--accent); }
</style>
