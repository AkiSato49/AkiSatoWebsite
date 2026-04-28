<script lang="ts">
  import SectionLayout          from './SectionLayout.svelte'
  import { inspirationsStatue } from '$lib/utils/shapes'
  import { inspirations }       from '$lib/data/inspirations'

  const DESC = `These are the people and entities whose work makes me feel what I want others to feel when they use something I built.`
</script>

<SectionLayout id="inspirations" num="03" name="Inspirations" desc={DESC} statueDef={inspirationsStatue} ghostSide="left">

  {#each inspirations as insp, i}
    <div class="grid border-b border-edge"
      style="grid-template-columns: subgrid; grid-column: 1/-1;">

      <span class="row-num label text-right pr-6 text-[0.75rem] pt-[calc(1.8rem+0.2rem)]">
        {String(i + 1).padStart(2, '0')}
      </span>

      <div class="grid transition-colors duration-200 hover:bg-[rgba(200,184,154,0.03)]"
        style="grid-column: span 2; grid-template-columns: subgrid;">

        <div class="flex flex-col gap-2 border-l border-edge pl-8 py-[1.8rem]">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <h3 class="insp-name">
            {@html insp.nameHtml}
          </h3>
          <span class="label">{insp.category}</span>
        </div>

        <div class="border-l border-edge pl-8 py-[1.8rem]">
          <p class="m-0">{insp.note}</p>
        </div>

      </div>

    </div>
  {/each}

</SectionLayout>

<style>
  .insp-name :global(.hi) { color: var(--rust); }
</style>
