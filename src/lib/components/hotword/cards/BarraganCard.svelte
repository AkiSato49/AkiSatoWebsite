<script lang="ts">
  // Barragán's signature colour palette
  const swatches = [
    { color: '#C1440E', label: 'tierra' },
    { color: '#D4A017', label: 'sol'    },
    { color: '#8B1A4A', label: 'magenta'},
    { color: '#2a2724', label: 'sombra' },
    { color: '#C8B89A', label: 'arena'  },
  ]
</script>

<div class="bc">
  <div class="swatches">
    {#each swatches as s, i}
      <div
        class="swatch"
        style="background:{s.color}; flex:{i===0?3:i===1?2:1}; animation-delay:{i*0.08}s"
      >
        <span class="sl">{s.label}</span>
      </div>
    {/each}
  </div>

  <div class="bc-meta">
    <span class="label">Luis Barragán</span>
    <span class="label muted">Mexico City</span>
  </div>

  <div class="bc-quote">
    "Beauty is the oracle that speaks to us all."
  </div>
</div>

<style>
  .bc {
    width: 200px;
    background: var(--surface);
    border: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .swatches {
    display: flex;
    height: 120px;
  }

  .swatch {
    display: flex;
    align-items: flex-end;
    padding: 5px;
    animation: swatchIn 0.4s ease both;
  }

  @keyframes swatchIn {
    from { opacity:0; transform:scaleY(0.6); }
    to   { opacity:1; transform:scaleY(1);   }
  }

  .sl {
    font-size: 0.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    writing-mode: vertical-rl;
    line-height: 1;
  }

  .bc-meta {
    display: flex;
    justify-content: space-between;
    padding: 6px 8px;
    border-top: 1px solid var(--border);
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .bc-quote {
    padding: 6px 8px 8px;
    font-size: 0.65rem;
    line-height: 1.5;
    color: var(--muted);
    font-style: italic;
    border-top: 1px solid var(--border);
  }

  .muted { color: var(--muted); }
</style>
