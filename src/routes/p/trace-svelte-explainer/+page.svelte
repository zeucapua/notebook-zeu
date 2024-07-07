<script lang="ts">
  import { Trace, TLine } from "trace-svelte";

  let step = $state(0);
  let current_file = $state("Trace.svelte");
  let show_code = $state(true);
  let show_note = $state(true);

  const FILES = [
    {
      name: "Trace.svelte",
      lines: `
      \<script lang="ts"\>
        import { setContext } from "svelte";
        import { writable } from "svelte/store";

        // props
        export let step: number = 0;
        export let highlights: number[][] = [[]];

        // for context to TLine
        let start_index = 0;
        let highlighted = writable(highlights[0]);
        let setIndex = () => { 
          start_index += 1;
          return start_index;
        };

        setContext("set_index", setIndex);
        setContext("highlighted", highlighted);

        $: $highlighted = highlights[step];
      \<\/script\>

      \<div id="trace_container"\>
        \<slot\/\>
      \<\/div\>

      \<style\>
        #trace_container {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 0.5rem;
          padding: 0.5rem;
        }
      \<\/style\>
      `.split("\n"),
      highlights: [[2,3],[],[3,4]]
    },
    {
      name: "TLine.svelte",
      lines: `
      \<script lang="ts"\>
        import { getContext } from "svelte";

        const index = getContext("set_index");
        const highlighted = getContext("highlighted");

        let value = index();
      \<\/script\>

      {#if $highlighted.includes(value)}
        \<div id="traced" class="tline_container"\>
          \<slot \/\>
        \<\/div\>
      {:else}
        \<div class="tline_container"\>
          \<slot \/\>
        \<\/div\>
      {/if}
      
      \<style\>
        .tline_container {
          display: inline-block;
          margin: 0;
          padding: 0.5rem;
          opacity: 0.5;
        }

        #traced {
          opacity: 1;
        }
      \<\/style\>
      `.split("\n"),
      highlights: [[2,3,5,6],[3],[]]
    },
  ];
</script>

<main class="flex flex-col gap-8 px-8 py-4 w-full h-full">
  <h1 class="text-5xl font-bold">
    How <code>trace-svelte</code> was made?
  </h1>

  <aside class="flex justify-between border border-black p-4 items-center">
    <ol class="flex gap-2"> 
      {#each FILES as file: {name: string, lines: string[], highlights: number[][]}}
        <li class="px-4 py-2 bg-white rounded-lg border-blue-500 h-fit" class:border={current_file === file.name}>
          <button onclick={() => current_file = file.name}>
            {file.name}
          </button>
        </li>
      {/each}
    </ol>

    <fieldset class="flex gap-2 items-center">
      <div class="flex gap-2 p-2 border border-black items-center">
        <button 
          onclick={() => { if (step > 0) step--; }} 
          class="px-4 py-2 bg-white rounded-lg border-blue-500"
        >
          Prev
        </button>
        <p>Step: {step}</p>
        <button 
          onclick={() => { if (step < FILES.length) step++; }}
          class="px-4 py-2 bg-white rounded-lg border-blue-500"
        >
          Next
        </button>
      </div>
      <label>
        <input 
          type="checkbox" 
          bind:checked={show_code}
        />
        Code
      </label>

      <label>
        <input
          type="checkbox"
          bind:checked={show_note} 
        />
        Note
      </label>
    </fieldset>
  </aside>
  
  <div class="grid grid-flow-col grid-cols-12 border border-black">
    {#if show_code}
      {#each FILES as file: {name: string, lines: string[], highlights: number[][]}}
        {#if current_file === file.name}
          <code class="whitespace-pre-wrap text-xs col-span-6 w-full lg:max-h-[64rem] overflow-y-scroll">
            <Trace {step} highlights={file.highlights}>
              <div class="flex flex-col gap-[0.25px]">
                {#each file.lines as line, i}
                  <TLine>
                    <p>{i < 10 ? `0${i}` : i} |{line}</p>
                  </TLine>
                {/each}
              </div>
            </Trace>
          </code>
        {/if}
      {/each}
    {/if}

    {#if show_note}
      <article class="col-span-6 px-4 py-8 flex flex-col gap-4">
        <p>
          Quis laborum officia et minim culpa ea aliquip cupidatat nulla labore sit elit deserunt labore. 
          <span onmouseenter={() => step = 0} role="figure" class="text-pink-500 hover:text-pink-300 cursor-pointer">
            Enim occaecat qui nulla eiusmod nulla officia cupidatat.
          </span>
          Magna ullamco nisi qui ad sint incididunt cillum exercitation reprehenderit reprehenderit cillum laborum 
          aute officia. Aliquip pariatur do ex.
          Lorem labore veniam eu excepteur do adipisicing ullamco aliquip velit tempor cillum voluptate velit ullamco.
          Ipsum pariatur est proident tempor velit anim proident non sint anim adipisicing id laboris ex.
        </p>

        <p>
          <span onmouseenter={() => step = 1} role="figure" class="text-pink-500 hover:text-pink-300 cursor-pointer">
            Cupidatat amet quis qui pariatur irure fugiat voluptate excepteur do nulla officia ad mollit.
          </span>
          Do reprehenderit laboris reprehenderit sint laborum.
          Enim incididunt minim consequat Lorem officia ipsum cillum irure proident.
          Aute non et pariatur duis non adipisicing.
          <span onmouseenter={() => step = 2} role="figure" class="text-pink-500 hover:text-pink-300 cursor-pointer">
            Consequat consectetur consectetur reprehenderit anim ipsum fugiat.
          </span>
          Lorem aliquip dolor exercitation dolor dolore culpa esse eiusmod ut veniam.
          Ullamco est consequat sit proident qui non reprehenderit tempor ex ad ullamco.
          Amet et dolore ea proident elit nisi ullamco labore cillum enim sit proident consectetur labore.
        </p>
      </article>
    {/if}
  </div>
</main>
