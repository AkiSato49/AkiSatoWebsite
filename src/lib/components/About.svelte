<script lang="ts">
  import { onDestroy } from 'svelte'
  import LoreCanvas    from './hotword/LoreCanvas.svelte'
  import WanderingCard from './hotword/cards/WanderingCard.svelte'
  import MexicoCard    from './hotword/cards/MexicoCard.svelte'
  import JapanCard     from './hotword/cards/JapanCard.svelte'
  import ClimbingCard  from './hotword/cards/ClimbingCard.svelte'
  import GuitarCard    from './hotword/cards/GuitarCard.svelte'
  import DanceCard     from './hotword/cards/DanceCard.svelte'
  import type { Component } from 'svelte'

  const CARDS: Record<string, { Card: Component; w: number; h: number }> = {
    wandering: { Card: WanderingCard, w: 200, h: 165 },
    mexico:    { Card: MexicoCard,    w: 180, h: 120 },
    japan:     { Card: JapanCard,     w: 180, h: 120 },
    climbing:  { Card: ClimbingCard,  w: 160, h: 200 },
    guitar:    { Card: GuitarCard,    w: 180, h: 175 },
    dance:     { Card: DanceCard,     w: 140, h: 195 },
  }

  const ABOUT = `I think the most complete version of yourself comes from wandering. Experiencing things outside your field, outside your comfort zone. Growing up between Mexico and Japan taught me that very different systems can solve the same problem. The same thing happens when you are out climbing, playing the guitar, or finding the rhythm in a dance. Every unrelated thing you experience gives you a tool you did not know you needed. The best solutions come from people who have seen more than one way.`

  function makeAscii(): string {
    const sets = ['█▓▒░', '│─┼╋', '·∘○◉', '▪▫■□', '╬║═╗', '┤├┬┴']
    const words: string[] = []
    for (let i = 0; i < 500; i++) {
      const set = sets[Math.floor(Math.random() * sets.length)]
      const len = 2 + Math.floor(Math.random() * 5)
      let w = ''
      for (let j = 0; j < len; j++) w += set[Math.floor(Math.random() * set.length)]
      words.push(w)
    }
    return words.join(' ')
  }
  const ASCII = makeAscii()

  const LORE_W = 380, LORE_H = 400
  const CX = LORE_W / 2, CY = LORE_H / 2, CR = 185

  function circleShape(y: number) {
    const dy = y - CY
    if (Math.abs(dy) >= CR) return null
    const hw = Math.sqrt(CR * CR - dy * dy)
    return { x: CX - hw, w: hw * 2 }
  }

  let loreCanvas = $state<{ setExclusions:(r:any[])=>void }|null>(null)
  let activeWord = $state<string|null>(null)
  let cardEl     = $state<HTMLElement|null>(null)
  let leaveTimer: ReturnType<typeof setTimeout>|null = null
  let wanderTween: any = null
  let gsapRef: any = null
  const pos = { x: 20, y: 20 }

  function updateExclusion() {
    if (!cardEl || !activeWord) return
    const cfg = CARDS[activeWord]
    const h = cardEl.offsetHeight || cfg.h
    loreCanvas?.setExclusions([{ x: pos.x - 6, y: pos.y, w: cfg.w + 12, h: h + 4 }])
    cardEl.style.left = pos.x + 'px'
    cardEl.style.top  = pos.y + 'px'
  }

  function goNext(cfg: { w:number; h:number }) {
    if (!gsapRef || !activeWord) return
    const tx = 4 + Math.random() * (LORE_W - cfg.w - 8)
    const ty = 4 + Math.random() * (LORE_H - cfg.h - 8)
    wanderTween = gsapRef.to(pos, {
      x: tx, y: ty,
      duration: 1.8 + Math.random() * 2.2,
      ease: 'power1.inOut',
      onUpdate: updateExclusion,
      onComplete: () => goNext(cfg),
    })
  }

  async function onHover(word: string) {
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
    const key = word.toLowerCase()
    const cfg = CARDS[key]
    if (!cfg) return
    if (!gsapRef) { const m = await import('gsap'); gsapRef = m.gsap }
    pos.x = 8; pos.y = 8
    activeWord = key
    await new Promise(r => setTimeout(r, 30))
    goNext(cfg)
  }

  function onLeave() {
    leaveTimer = setTimeout(() => {
      wanderTween?.kill(); wanderTween = null
      activeWord = null
      loreCanvas?.setExclusions([])
    }, 120)
  }

  function keepCard() {
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
  }

  onDestroy(() => { wanderTween?.kill() })
</script>

<section id="about" class="relative border-b border-edge py-20 overflow-hidden ghost-about">
  <div class="container">

    <!-- row 1: section label -->
    <span class="label col-1-2">01 — About</span>
    <div class="row-divider col-3-4"></div>

    <!-- left col: h2 + stats -->
    <div class="col-1-2 flex flex-col gap-8 self-start">
      <h2>W<span class="hi">h</span>o<br/>I Am</h2>
      <div class="flex flex-col gap-5">
        <div class="stat"><span class="label">Degree</span><span>B. Advanced Computing, USYD</span></div>
        <div class="stat"><span class="label">Stack</span><span>Go · TypeScript · Python</span></div>
        <div class="stat"><span class="label">Languages</span><span>English · Spanish · Japanese</span></div>
        <div class="stat"><span class="label">Status</span><span>Open to opportunities</span></div>
      </div>
    </div>

    <!-- right col: about text + ascii -->
    <div class="col-3-4 flex flex-col gap-8 self-start border-l border-edge pl-8">
      <p class="m-0">
        {#each (() => {
          const used = new Set<string>()
          return ABOUT.split(/(wandering|Mexico|Japan|climbing|guitar|dance)/gi).map(part => {
            const key = part.toLowerCase()
            const isHot = Object.keys(CARDS).includes(key) && !used.has(key)
            if (isHot) used.add(key)
            return { part, isHot }
          })
        })() as { part, isHot }}
          {#if isHot}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <span
              class="hw cursor-crosshair text-rust underline decoration-rust underline-offset-[3px] transition-colors duration-150 hover:text-crimson hover:decoration-crimson"
              onmouseenter={() => onHover(part)}
              onmouseleave={onLeave}
            >{part}</span>
          {:else}
            {part}
          {/if}
        {/each}
      </p>

      <div class="self-start overflow-hidden max-md:hidden">
        <div class="relative" style="width:{LORE_W}px; height:{LORE_H}px;">
          <LoreCanvas
            bind:this={loreCanvas}
            text={ASCII}
            font="11px 'Courier New', monospace"
            lineHeight={17}
            color="rgba(154,148,141,0.38)"
            width={LORE_W}
            height={LORE_H}
            shape={circleShape}
          />
          {#if activeWord && CARDS[activeWord]}
            {@const cfg = CARDS[activeWord]}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div bind:this={cardEl} class="card-anchor absolute z-10"
              onmouseenter={keepCard} onmouseleave={onLeave}>
              <cfg.Card />
            </div>
          {/if}
        </div>
      </div>
    </div>

  </div>
</section>

<style>
  /* ghost "01" behind section */
  .ghost-about::before {
    content: '01';
    font-family: var(--font-display);
    font-size: clamp(10rem, 22vw, 20rem);
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    position: absolute;
    left: -1rem; top: 2rem;
    opacity: 0.04;
    pointer-events: none;
    line-height: 1;
  }

  .container { row-gap: 3rem; }

  /* stat row */
  .stat { display: flex; flex-direction: column; gap: 0.2rem; }
  .stat span:last-child { font-size: 1.05rem; color: var(--text); }

  /* h2 highlight */
  :global(h2 .hi) { color: var(--rust); }

  /* floating card */
  .card-anchor { animation: cardIn 0.25s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes cardIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
</style>
