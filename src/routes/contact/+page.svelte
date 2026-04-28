<svelte:head>
  <title>Contact — Aki Sato</title>
</svelte:head>

<section class="relative border-b border-edge py-20 pt-32 md:pt-20">
  <div class="container">

    <span class="label col-1-2">Contact</span>
    <div class="row-divider"></div>

    <div class="col-1-2 flex flex-col gap-4 self-start pt-[1.8rem]">
      <h2>Get in<br/>touch</h2>
      <p class="m-0">Open to opportunities, collaborations, and interesting conversations.</p>
    </div>

    <div class="col-3-4 flex flex-col self-start border-l border-edge pl-8 pt-[1.8rem] gap-10 max-md:border-l-0 max-md:pl-0">

      <div class="flex flex-col gap-2">
        <span class="label">Email</span>
        <a href="mailto:carlosakisato@gmail.com" class="text-ink text-[1.2rem] hover:text-accent transition-colors duration-200">
          carlosakisato@gmail.com
        </a>
      </div>

      <div class="flex flex-col gap-2">
        <span class="label">GitHub</span>
        <a href="https://github.com/akisato49" target="_blank" rel="noreferrer"
          class="text-ink text-[1.2rem] hover:text-accent transition-colors duration-200">
          github.com/akisato49
        </a>
      </div>

      <div class="flex flex-col gap-2">
        <span class="label">Based in</span>
        <span class="text-ink text-[1.2rem]">Sydney, Australia — 33°S 151°E</span>
      </div>

      <div class="flex flex-col gap-2">
        <span class="label">Full name</span>
        <span class="text-muted">Carlos Aki Sato Cerda</span>
      </div>

    </div>

  </div>
</section>

<style>
  .container { row-gap: 3rem; }

  section::before {
    content: 'hi';
    position: absolute;
    right: -1rem; top: 1rem;
    font-family: var(--font-display);
    font-size: clamp(10rem, 22vw, 20rem);
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    opacity: 0.04;
    pointer-events: none;
    line-height: 1;
  }
</style>
