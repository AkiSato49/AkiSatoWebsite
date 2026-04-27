<script lang="ts">
  import { onMount } from 'svelte'

  const items = [
    '→ Grid Systems in Graphic Design',
    '→ The Elements of Typographic Style',
    '→ Complexity and Contradiction in Architecture',
    '→ Notes on the Synthesis of Form',
    '→ The Timeless Way of Building',
  ]

  let shown = $state<string[]>([])
  let idx = $state(0)

  onMount(() => {
    const t = setInterval(() => {
      if (idx < items.length) {
        shown = [...shown, items[idx]]
        idx++
      } else {
        clearInterval(t)
      }
    }, 380)
    return () => clearInterval(t)
  })
</script>

<div class="sc">
  <div class="sc-header label">Currently studying</div>
  <ul>
    {#each shown as item, i}
      <li style="animation-delay:{i*0.05}s">{item}</li>
    {/each}
  </ul>
</div>

<style>
  .sc {
    width: 240px;
    background: var(--surface);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .sc-header {
    padding: 6px 10px;
    border-bottom: 1px solid var(--border);
    background: var(--concrete);
    font-size: 0.6rem;
  }

  ul {
    list-style: none;
    padding: 8px 10px;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  li {
    font-size: 0.72rem;
    line-height: 1.4;
    color: var(--muted);
    animation: lineIn 0.3s ease both;
  }

  @keyframes lineIn {
    from { opacity:0; transform:translateX(-6px); }
    to   { opacity:1; transform:translateX(0);     }
  }
</style>
