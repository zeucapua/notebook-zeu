<script lang="ts">
  import { Trace, TLine } from "trace-svelte";
  import { files } from "$lib/code-blocks/vite-extra-explained";

  let step = $state(0);

  const a_steps = [[2],[],[7,8,9]];
  const b_steps = [[],[2],[2,4]];
  const c_steps = [[4],[],[2]];

  const file_highlights = [a_steps, b_steps, c_steps];
</script>

<button onclick={() => step--} class="bg-white px-2 py-1 rounded-lg">Decrease</button>
<button onclick={() => step++} class="bg-white px-2 py-1 rounded-lg">Increase</button>
<p>Step: {step}</p>

<code class="whitespace-pre-wrap">
  {#each Object.keys(files) as file, i}
    <p>{file}</p>
    <div class="bg-black text-white">
      <Trace {step} highlights={file_highlights[i]}> 
        {#each files[file] as line}
          <TLine class="bg-red-400">{line}</TLine>
        {/each}
      </Trace>
    </div>
  {/each}
</code>
