<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    const u = (window as any).UnicornStudio
    if (u?.init) {
      u.init()
    } else {
      (window as any).UnicornStudio = { isInitialized: false }
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.9/dist/unicornStudio.umd.js'
      s.onload = () => (window as any).UnicornStudio.init()
      document.head.appendChild(s)
    }
  })
</script>

<!-- UnicornStudio background -->
<div class="unicorn-bg">
  <div style="width:100%; height:100%" data-us-project="2GBDyfcRY3AnaWCq4N6O"></div>
</div>

<Nav />
<main>
  <slot />
</main>

<style>
  .unicorn-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    opacity: 0.18;
    pointer-events: none;
  }

  main {
    position: relative;
    z-index: 1;
  }
</style>
