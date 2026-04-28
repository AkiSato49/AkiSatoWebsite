<script lang="ts">
  const links = [
    { href: '/#about',        label: 'About' },
    { href: '/#projects',     label: 'Projects' },
    { href: '/#inspirations', label: 'Inspirations' },
  ]
</script>

<!-- mobile top bar -->
<div class="flex md:hidden fixed top-0 inset-x-0 z-[100] items-center justify-between px-5 py-4 bg-base border-b border-edge">
  <a href="/" class="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-ink">
    Carlos Aki Sato
  </a>
  <div class="flex gap-6">
    {#each links as { href, label }}
      <a {href} class="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-muted hover:text-ink transition-colors duration-200">
        {label}
      </a>
    {/each}
  </div>
</div>

<!-- desktop left nav -->
<nav class="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-[100] flex-col items-start gap-10">

  <a href="/" class="font-sans text-[0.75rem] font-bold tracking-[0.08em] uppercase text-ink leading-[1.4]">
    Carlos<br/>Aki Sato
  </a>

  <ul class="flex flex-col gap-4 list-none">
    {#each links as { href, label }}
      <li>
        <a {href} class="nav-link text-[0.75rem] font-medium tracking-[0.15em] uppercase text-muted transition-colors duration-200 hover:text-ink">
          {label}
        </a>
      </li>
    {/each}
  </ul>

  <span class="text-[0.65rem] text-edge leading-[1.6] vertical-label">33°S<br/>151°E</span>

</nav>

<style>
  .nav-link {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
  }
  .vertical-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
</style>
