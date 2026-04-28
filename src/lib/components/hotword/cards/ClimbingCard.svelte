<script lang="ts">
  import { onMount } from 'svelte'

  const holds = [
    { x: 60, y: 150 },
    { x: 45, y: 125 },
    { x: 72, y: 100 },
    { x: 38, y: 75  },
    { x: 65, y: 50  },
    { x: 58, y: 22  },
  ]

  let ready = $state(false)
  onMount(() => setTimeout(() => ready = true, 60))
</script>

<div class="cc">
  <svg viewBox="0 0 120 170" width="120" height="170" xmlns="http://www.w3.org/2000/svg">
    {#each holds.slice(0, -1) as h, i}
      <line
        x1={h.x} y1={h.y}
        x2={holds[i+1].x} y2={holds[i+1].y}
        class="route" class:ready
        style="transition-delay:{i * 0.1}s"
      />
    {/each}
    {#each holds as h, i}
      <circle
        cx={h.x} cy={h.y} r={i === 0 || i === holds.length - 1 ? 5 : 3}
        class="hold" class:ready
        class:start={i === 0}
        class:top={i === holds.length - 1}
        style="transition-delay:{i * 0.1 + 0.15}s"
      />
    {/each}
    <line x1="10" y1="0" x2="10" y2="170" class="wall" class:ready />
    <line x1="110" y1="0" x2="110" y2="170" class="wall" class:ready />
  </svg>
  <div class="foot label">finding the beta</div>
</div>

<style>
  .cc {
    width: 160px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 10px 10px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .wall {
    stroke: var(--border);
    stroke-width: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .wall.ready { opacity: 1; }
  .route {
    stroke: var(--muted);
    stroke-width: 1;
    stroke-dasharray: 3 3;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .route.ready { opacity: 1; }
  .hold {
    fill: var(--concrete);
    stroke: var(--border);
    stroke-width: 1;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .hold.ready       { opacity: 1; }
  .hold.start       { fill: var(--muted); }
  .hold.top         { fill: var(--rust); }
  .foot {
    font-size: 0.52rem;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 6px;
    margin-top: 4px;
    width: 100%;
  }
</style>
