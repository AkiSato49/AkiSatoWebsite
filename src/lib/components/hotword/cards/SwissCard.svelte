<script lang="ts">
  import { onMount } from 'svelte'

  let drawn = $state(false)
  onMount(() => { setTimeout(() => drawn = true, 80) })
</script>

<div class="swiss">
  <!-- grid lines -->
  <div class="grid-overlay" class:drawn>
    {#each Array(5) as _, i}
      <div class="hline" style="top:{16 + i*34}px; transition-delay:{i*0.06}s"></div>
    {/each}
    {#each Array(4) as _, i}
      <div class="vline" style="left:{20 + i*42}px; transition-delay:{i*0.06 + 0.1}s"></div>
    {/each}
  </div>

  <!-- main composition -->
  <div class="composition" class:drawn>
    <div class="rect r1" style="transition-delay:0.2s"></div>
    <div class="rect r2" style="transition-delay:0.28s"></div>
    <div class="circle" style="transition-delay:0.36s"></div>
    <div class="rect r3" style="transition-delay:0.44s"></div>
  </div>

  <div class="meta">
    <span class="label">Müller-Brockmann</span>
    <span class="year label">1958</span>
  </div>
</div>

<style>
  .swiss {
    width: 196px;
    height: 218px;
    background: var(--surface);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }

  /* grid */
  .hline, .vline {
    position: absolute;
    background: var(--border);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .hline { left:0; right:0; height:1px; }
  .vline { top:0; bottom:0; width:1px; }
  .drawn .hline,
  .drawn .vline { opacity: 1; }

  /* composition */
  .composition { position:absolute; inset:0; }
  .rect, .circle {
    position:absolute;
    opacity:0;
    transition: opacity 0.25s, transform 0.35s;
    transform: scale(0.85);
  }
  .drawn .rect,
  .drawn .circle { opacity:1; transform:scale(1); }

  .r1 { left:20px; top:16px; width:80px; height:80px; background:var(--accent); opacity:0; }
  .drawn .r1 { opacity:0.9; }

  .r2 { left:108px; top:16px; width:72px; height:36px; border:1.5px solid var(--accent); }

  .circle {
    left:108px; top:60px; width:72px; height:72px;
    border-radius:50%;
    border:1.5px solid var(--muted);
  }

  .r3 { left:20px; top:104px; width:156px; height:18px; border:1px solid var(--border); background:var(--concrete); }

  .meta {
    position:absolute;
    bottom:8px; left:10px; right:10px;
    display:flex;
    justify-content:space-between;
    font-size:0.55rem;
    letter-spacing:0.12em;
    color:var(--muted);
    text-transform:uppercase;
    border-top:1px solid var(--border);
    padding-top:5px;
  }
</style>
