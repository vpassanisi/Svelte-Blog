<script>
  import { push } from "svelte-spa-router";
</script>

<div class="pt-24 w-90p pb-16 max-w-screen-lg mx-auto">
  <div class="dark:text-white text-5xl font-hairline">Blog Posts</div>
  <div class="dark:text-white text-lg mt-4">
    Short posts about anything audio related
  </div>
</div>
<div class="w-90p max-w-screen-lg mx-auto dark:text-white">
  <button
    class="border-2 rounded p-4 hover:bg-dark-gray-800 transition-colors
    duration-500 ease-in-out"
    on:click={() => push('/posts/parallel-compression')}>
    Parralell Compression
  </button>
  <button
    class="border-2 rounded p-4 hover:bg-dark-gray-800 transition-colors
    duration-500 ease-in-out"
    on:click={() => push('/posts/rms')}>
    Measuring Loundness with RMS
  </button>
  <button
    class="border-2 rounded p-4 hover:bg-dark-gray-800 transition-colors
    duration-500 ease-in-out"
    on:click={() => push('/posts/synth')}>
    Synthesizer
  </button>
</div>
