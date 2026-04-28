<script lang="ts">
  import Statue from './statue/Statue.svelte'
  import type { StatueDef } from '$lib/utils/shapes'
  import type { Snippet } from 'svelte'

  let {
    id,
    num,
    name,
    desc,
    statueDef,
    ghostSide = 'right',
    children,
  }: {
    id:         string
    num:        string
    name:       string
    desc:       string
    statueDef:  StatueDef
    ghostSide?: 'left' | 'right'
    children:   Snippet
  } = $props()

  let section = $state<HTMLElement | null>(null)
</script>

<section
  {id}
  data-num={num}
  bind:this={section}
  class="relative py-20 border-b border-edge overflow-hidden"
  class:ghost-right={ghostSide === 'right'}
  class:ghost-left={ghostSide === 'left'}
>
  <div class="container">

    <!-- row 1: section label -->
    <span class="label col-1-2">{num} — {name}</span>
    <div class="row-divider col-3-4"></div>

    <!-- col 1-2: sidebar -->
    <div class="col-1-2 flex flex-col gap-6 self-start pt-[1.8rem] [grid-row:2] relative z-10">
      <p class="m-0">{desc}</p>
      <Statue
        def={statueDef}
        bodyText=""
        textFont="1px sans-serif"
        textLineH={1}
        textColor="transparent"
        textWidth={1}
        textHeight={statueDef.h}
        trigger={section ?? undefined}
      />
    </div>

    <!-- cols 2-4: subgrid list -->
    <div class="col-main section-list border-t border-edge [grid-row:2]">
      {@render children()}
    </div>

  </div>
</section>

<style>
  section::before {
    content: attr(data-num);
    position: absolute;
    top: 1rem;
    font-family: var(--font-display);
    font-size: clamp(10rem, 22vw, 20rem);
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    opacity: 0.04;
    pointer-events: none;
    line-height: 1;
  }
  section.ghost-right::before { right: -1rem; }
  section.ghost-left::before  { left:  -1rem; }

  .section-list {
    display: grid;
    grid-template-columns: subgrid;
  }

  .container { row-gap: 0; }
</style>
