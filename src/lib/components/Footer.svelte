<script lang="ts">
  const year = new Date().getFullYear()
</script>

<footer>
  <div class="container">
    <span class="label col-label">Carlos Aki Sato Cerda — {year}</span>
    <div class="links col-2">
      <a href="https://github.com/akisato49" class="label" target="_blank" rel="noreferrer">GitHub</a>
      <a href="mailto:carlosakisato@gmail.com" class="label">Email</a>
    </div>
    <span class="label col-4 right">Built with SvelteKit</span>
  </div>


</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
  }

  .container { align-items: center; padding-top: 2rem; padding-bottom: 2rem; }

  .links { display:flex; gap:2rem; }
  .links a { color:var(--muted); transition:color 0.2s; }
  .links a:hover { color:var(--accent); }
  .right { justify-self: end; }

  .colophon { padding-top: 0; border-top: 1px solid var(--border); align-items: start; }

  .tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }

  .tool {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1rem 2rem 1rem 0;
    border-right: 1px solid var(--border);
    margin-right: 2rem;
    min-width: 120px;
  }
  .tool:last-child { border-right: none; }

  .tool-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text);
  }

  .tool-desc {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }
</style>
