<script lang="ts">
  import { Trace, TLine } from "trace-svelte";
  import { files } from "$lib/code-blocks/vite-extra-explained";

  let step = $state(0);
  let current_tab = $state<0 | 1 | 2>(0);

  const a_steps = [[2],[],[7,8,9]];
  const b_steps = [[],[2],[2,4]];
  const c_steps = [[4],[],[2]];

  const file_highlights = [a_steps, b_steps, c_steps];
</script>

<main class="flex flex-col gap-4 w-full h-full">
  <p class="mx-auto text-5xl">UNDER CONSTRUCTION: note playground</p>
  <section class="flex gap-2 items-center self-center">
    <p>Step: {step}</p>
    <button onclick={() => {if (step - 1 > -1) step--}} class="bg-white px-2 py-1 rounded-lg">Decrease</button>
    <button onclick={() => {if (step + 1 < a_steps.length) step++}} class="bg-white px-2 py-1 rounded-lg">Increase</button>
  </section>

  <ul class="flex gap-1">
  {#each files as file: { title: string, content: string[] }, i}
    <li>
      <button 
        onclick={() => {current_tab = i as 0 | 1 | 2}}
        class="bg-white px-2 py-1 rounded-lg"
      >
        {file.title}
      </button>
    </li>

      
  {/each}
  </ul>

  {#each files as file: { title: string, content: string[] }, i}
    {#if current_tab === i}
      <article class="bg-slate-800 px-4 py-2 rounded-lg m-4">
        <h3 class="text-sky-200">{file.title}</h3>
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
    {/if}
  {/each}
</main>
