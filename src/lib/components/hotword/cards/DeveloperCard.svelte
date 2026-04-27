<script lang="ts">
  import { onMount } from 'svelte'

  const lines = [
    '$ git commit -m "refactor"',
    '> npm run build',
    '✓ built in 340ms',
    '',
    'const layout = (text, width)',
    '  => reflow(prepare(text))',
    '',
    '// 0 DOM reflows.',
  ]

  let visible = $state<string[]>([])
  let cursor = $state(true)
  let i = $state(0)

  onMount(() => {
    const t = setInterval(() => {
      if (i < lines.length) {
        visible = [...visible, lines[i]]
        i++
      } else {
        clearInterval(t)
        setInterval(() => { cursor = !cursor }, 500)
      }
    }, 260)
    return () => clearInterval(t)
  })
</script>

<div class="dev-card">
  <div class="header label">dev env</div>
  <div class="terminal">
    {#each visible as line}
      <div class="line" class:comment={line.startsWith('//')} class:success={line.startsWith('✓')}>{line || '\u00A0'}</div>
    {/each}
    {#if i <= lines.length}
      <span class="cur" class:blink={!cursor}>▊</span>
    {/if}
  </div>
</div>

<style>
  .dev-card {
    width: 220px;
    background: var(--surface);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .header {
    padding: 5px 10px;
    border-bottom: 1px solid var(--border);
    background: var(--concrete);
    font-size: 0.6rem;
  }

  .terminal {
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.68rem;
    line-height: 1.7;
    color: var(--muted);
    height: 168px;
    overflow: hidden;
  }

  .line.success { color: var(--moss); }
  .line.comment  { color: var(--border); }

  .cur { color: var(--accent); }
  .blink { opacity: 0; }
</style>
