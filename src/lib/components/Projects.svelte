<script lang="ts">
  import SectionLayout      from './SectionLayout.svelte'
  import { projectsStatue } from '$lib/utils/shapes'
  import { projects }       from '$lib/data/projects'

  const DESC = `I care about systems that feel good to use. These are some of the ones I have built so far.`
</script>

<SectionLayout id="projects" num="02" name="Projects" desc={DESC} statueDef={projectsStatue} ghostSide="right">

  {#each projects as project, i}
    <article class="grid border-b border-edge"
      style="grid-template-columns: subgrid; grid-column: 1/-1;">

      <span class="row-num label text-right pr-6 text-[0.75rem] pt-[calc(1.8rem+0.2rem)]">
        {String(i + 1).padStart(2, '0')}
      </span>

      <div class="grid transition-colors duration-200 hover:bg-[rgba(200,184,154,0.03)]"
        style="grid-column: span 2; grid-template-columns: subgrid;">

        <div class="flex flex-col gap-2 border-l border-edge pl-8 py-[1.8rem]">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <h3 class="proj-title">{@html project.titleHtml}</h3>
          <div class="flex flex-wrap gap-[0.3rem]">
            {#each project.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
          <span class="label">{project.year}</span>
        </div>

        <div class="border-l border-edge pl-8 py-[1.8rem]">
          <p class="m-0">{project.description}</p>
        </div>

      </div>

    </article>
  {/each}

</SectionLayout>

<style>
  .proj-title :global(.hi) { color: var(--rust); }
</style>
