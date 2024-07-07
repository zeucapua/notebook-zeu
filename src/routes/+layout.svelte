<script lang="ts">
  import "../app.css";
  import type { Snippet } from "svelte";

  // data from +layout.server.ts, children is "<slot>" like React
  const { data, children }: { data: { updated_at: string }, children: Snippet } = $props();
</script>

<div class="flex flex-col font-momo text-slate-800 bg-sky-200 w-full h-full min-w-screen min-h-screen">
  <nav class="flex justify-between items-center px-8 py-4">
    <a href="/" class="text-3xl hover:text-white">zeu's notebook</a>
    <div class="flex gap-8">
      <a href="/p/vite-extra-explainer" class="hover:text-white">Vite Extra Explainer</a>
      <a href="/p/trace-svelte-explainer" class="hover:text-white">trace-svelte Explainer</a>
    </div>
    <p>Last updated at: {new Date(data.updated_at).toLocaleDateString()}</p>
  </nav>

  {@render children()}
</div>
