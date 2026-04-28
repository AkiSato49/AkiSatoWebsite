<script lang="ts">
  import SectionLayout          from './SectionLayout.svelte'
  import { inspirationsStatue } from '$lib/utils/shapes'
  import { inspirations }       from '$lib/data/inspirations'

  const DESC = `These are the people and entities whose work makes me feel what I want others to feel when they use something I built.`
</script>

<SectionLayout id="inspirations" num="03" name="Inspirations" desc={DESC} statueDef={inspirationsStatue} ghostSide="left">

  {#each inspirations as insp, i}
    <div class="insp-row border-b border-edge" style="grid-column: 1/-1;">

      <span class="row-num label text-right pr-6 text-[0.75rem] pt-[calc(1.8rem+0.2rem)] max-md:hidden">
        {String(i + 1).padStart(2, '0')}
      </span>

      <div class="content-wrap" style="grid-column: span 2; grid-template-columns: subgrid;">

        <div class="flex flex-col gap-2 border-l border-edge pl-6 py-[1.8rem] transition-colors duration-200 hover:bg-[rgba(200,184,154,0.03)] max-md:border-l-0 max-md:pl-0">
          <div class="flex items-baseline gap-3">
            <span class="row-num label md:hidden">{String(i + 1).padStart(2, '0')}</span>
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            <h3 class="insp-name">{@html insp.nameHtml}</h3>
          </div>
          <span class="label">{insp.category}</span>
        </div>

        <div class="border-l border-edge pl-6 py-[1.8rem] transition-colors duration-200 hover:bg-[rgba(200,184,154,0.03)] max-md:border-l-0 max-md:pl-0 max-md:pt-0">
          <p class="m-0">{insp.note}</p>
        </div>

      </div>

    </div>
  {/each}

</SectionLayout>

<style>
  .insp-row {
    display: grid;
    grid-template-columns: subgrid;
    align-items: start;
  }

  .content-wrap {
    display: grid;
  }

  .insp-name :global(.hi) { color: var(--rust); }

  @media (max-width: 767px) {
    .insp-row {
      display: block;
    }
    .content-wrap {
      display: block;
    }
  }
</style>
