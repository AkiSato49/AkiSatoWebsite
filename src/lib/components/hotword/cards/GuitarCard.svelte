<script lang="ts">
  import { onMount } from 'svelte'

  const strings = [
    { y: 20,  amp: 0 },
    { y: 40,  amp: 3 },
    { y: 60,  amp: 5 },
    { y: 80,  amp: 6 },
    { y: 100, amp: 4 },
    { y: 120, amp: 2 },
  ]

  const W = 160

  function wave(y: number, amp: number, phase: number = 0): string {
    const pts: string[] = []
    for (let x = 0; x <= W; x += 4) {
      const dy = amp * Math.sin((x / W) * Math.PI * 2 + phase)
      pts.push(`${x},${y + dy}`)
    }
    return 'M' + pts.join(' L')
  }

  let ready = $state(false)
  let tick  = $state(0)
  let raf: number

  onMount(() => {
    setTimeout(() => { ready = true }, 60)
    const loop = () => { tick++; raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  })
</script>

<div class="gc">
  <svg viewBox="0 -5 {W} 140" width={W} height="140" xmlns="http://www.w3.org/2000/svg">
    {#each strings as s, i}
      <path
        d={wave(s.y, s.amp, tick * 0.04 + i)}
        class="string" class:ready
        style="transition-delay:{i * 0.07}s; stroke-width:{0.8 + (5 - i) * 0.15}"
      />
    {/each}
  </svg>
  <div class="foot label">harmony in the notes</div>
</div>

<style>
  .gc {
    width: 180px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 10px 10px 8px;
  }
  .string {
    fill: none;
    stroke: var(--muted);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .string.ready { opacity: 1; }
  .string:last-child { stroke: var(--accent); }
  .string.ready:last-child { opacity: 0.6; }
  .foot {
    font-size: 0.52rem;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 6px;
    margin-top: 4px;
  }
</style>
