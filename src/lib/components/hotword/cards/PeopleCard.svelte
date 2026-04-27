<script lang="ts">
  import { onMount } from 'svelte'
  let visible = $state(false)
  onMount(() => setTimeout(() => visible = true, 60))
</script>

<div class="pc" class:visible>
  <p class="line1">we build</p>
  <p class="line2">for people.</p>
  <span class="sub label">that's the whole thing</span>
</div>

<style>
  .pc {
    width: 210px;
    background: var(--concrete);
    border: 1px solid var(--border);
    padding: 18px 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .line1, .line2 {
    font-family: var(--font-display);
    text-transform: uppercase;
    font-weight: normal;
    color: var(--text);
    line-height: 1;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.35s, transform 0.35s;
  }

  .line1 { font-size: 1.6rem; transition-delay: 0.05s; }
  .line2 {
    font-size: 2.4rem;
    -webkit-text-stroke: 1px var(--accent);
    color: transparent;
    transition-delay: 0.15s;
  }

  .visible .line1,
  .visible .line2 { opacity: 1; transform: translateY(0); }

  .sub {
    font-size: 0.52rem;
    color: var(--muted);
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px solid var(--border);
    opacity: 0;
    transition: opacity 0.3s 0.35s;
  }
  .visible .sub { opacity: 1; }
</style>
