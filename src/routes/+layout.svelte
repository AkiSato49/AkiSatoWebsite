<script lang="ts">
  import '../app.css';
  import Nav        from '$lib/components/Nav.svelte';
  import TechTicker from '$lib/components/TechTicker.svelte';
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

<!-- SVG filters — referenced globally via CSS filter: url(#...) -->
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="analog-print" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>

<!-- UnicornStudio background -->
<div class="fixed inset-0 z-[-1] opacity-[0.18] pointer-events-none" style="width:100%; height:100%">
  <div style="width:100%; height:100%" data-us-project="2GBDyfcRY3AnaWCq4N6O"></div>
</div>

<Nav />
<TechTicker />
<main class="relative z-[1]">
  <slot />
</main>
