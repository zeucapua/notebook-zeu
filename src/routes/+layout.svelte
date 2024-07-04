<script lang="ts">
  import "../app.css";

  const { children } = $props();
</script>

<div class="font-momo bg-sky-200 w-full h-full min-w-screen min-h-screen">
  {@render children()}
</div>
