<script lang="ts">
  import { Trace, TLine } from "trace-svelte";
  import { files } from "$lib/code-blocks/vite-extra-explained";

  let step = $state(0);

  const a_steps = [[2],[],[7,8,9]];
  const b_steps = [[],[2],[2,4]];
  const c_steps = [[4],[],[2]];

  const file_highlights = [a_steps, b_steps, c_steps];
</script>

<button onclick={() => {if (step - 1 > -1) step--}} class="bg-white px-2 py-1 rounded-lg">Decrease</button>
<button onclick={() => {if (step + 1 < a_steps.length) step++}} class="bg-white px-2 py-1 rounded-lg">Increase</button>
<p>Step: {step}</p>

{#each files as file: { title: string, content: string[] }, i}
  <article class="bg-slate-800 px-4 py-2 rounded-lg m-4">
    <h3>{file.title}</h3>
    <code class="whitespace-pre-wrap">
      <Trace {step} highlights={file_highlights[i]}>
        {#each file.content as line}
          <TLine>
            <p class="text-white">{line}</p>
          </TLine> 
        {/each}
      </Trace>
    </code>
  </article>
{/each}
