<script lang="ts">
  import Statue     from './statue/Statue.svelte'
  import { inspirationsStatue } from '$lib/utils/shapes'
  import { inspirations }       from '$lib/data/inspirations'

  const DESC = `Four references that changed how I see the world. Not influences to imitate — evidence that rigour and feeling are the same thing.`

  let section = $state<HTMLElement | null>(null)
</script>

<section id="inspirations" bind:this={section}>
  <div class="container">

    <!-- ── col 1 : section meta + statue ─────────────────── -->
    <div class="col-label side">
      <span class="label section-num">03</span>
      <p class="side-desc">{DESC}</p>
      <Statue
        def={inspirationsStatue}
        bodyText=""
        textFont="1px sans-serif"
        textLineH={1}
        textColor="transparent"
        textWidth={1}
        textHeight={inspirationsStatue.h}
        trigger={section ?? undefined}
      />
    </div>

    <!-- ── col 2–4 : inspiration rows (subgrid) ──────────── -->
    <!--
      Each row:
        col 2  →  number   (right-aligned)
        col 3  →  name + category   (border-left = MIDDLE LINE)
        col 4  →  note              (border-left = secondary line)
    -->
    <div class="col-main insp-list">
      {#each inspirations as insp, i}
        <div class="insp-row">

          <span class="idx label">{String(i + 1).padStart(2, '0')}</span>

          <div class="name-col">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            <h3 class="name">{@html insp.nameHtml}</h3>
            <span class="category label">{insp.category}</span>
          </div>

          <div class="note-col">
            <p>{insp.note}</p>
          </div>

        </div>
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
    content: '03';
    position: absolute; left: -1rem; top: 1rem;
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
    padding-top: 1.8rem;
  }
  .section-num { font-size: 0.8rem; }
  .side-desc   { font-size: 0.95rem; line-height: 1.7; }

  /* ── col 2–4 list (subgrid) ─────────────────────────────── */
  .insp-list {
    display: grid;
    grid-template-columns: subgrid;
    border-top: 1px solid var(--border);
  }

  .insp-row {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: start;
    padding: 1.8rem 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }
  .insp-row:hover { background: rgba(200,184,154,0.03); }

  /* col 2 — number, right-aligned */
  .idx {
    text-align: right;
    padding-right: 1.5rem;
    color: var(--muted);
    font-size: 0.75rem;
    padding-top: 0.2rem;
  }

  /* col 3 — name + category (border-left = MIDDLE LINE) */
  .name-col {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-left: 1px solid var(--border);
    padding-left: 2rem;
  }
  .name {
    font-family: var(--font);
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    font-weight: 700;
    color: var(--text);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: none;
  }
  .name :global(.hi) { color: var(--moss); }
  .category { font-size: 0.75rem; }

  /* col 4 — note (secondary line) */
  .note-col {
    border-left: 1px solid var(--border);
    padding-left: 2rem;
  }
  .note-col p { font-size: 1rem; line-height: 1.75; margin: 0; }
</style>
