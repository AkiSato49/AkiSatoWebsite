<script lang="ts">
  // Cobbled together — tape and pipe aesthetic
  // Asymmetric blocks with mismatched borders, held by a "belt"
</script>

<div class="mc">
  <div class="row row-top">
    <div class="block b1">
      <span class="bl">input</span>
    </div>
    <div class="block b2 dashed">
      <span class="bl">~fix</span>
    </div>
    <div class="block b3 filled">
      <span class="bl">works</span>
    </div>
  </div>

  <!-- the belt -->
  <div class="belt">
    <div class="belt-line"></div>
    <span class="belt-label label">held together</span>
    <div class="belt-line"></div>
  </div>

  <div class="row row-bot">
    <div class="block b4 filled wide">
      <span class="bl">output</span>
    </div>
    <div class="block b5 dashed tall">
      <span class="tape">////</span>
    </div>
  </div>

  <div class="mc-foot label">México · ingenuity</div>
</div>

<style>
  .mc {
    width: 220px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .row {
    display: flex;
    gap: 5px;
    align-items: stretch;
  }

  .block {
    border: 1px solid var(--border);
    padding: 6px 8px;
    display: flex;
    align-items: flex-end;
    position: relative;
    background: var(--surface);
    min-height: 52px;
  }

  .block.dashed  { border-style: dashed; border-color: var(--muted); }
  .block.filled  { background: var(--concrete); }
  .block.wide    { flex: 2; }
  .block.tall    { min-height: 68px; }

  .b1 { flex: 1; }
  .b2 { flex: 1; }
  .b3 { flex: 0 0 44px; }

  .bl {
    font-size: 0.52rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    font-family: 'Courier New', monospace;
  }

  .tape {
    font-size: 0.6rem;
    color: var(--accent);
    opacity: 0.6;
    letter-spacing: -0.05em;
    font-family: monospace;
  }

  /* belt */
  .belt {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
  }
  .belt-line {
    flex: 1;
    height: 2px;
    background: var(--rust);
  }
  .belt-label {
    font-size: 0.5rem;
    color: var(--rust);
    white-space: nowrap;
  }

  .mc-foot {
    font-size: 0.52rem;
    color: var(--muted);
    padding-top: 6px;
    border-top: 1px solid var(--border);
    margin-top: 4px;
  }
</style>
