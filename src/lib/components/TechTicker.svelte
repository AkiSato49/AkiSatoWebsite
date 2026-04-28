<script lang="ts">
  import { onMount } from 'svelte'

  interface Props {
    items?:  string[]
    speed?:  number   // seconds for one full loop
    gap?:    string   // gap between items
  }

  let {
    items = [
      'Go', 'Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'Bash',
      'React', 'Svelte', 'SvelteKit', 'Node.js', 'Express', 'GraphQL',
      'PyTorch', 'Three.js', 'Tailwind', 'Docker', 'Git', 'MongoDB',
      'Neo4j', 'SQLite', 'Azure', 'Stripe', 'Playwright', 'Ollama',
      'REST', 'LLM APIs', 'Multi-agent', 'NixOS', 'Linux', 'Figma',
    ],
    speed = 30,
    gap   = '2rem',
  }: Props = $props()

  // duplicate for seamless loop
  const track = [...items, ...items]

  let trackEl = $state<HTMLElement | null>(null)
  let halfH   = $state(0)

  onMount(() => {
    const measure = () => {
      if (!trackEl) return
      halfH = trackEl.scrollHeight / 2
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackEl!)
    return () => ro.disconnect()
  })
</script>

<div class="ticker hidden md:flex" style="--speed:{speed}s; --gap:{gap}">
  <div class="track" bind:this={trackEl} style={halfH ? `--half:${halfH}px` : ''}>
    {#each track as item}
      <span class="item label">{item}</span>
    {/each}
  </div>
</div>

<style>
  .ticker {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 2rem;
    overflow: hidden;
    z-index: 50;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .track {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap);
    animation: scroll var(--speed) linear infinite;
    will-change: transform;
  }

  .item {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    color: var(--border);
    white-space: nowrap;
    transition: color 0.2s;
    pointer-events: auto;
    cursor: default;
  }

  .item:hover { color: var(--muted); }

  @keyframes scroll {
    from { transform: translateY(0); }
    to   { transform: translateY(calc(-1 * var(--half, 50%))); }
  }
</style>
