<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'

  const links = [
    { href: '/#about',        label: 'About',        id: 'about'        },
    { href: '/#projects',     label: 'Projects',     id: 'projects'     },
    { href: '/#inspirations', label: 'Inspirations', id: 'inspirations' },
    { href: '/#contact',       label: 'Contact',      id: 'contact'      },
  ]

  let activeSection = $state('')

  let obs: IntersectionObserver | null = null

  onMount(() => {
    if (!browser) return

    obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) activeSection = e.target.id
      })
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })

    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs!.observe(el)
    })
  })

  onDestroy(() => obs?.disconnect())
</script>

<!-- mobile top bar -->
<div class="flex md:hidden fixed top-0 inset-x-0 z-[100] items-center justify-between px-5 py-4 bg-base border-b border-edge">
  <a href="/" class="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-ink">
    Aki Sato
  </a>
  <div class="flex gap-6">
    {#each links as { href, label, id }}
      <a {href} class="text-[0.75rem] font-medium tracking-[0.15em] uppercase transition-colors duration-200"
        class:text-ink={activeSection === id}
        class:text-muted={activeSection !== id}>
        {label}
      </a>
    {/each}
  </div>
</div>

<!-- desktop left nav -->
<nav class="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-[100] flex-col items-start gap-10">

  <a href="/" class="font-sans text-[0.75rem] font-bold tracking-[0.08em] uppercase text-ink leading-[1.4]">
    Aki<br/>Sato
  </a>

  <ul class="flex flex-col gap-4 list-none">
    {#each links as { href, label, id }}
      <li>
        <a {href} class="nav-link text-[0.75rem] font-medium tracking-[0.15em] uppercase transition-colors duration-200"
          class:text-ink={activeSection === id}
          class:text-muted={activeSection !== id}>
          {label}
        </a>
      </li>
    {/each}
  </ul>

  <span class="text-[0.65rem] text-edge leading-[1.6] vertical-label">
    Sydney<br/>33°S · 151°E
  </span>

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
