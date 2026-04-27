<script lang="ts">
  const links = [
    { href: '/#about',        label: 'About' },
    { href: '/#projects',     label: 'Projects' },
    { href: '/#inspirations', label: 'Inspirations' },
  ]
</script>

<nav>
  <a href="/" class="logo">Carlos<br/>Aki Sato</a>

  <ul>
    {#each links as { href, label }}
      <li><a {href}>{label}</a></li>
    {/each}
  </ul>

  <span class="coords label">33°S<br/>151°E</span>
</nav>

<style>
  nav {
    position: fixed;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
    writing-mode: initial;
  }

  .logo {
    font-family: var(--font);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text);
    line-height: 1.4;
  }

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1rem;
  }

  ul a {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
  }
  ul a:hover { color: var(--text); }

  .coords {
    font-size: 0.6rem;
    color: var(--border);
    line-height: 1.6;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
</style>
