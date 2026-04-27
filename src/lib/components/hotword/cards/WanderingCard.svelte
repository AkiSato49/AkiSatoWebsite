<script lang="ts">
  // Branching paths — different domains explored
  const domains = [
    { label: 'AI pipelines',     angle: -60 },
    { label: 'medical imaging',  angle: -20 },
    { label: 'rental platform',  angle: 20  },
    { label: 'hackathons',       angle: 55  },
  ]

  const CX = 28, CY = 110
  const LEN = 100

  function endpoint(angle: number) {
    const r = angle * Math.PI / 180
    return {
      x: CX + LEN * Math.cos(r),
      y: CY + LEN * Math.sin(r),
    }
  }

  let ready = $state(false)
  import { onMount } from 'svelte'
  onMount(() => setTimeout(() => ready = true, 60))
</script>

<div class="wc">
  <svg viewBox="0 0 200 140" width="200" height="140" xmlns="http://www.w3.org/2000/svg">
    {#each domains as d, i}
      {@const ep = endpoint(d.angle)}
      <line
        x1={CX} y1={CY}
        x2={ep.x} y2={ep.y}
        class="branch" class:ready
        style="transition-delay:{i * 0.08}s"
      />
      <circle cx={ep.x} cy={ep.y} r="3" class="node" class:ready
        style="transition-delay:{i * 0.08 + 0.2}s" />
      <text x={ep.x + 6} y={ep.y + 4} class="dlabel" class:ready
        style="transition-delay:{i * 0.08 + 0.3}s">{d.label}</text>
    {/each}
    <circle cx={CX} cy={CY} r="5" class="origin" class:ready />
  </svg>
  <div class="foot label">wandering · how I think</div>
</div>

<style>
  .wc {
    width: 200px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 10px 10px 8px;
  }

  .branch {
    stroke: var(--border);
    stroke-width: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .branch.ready { opacity: 1; }

  .node {
    fill: var(--accent);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .node.ready { opacity: 1; }

  .origin {
    fill: var(--rust);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .origin.ready { opacity: 1; }

  .dlabel {
    font-family: var(--font);
    font-size: 7px;
    fill: var(--muted);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .dlabel.ready { opacity: 1; }

  .foot {
    font-size: 0.52rem;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 6px;
    margin-top: 2px;
  }
</style>
