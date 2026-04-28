<script lang="ts">
  const year = new Date().getFullYear()
</script>

<footer class="border-t border-edge">

  <!-- contact row -->
  <div class="container py-12 gap-y-6">
    <div class="col-1-2 flex flex-col gap-2 self-start max-md:col-full">
      <span class="label">Get in touch</span>
      <p class="m-0 text-muted">Open to opportunities, collaborations, and interesting conversations.</p>
    </div>
    <div class="col-3-4 flex flex-col gap-6 self-start md:border-l border-edge md:pl-8 max-md:col-full">
      <div class="flex flex-col gap-1">
        <span class="label">Email</span>
        <a href="mailto:carlosakisato@gmail.com" class="text-ink hover:text-accent transition-colors duration-200">
          carlosakisato@gmail.com
        </a>
      </div>
      <div class="flex flex-col gap-1">
        <span class="label">GitHub</span>
        <a href="https://github.com/akisato49" target="_blank" rel="noreferrer"
          class="text-ink hover:text-accent transition-colors duration-200">
          github.com/akisato49
        </a>
      </div>
    </div>
  </div>

  <!-- colophon -->
  <div class="container items-center py-6 border-t border-edge gap-y-3">
    <span class="label col-label max-md:col-full">Carlos Aki Sato Cerda — {year}</span>
    <span class="label col-4 max-md:col-full justify-self-end max-md:justify-self-start text-edge">
      Sydney · 33°S · 151°E
    </span>
  </div>

</footer>
