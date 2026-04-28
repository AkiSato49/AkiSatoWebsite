<script lang="ts">
  import { onMount } from 'svelte'

  const steps = [
    { x: 55, y: 140, side: 'R' },
    { x: 75, y: 115, side: 'L' },
    { x: 50, y: 90,  side: 'R' },
    { x: 78, y: 65,  side: 'L' },
    { x: 52, y: 40,  side: 'R' },
    { x: 72, y: 18,  side: 'L' },
  ]

  let ready = $state(false)
  onMount(() => setTimeout(() => ready = true, 60))
</script>

<div class="dc">
  <svg viewBox="30 0 100 160" width="100" height="160" xmlns="http://www.w3.org/2000/svg">
    {#each steps.slice(0, -1) as s, i}
      <line
        x1={s.x} y1={s.y}
        x2={steps[i+1].x} y2={steps[i+1].y}
        class="connector" class:ready
        style="transition-delay:{i * 0.1}s"
      />
    {/each}
    {#each steps as s, i}
      <ellipse
        cx={s.x} cy={s.y} rx="8" ry="5"
        class="step" class:ready
        class:left={s.side === 'L'}
        style="transition-delay:{i * 0.1 + 0.1}s"
      />
    {/each}
  </svg>
  <div class="foot label">connecting with the rhythm</div>
</div>

<style>
  .dc {
    width: 140px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 10px 10px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .connector {
    stroke: var(--border);
    stroke-width: 0.8;
    stroke-dasharray: 2 3;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .connector.ready { opacity: 1; }
  .step {
    fill: var(--concrete);
    stroke: var(--border);
    stroke-width: 0.8;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .step.ready       { opacity: 1; }
  .step.left        { fill: var(--rust); opacity: 0; }
  .step.left.ready  { opacity: 0.8; }
  .foot {
    font-size: 0.52rem;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 6px;
    margin-top: 4px;
    width: 100%;
    text-align: center;
  }
</style>
