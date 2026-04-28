<script lang="ts">
  const year = new Date().getFullYear()
</script>

<footer class="border-t border-edge">
  <div class="container items-center py-8">

    <span class="label col-label">Carlos Aki Sato Cerda — {year}</span>

    <div class="col-2 flex gap-8">
      <a href="https://github.com/akisato49" class="label text-muted transition-colors duration-200 hover:text-accent"
        target="_blank" rel="noreferrer">GitHub</a>
      <a href="mailto:carlosakisato@gmail.com" class="label text-muted transition-colors duration-200 hover:text-accent">
        Email</a>
    </div>

    <span class="label col-4 justify-self-end">Built with SvelteKit</span>

  </div>
</footer>
