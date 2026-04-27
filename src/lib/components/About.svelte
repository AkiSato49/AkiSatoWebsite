<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'
  import LoreCanvas    from './hotword/LoreCanvas.svelte'
  import WanderingCard from './hotword/cards/WanderingCard.svelte'
  import BarraganCard  from './hotword/cards/BarraganCard.svelte'
  import MexicoCard    from './hotword/cards/MexicoCard.svelte'
  import JapanCard     from './hotword/cards/JapanCard.svelte'
  import PeopleCard    from './hotword/cards/PeopleCard.svelte'
  import type { Component } from 'svelte'

  const CARDS: Record<string, { Card: Component; w: number; h: number }> = {
    wandering: { Card: WanderingCard, w: 200, h: 165 },
    mexico:    { Card: MexicoCard,    w: 220, h: 185 },
    japan:     { Card: JapanCard,     w: 196, h: 188 },
    concrete:  { Card: BarraganCard,  w: 200, h: 210 },
    people:    { Card: PeopleCard,    w: 210, h: 145 },
  }

  const ABOUT = `I build across domains because wandering is how I think. Each problem teaches me something the last one couldn't. I am Mexican and Japanese — both cultures live in my work. Mexico gave me the instinct to make it work with what exists. A pipe fixed with tape is a kind of genius. Japan gave me structure — rules that leave you free to experiment deeply with everything they don't cover. I have found the same logic in concrete: raw material, honest, no pretense. Good code matters because people matter. We build for people. That is the whole thing.`

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

<section id="about">
  <div class="container">

    <!-- row 1: section label -->
    <span class="label col-1-2">01 — About</span>
    <div class="row-divider col-3-4"></div>

    <!-- left col: h2 + stats -->
    <div class="left-col col-1-2">
      <h2>W<span class="hi">h</span>o<br/>I Am</h2>
      <div class="stats">
        <div class="stat"><span class="label">Degree</span><span>B. Advanced Computing, USYD</span></div>
        <div class="stat"><span class="label">Stack</span><span>Go · TypeScript · Python</span></div>
        <div class="stat"><span class="label">Languages</span><span>English · Spanish · Japanese</span></div>
        <div class="stat"><span class="label">Status</span><span>Open to opportunities</span></div>
      </div>
    </div>

    <!-- right col: about text + ascii -->
    <div class="right-col col-3-4">
      <p class="about-body">
        {#each (() => {
          const used = new Set<string>()
          return ABOUT.split(/(wandering|Mexico|Japan|concrete|people)/gi).map(part => {
            const key = part.toLowerCase()
            const isHot = Object.keys(CARDS).includes(key) && !used.has(key)
            if (isHot) used.add(key)
            return { part, isHot }
          })
        })() as { part, isHot }}
          {#if isHot}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <span class="hw" onmouseenter={() => onHover(part)} onmouseleave={onLeave}>{part}</span>
          {:else}
            {part}
          {/if}
        {/each}
      </p>

      <div class="ascii-col">
        <div class="ascii-wrap" style="width:{LORE_W}px; height:{LORE_H}px;">
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
            <div bind:this={cardEl} class="card-anchor"
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
  section {
    position: relative;
    border-bottom: 1px solid var(--border);
    padding: 5rem 0;
    overflow: hidden;
  }

  .container { row-gap: 3rem; }

  /* ghost */
  section::before {
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

  .left-col {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-self: start;
  }

  .right-col {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-self: start;
    border-left: 1px solid var(--border);
    padding-left: 2rem;
  }

  h2 { color: var(--text); }
  :global(h2 .hi) { color: var(--rust); }

  .stats {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .stat { display:flex; flex-direction:column; gap:0.2rem; }
  .stat span:last-child { font-size:1.05rem; color:var(--text); }

  .about-body { margin: 0; }

  .hw {
    cursor: crosshair;
    color: var(--rust);
    text-decoration: underline;
    text-decoration-color: var(--rust);
    text-underline-offset: 3px;
    transition: color 0.15s, text-decoration-color 0.15s;
  }
  .hw:hover { color: var(--red); text-decoration-color: var(--red); }

  .ascii-col { align-self: start; overflow: hidden; }
  .ascii-wrap { position: relative; }
  .card-anchor {
    position: absolute;
    z-index: 10;
    animation: cardIn 0.25s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes cardIn {
    from { opacity:0; transform:scale(0.88); }
    to   { opacity:1; transform:scale(1); }
  }

  @media (max-width: 900px) {
    .ascii-col { display: none; }
  }
</style>
