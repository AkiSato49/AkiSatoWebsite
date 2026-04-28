<script lang="ts">
  import Hero         from '$lib/components/Hero.svelte';
  import About        from '$lib/components/About.svelte';
  import Projects     from '$lib/components/Projects.svelte';
  import Inspirations from '$lib/components/Inspirations.svelte';
  import Footer       from '$lib/components/Footer.svelte';
  import PhotoStrip   from '$lib/components/PhotoStrip.svelte';


</script>

<svelte:head>
  <title>Aki Sato</title>
  <meta name="description" content="Software engineer — Aki Sato, Sydney" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
</svelte:head>

<Hero />
<About />
<PhotoStrip height={130} speed={50} count={14} />
<Projects />
<PhotoStrip height={110} speed={34} count={14} />
<Inspirations />
<Footer />
