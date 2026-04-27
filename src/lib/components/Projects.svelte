<script lang="ts">
  import Statue     from './statue/Statue.svelte'
  import { projectsStatue } from '$lib/utils/shapes'
  import { projects }       from '$lib/data/projects'

  const DESC = `Work across AI pipelines, full-stack platforms, medical imaging, and hackathons. Built to run in the real world.`

  let section = $state<HTMLElement | null>(null)
</script>

<section id="projects" bind:this={section}>
  <div class="container">

    <!-- ── col 1 : section meta + statue ─────────────────── -->
    <div class="col-label side">
      <span class="label section-num">02</span>
      <p class="side-desc">{DESC}</p>
      <Statue
        def={projectsStatue}
        bodyText=""
        textFont="1px sans-serif"
        textLineH={1}
        textColor="transparent"
        textWidth={1}
        textHeight={projectsStatue.h}
        trigger={section ?? undefined}
      />
    </div>

    <!-- ── col 2–4 : project rows (subgrid) ──────────────── -->
    <!--
      Each row:
        col 2  →  number   (right-aligned)
        col 3  →  title + tags   (border-left = MIDDLE LINE)
        col 4  →  description    (border-left = secondary line)
    -->
    <div class="col-main project-list">
      {#each projects as project, i}
        <article class="project-row">

          <span class="num label">{String(i + 1).padStart(2, '0')}</span>

          <div class="meta-col">
            <h3 class="title">{project.title}</h3>
            <div class="tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
            <span class="label year">{project.year}</span>
          </div>

          <div class="desc-col">
            <p>{project.description}</p>
          </div>

        </article>
      {/each}
    </div>

  </div>
</section>

<style>
  /* ── section shell ──────────────────────────────────────── */
  section {
    position: relative;
    padding: 5rem 0;
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }
  section::before {
    content: '02';
    position: absolute; right: -1rem; top: 1rem;
    font-family: var(--font-display);
    font-size: clamp(10rem, 22vw, 20rem);
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    opacity: 0.04;
    pointer-events: none;
    line-height: 1;
  }

  .container { row-gap: 0; }

  /* ── col 1 ──────────────────────────────────────────────── */
  .side {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-self: start;
    padding-top: 1.8rem; /* aligns with first row */
  }
  .section-num { font-size: 0.8rem; }
  .side-desc   { font-size: 0.95rem; line-height: 1.7; }

  /* ── col 2–4 list (subgrid inherits page col 2, 3, 4) ─── */
  .project-list {
    display: grid;
    grid-template-columns: subgrid;
    border-top: 1px solid var(--border);
  }

  /* each row spans all 3 inherited columns */
  .project-row {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: start;
    padding: 1.8rem 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }
  .project-row:hover { background: rgba(200,184,154,0.03); }

  /* col 2 — number, right-aligned */
  .num {
    text-align: right;
    padding-right: 1.5rem;
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1;
    padding-top: 0.2rem;
  }

  /* col 3 — title + tags  (border-left = MIDDLE LINE) */
  .meta-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-left: 1px solid var(--border);
    padding-left: 2rem;
  }
  .title {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--rust);
    text-transform: none;
    letter-spacing: 0;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .year { font-size: 0.7rem; }

  /* col 4 — description (secondary line) */
  .desc-col {
    border-left: 1px solid var(--border);
    padding-left: 2rem;
  }
  .desc-col p { font-size: 1.05rem; line-height: 1.75; margin: 0; }
</style>
